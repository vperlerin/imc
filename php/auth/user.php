<?php
// CORS handling
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

// Function to fetch user securely
function getUser($conn, $email, $table) {
    $stmt = $conn->prepare("SELECT id, email, password_hash FROM `$table` WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Check admin first, then participant
$user = getUser($conn, $email, "admins");
$isAdmin = ($user !== null);

if (!$user) {
    $user = getUser($conn, $email, "participants");
    $isAdmin = false;
}

// If user not found
if (!$user) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Verify the password
if (!password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Securely regenerate session ID to prevent session fixation attacks
session_regenerate_id(true);

// Store user data in the session
$_SESSION["user_id"] = $user["id"];
$_SESSION["email"] = $user["email"];
$_SESSION["is_admin"] = $isAdmin;

// Prepare and send response
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
