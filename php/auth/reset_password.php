<?php 

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
header("Content-Type: application/json"); // Ensure JSON response

// Handle preflight requests (OPTIONS method)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}
 
require_once __DIR__ . "/../class/Connect.class.php"; 

 
 
$data = json_decode(file_get_contents("php://input"), true);
$token = isset($data["token"]) ? trim($data["token"]) : "";
$new_password = isset($data["password"]) ? trim($data["password"]) : "";

if (empty($token) || empty($new_password)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

// Validate password length (min 8 characters)
if (strlen($new_password) < 8) {
    echo json_encode(["success" => false, "message" => "Password must be at least 8 characters long"]);
    exit;
}

try {
    // Find token in database and check expiration
    $stmt = $pdo->prepare("SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$token]);
    $resetData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$resetData) {
        echo json_encode(["success" => false, "message" => "Invalid or expired token"]);
        exit;
    }

    $email = $resetData["email"];
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    // Check if email exists in either `admins` or `participants`
    $stmt = $pdo->prepare("SELECT 'admins' as table_name FROM admins WHERE email = ? 
                           UNION 
                           SELECT 'participants' FROM participants WHERE email = ?");
    $stmt->execute([$email, $email]);
    $userTables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($userTables)) {
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit;
    }

    // Validate and update password in the found table(s)
    foreach ($userTables as $table) {
        if ($table !== "admins" && $table !== "participants") {
            error_log("Invalid table name detected: " . $table);
            continue; // Skip invalid table names
        }
        $stmt = $pdo->prepare("UPDATE `$table` SET password_hash = ? WHERE email = ?");
        $stmt->execute([$hashed_password, $email]);
    }

    // Delete the reset token after successful password update
    $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ?");
    $stmt->execute([$email]);

    echo json_encode(["success" => true, "message" => "Password updated successfully"]);

} catch (PDOException $e) { 
    echo("Database error: " . $e->getMessage());  
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "An internal error occurred."]);
}
?>
