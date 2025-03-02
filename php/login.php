<?php
session_start(); 

// CORS headers
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/config.php";

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
function getUser($conn, $email, $table) {
    $stmt = $conn->prepare("SELECT id, email, password_hash FROM `$table` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Check both `admins` and `participants`
$user = getUser($conn, $email, "admins");
$isAdmin = ($user !== null);

if (!$user) {
    $user = getUser($conn, $email, "participants");
    $isAdmin = false;
}

// If user not found or password doesn't match
if (!$user || !password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// ✅ Secure session handling
session_regenerate_id(true);
$_SESSION["user_id"] = $user["id"];
$_SESSION["email"] = $user["email"];
$_SESSION["is_admin"] = $isAdmin;

// ✅ Ensure session cookie is sent
setcookie(session_name(), session_id(), [
  'secure' => false,  // TODO: Set to `true` in production with HTTPS!!
  'httponly' => true,  // Prevent JavaScript access
  'samesite' => 'lax'  // Required for cross-origin authentication
]);

// ✅ Return user info
$response = [
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user["id"],
        "email" => $user["email"],
        "is_admin" => $isAdmin
    ]
];

http_response_code(200);
echo json_encode($response);
$conn->close();
?>
