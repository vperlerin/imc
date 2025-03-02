<?php
session_start();
session_destroy();  // ✅ Completely remove session
setcookie(session_name(), '', time() - 3600, '/');  // ✅ Delete session cookie

header("Content-Type: application/json");
echo json_encode(["success" => true, "message" => "Logged out successfully"]);
?>