<?php

$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, OPTIONS");

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../class/Accomodation.class.php"; 

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validate type filter (optional)
$typeFilter = $_GET['type'] ?? null;
if ($typeFilter !== null && !in_array($typeFilter, ['no', 'not_no'])) {
    echo json_encode(["success" => false, "message" => "Invalid type filter"]);
    exit;
}

try {
    $accommodationManager = new AccommodationManager($pdo); 
    $availableRooms = $accommodationManager->gatAvailableRooms();

    var_dump( $availableRooms);

    // Return the result in JSON format
    echo json_encode(["success" => true, "data" => $availableRooms]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>
