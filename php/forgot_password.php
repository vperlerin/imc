<?php
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/connect_db.php";
require_once __DIR__ . "/class/Mail.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data["email"]) ? trim($data["email"]) : "";

if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Email is required"]);
    exit;
}

// Check if email exists in either table
function getUserByEmail($pdo, $email)
{
    $stmt = $pdo->prepare("SELECT id, email FROM admins WHERE email = ? UNION SELECT id, email FROM participants WHERE email = ?");
    $stmt->execute([$email, $email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

$user = getUserByEmail($pdo, $email);

if (!$user) {
    echo json_encode(["success" => false, "message" => "Email not found"]);
    exit;
}

// Generate a secure token
$token = bin2hex(random_bytes(32));
$expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));

try {
    // Store token in database (Insert or Update if email already exists)
    $stmt = $pdo->prepare("
        INSERT INTO password_resets (email, token, expires_at) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)
    ");
    $stmt->execute([$email, $token, $expires_at]);

    // Corrected reset link construction
    $reset_link = "https://imc" . getenv("YEAR") . ".imo.net/reset-password?token=$token";

    // Send reset email
    $mailer = new Mail();
    $response = $mailer->sendEmail([$email], "Password Reset", "Click the link to reset your password: $reset_link", "no-reply@imo.net");

    if ($response === true) {
        echo json_encode(["success" => true, "message" => "Password reset email sent"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email sending failed"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
