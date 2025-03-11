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

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../class/Connect.class.php";
require_once __DIR__ . "/../class/Participant.class.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validate workshop ID
$workshopId = $_GET['workshop_id'] ?? null;
if (!$workshopId || !is_numeric($workshopId)) {
    echo json_encode(["success" => false, "message" => "Invalid workshop ID"]);
    exit;
}

try {
    $participantManager = new ParticipantManager($pdo);
    $participants = $participantManager->getParticipantsByWorkshop($pdo, $workshopId);

    echo json_encode(["success" => true, "data" => $participants]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
