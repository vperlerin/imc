<?php

// CORS headers
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

require_once __DIR__ . "/../config.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Database connection
$host = "localhost";
$user = getenv("MYSQL_USER");
$pass = getenv("MYSQL_PASSWORD");
$dbname = getenv("MYSQL_DATABASE");

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data["email"]) ? trim($data["email"]) : "";
$password = isset($data["password"]) ? $data["password"] : "";

// Validate input
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit;
}

// Fetch user securely
function getUser($conn, $email, $table, $isAdminTable = false) {
    $query = $isAdminTable 
        ? "SELECT id, email, password_hash, role FROM `$table` WHERE email = ?" 
        : "SELECT id, email, password_hash FROM `$table` WHERE email = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Get user from both tables (if exists)
$adminUser = getUser($conn, $email, "admins", true);
$participantUser = getUser($conn, $email, "participants");

$validAdminPassword = $adminUser && password_verify($password, $adminUser["password_hash"]);
$validParticipantPassword = $participantUser && password_verify($password, $participantUser["password_hash"]);

// Determine the user details
$user = null;
$isAdmin = false;
$userRole = "participant"; // Default role
$participantId = $participantUser["id"] ?? null;
$adminId = $adminUser["id"] ?? null;

if ($validAdminPassword) {
    // If admin password is entered and participant exists, use participant ID but admin role
    if ($participantUser) {
        $user = $participantUser;
        $isAdmin = $adminUser['role'] === "admin";
        $userRole = $adminUser['role'];
    } else {
        // If no participant exists, use admin ID normally
        $user = $adminUser;
        $isAdmin = $adminUser['role'] === "admin";
        $userRole = $adminUser['role'];
    }
} elseif ($validParticipantPassword) {
    // If participant password is entered, use participant ID and participant role
    $user = $participantUser;
    $userRole = "participant";
} else {
    // No valid password found
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Secure session handling
session_regenerate_id(true);
$_SESSION["user_id"] = $user["id"]; // Always use participant ID if exists
$_SESSION["email"] = $user["email"];
$_SESSION["is_admin"] = $isAdmin;
$_SESSION["role"] = $userRole;
$_SESSION["participant_id"] = $participantId;
$_SESSION["admin_id"] = $adminId;

// Ensure session cookie is sent
setcookie(session_name(), session_id(), [
    'expires' => time() + 259200, // 3 days
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);

// Return user info
$response = [
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user["id"], // Always use participant ID if available
        "email" => $user["email"],
        "is_admin" => $isAdmin,
        "role" => $userRole,
        "participant_id" => $participantId,
        "admin_id" => $adminId
    ]
];

http_response_code(200);
echo json_encode($response);
$conn->close();
session_write_close();

?>
