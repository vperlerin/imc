<?php
require_once __DIR__ . "/class/Connect.class.php";

$email = "csteyaert@gmail.com";
$new_password = "Test@1234";
$hash = password_hash($new_password, PASSWORD_DEFAULT);

// Update both tables if needed
foreach (["participants", "admins"] as $table) {
    $stmt = $pdo->prepare("UPDATE `$table` SET password_hash = ? WHERE email = ?");
    $stmt->execute([$hash, $email]);
}

echo "Password updated for testing!";
