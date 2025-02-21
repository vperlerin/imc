<?php
require_once "./class/connect_db.php"; // Use PDO connection from connect_db.php

$data = json_decode(file_get_contents("php://input"), true);
$token = isset($data["token"]) ? trim($data["token"]) : "";
$new_password = isset($data["password"]) ? $data["password"] : "";

if (empty($token) || empty($new_password)) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
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

    // Update password in both tables (admins & participants)
    $stmt = $pdo->prepare("UPDATE admins SET password_hash = ? WHERE email = ?");
    $stmt->execute([$hashed_password, $email]);

    $stmt = $pdo->prepare("UPDATE participants SET password_hash = ? WHERE email = ?");
    $stmt->execute([$hashed_password, $email]);

    // Delete the reset token after successful password update
    $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ?");
    $stmt->execute([$email]);

    echo json_encode(["success" => true, "message" => "Password updated successfully"]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
