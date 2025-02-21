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
header("Content-Type: application/json"); // Ensure JSON response

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/connect_db.php";
require_once __DIR__ . "/class/Mail.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = isset($data["email"]) ? trim($data["email"]) : "";

if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Email is required"]);
    exit;
}

// Function to check if the email exists in the database
function getUserByEmail($pdo, $email) {
    try {
        $stmt = $pdo->prepare("SELECT id, email FROM admins WHERE email = ? UNION SELECT id, email FROM participants WHERE email = ?");
        $stmt->execute([$email, $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database Query Error: " . $e->getMessage());
        return false;
    }
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
    // Store token in database (Insert or Update)
    $stmt = $pdo->prepare("
        INSERT INTO password_resets (email, token, expires_at) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)
    ");
    $stmt->execute([$email, $token, $expires_at]);

    // Construct reset link
    $year = getenv("YEAR") ?: date("Y");  
    $reset_link = "https://imc{$year}.imo.net/reset-password?token=$token";

    // Send reset email
    $mailer = new Mail();
    $response = $mailer->sendEmail(
        [$email], 
        "Password Reset", 
        "Click the link to reset your IMC{$year} password:\n\n$reset_link\n\nPlease do not reply to this email as it is automatically generated.", 
        "no-reply@imo.net"
    );

    if ($response["success"]) {
        echo json_encode(["success" => true, "message" => "Password reset email sent"]);
    } else {
        error_log("Email Sending Error: " . $response["message"]);
        echo json_encode(["success" => false, "message" => "Failed to send email."]);
    }
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
