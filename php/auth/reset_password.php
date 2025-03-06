<?php 
require_once __DIR__ . "/../class/Connect.class.php"; 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); 

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

    // Update password for the found tables
    foreach ($userTables as $table) {
        $stmt = $pdo->prepare("UPDATE $table SET password_hash = ? WHERE email = ?");
        $stmt->execute([$hashed_password, $email]);
    }

    // Delete the reset token after successful password update
    $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ?");
    $stmt->execute([$email]);

    echo json_encode(["success" => true, "message" => "Password updated successfully"]);

} catch (PDOException $e) { 
    // TODO : delete
    echo "ERROR " . $e;
    echo json_encode(["success" => false, "message" => "An error occurred. Please try again later."]);
}
?>
