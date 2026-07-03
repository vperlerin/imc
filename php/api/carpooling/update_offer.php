<?php
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('session.cookie_lifetime', 259200);
ini_set('session.cookie_path', '/');
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'None');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

$participantId = $_SESSION["participant_id"] ?? null;
$isAdmin = $_SESSION["is_admin"] ?? false;

if (!$participantId && !$isAdmin) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden"]);
    exit;
}

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Carpooling.class.php";

try {
    $pdo = Connect::getPDO();
    $manager = new CarpoolingManager($pdo);

    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['id'])) {
        throw new Exception("Missing required field: id");
    }
    if (empty($data['departure_location_key'])) {
        throw new Exception("Missing required field: departure_location_key");
    }
    if (empty($data['departure_date'])) {
        throw new Exception("Missing required field: departure_date");
    }
    if (empty($data['total_seats'])) {
        throw new Exception("Missing required field: total_seats");
    }

    $manager->updateOffer(intval($data['id']), $participantId, $data, $isAdmin);

    echo json_encode([
        "success" => true,
        "message" => "Your carpooling offer has been updated."
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
