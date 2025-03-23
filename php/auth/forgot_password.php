<?php
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . "/../class/Connect.class.php"; 

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // Ensure JSON response

// Handle preflight requests (OPTIONS method)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}
  
// Read JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["success" => false, "message" => "Invalid JSON format"]);
    exit;
}

$email = isset($data["email"]) ? trim($data["email"]) : "";

if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Email not found"]); 
    exit;
}

 
// Function to check if the email exists in the database
function getUserByEmail($pdo, $email) {
    try {
        $stmt = $pdo->prepare("SELECT id FROM admins WHERE email = ? UNION SELECT id FROM participants WHERE email = ?");
        $stmt->execute([$email, $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database Query Error: " . $e->getMessage());
        return false;
    }
}

$user = getUserByEmail($pdo, $email);

if (!$user) {
    echo json_encode(["success" => true, "message" => "Email not found"]);
    exit;
}

// Generate a secure token
$token = bin2hex(random_bytes(32));
$expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));

try {
    // Store token in the database
    $stmt = $pdo->prepare("
        INSERT INTO password_resets (email, token, expires_at) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE token = ?, expires_at = ?
    ");
    $stmt->execute([$email, $token, $expires_at, $token, $expires_at]);

    // Send the response (Do NOT reveal the token)
    echo json_encode(["success" => true, "token" => $token, "email" => $email]);

} catch (PDOException $e) {
     echo json_encode(["success" => false, "message" => "Something went wrong. Please try again later."]);
}
?>
