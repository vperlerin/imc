<?php
// CORS handling for frontend requests
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

// Fetch user details from session
$userData = [
    "id" => $_SESSION["user_id"], // Always returns the participant ID if available
    "email" => $_SESSION["email"],
    "is_admin" => $_SESSION["is_admin"] ?? false,
    "role" => $_SESSION["role"] ?? "participant",
    "participant_id" => $_SESSION["participant_id"] ?? null,
    "admin_id" => $_SESSION["admin_id"] ?? null,
];

$response = [
    "success" => true,
    "user" => $userData
];

http_response_code(200);
echo json_encode($response);
?>
