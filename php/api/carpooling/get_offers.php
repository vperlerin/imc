<?php
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

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Carpooling.class.php";

try {
    $pdo = Connect::getPDO();
    $manager = new CarpoolingManager($pdo);

    $filters = [];
    if (!empty($_GET['departure_date'])) {
        $filters['departure_date'] = $_GET['departure_date'];
    }
    if (!empty($_GET['departure_location_key'])) {
        $filters['departure_location_key'] = $_GET['departure_location_key'];
    }

    $offers = $manager->getOffers($filters);

    echo json_encode([
        "success" => true,
        "data" => $offers
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
