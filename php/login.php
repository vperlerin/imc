<?php
header("Access-Control-Allow-Origin: https://imc2025.imo.net");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
 
require_once "config.php";

$host = "localhost";  
$user = getenv("MYSQL_USER");
$pass = getenv("MYSQL_PASSWORD");
$dbname = getenv("MYSQL_DATABASE"); 

$conn = new mysqli($host, $user, $pass, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data["email"]) ? trim($data["email"]) : "";
$password = isset($data["password"]) ? $data["password"] : "";

// Check if email and password were provided
if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit;
}

// Function to check user credentials
function getUser($conn, $email, $table) {
    $stmt = $conn->prepare("SELECT id, email, password_hash FROM $table WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

// Check if user is an admin
$user = getUser($conn, $email, "admins");
$isAdmin = true;

if (!$user) {
    // If not an admin, check if the user is a participant
    $user = getUser($conn, $email, "participants");
    $isAdmin = false;
}

// If user not found in both tables
if (!$user) {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Verify the password
if (!password_verify($password, $user["password_hash"])) {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    exit;
}

// Set session variables
$_SESSION["user_id"] = $user["id"];
$_SESSION["email"] = $user["email"];
$_SESSION["is_admin"] = $isAdmin;

// Prepare response data
$response = [
    "success" => true,
    "message" => "Login successful",
    "user" => [
        "id" => $user["id"],
        "email" => $user["email"],
        "is_admin" => $isAdmin
    ]
];

echo json_encode($response);
$conn->close();
?>
