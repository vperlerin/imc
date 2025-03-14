<?php

// CORS headers
$allowed_origins = [
    "https://imc2025.imo.net",
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

// Determine the user to return
$user = $participantUser ?: $adminUser; // Prefer participant ID if both exist
$isAdmin = $adminUser !== null;
$userRole = $adminUser["role"] ?? "participant";

// If user not found or password doesn't match
if (!$user || !password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Secure session handling
session_regenerate_id(true);
$_SESSION["user_id"] = $user["id"]; // Always use the participant's ID if available
$_SESSION["email"] = $user["email"];
$_SESSION["is_admin"] = $isAdmin;
$_SESSION["role"] = $userRole;

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
        "id" => $user["id"], // This will be the participant's ID if they exist in both tables
        "email" => $user["email"],
        "is_admin" => $isAdmin,
        "role" => $userRole
    ]
];

http_response_code(200);
echo json_encode($response);
$conn->close();
session_write_close();

?>
