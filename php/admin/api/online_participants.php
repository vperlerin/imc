<?php
// Allow CORS for local development & production
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Load dependencies 
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Participant.class.php";

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage());
}

try {
    $participantManager = new ParticipantManager($pdo);

    // Check if "confirmed_only" is set in the GET request
    $confirmedOnly = isset($_GET['confirmed_only']) && $_GET['confirmed_only'] == '1';
    $includeCancelled = isset($_GET['include_cancelled']) && $_GET['include_cancelled'] == '1';


    // Fetch participants with optional filter
    $participants = $participantManager->getOnlineParticipants($confirmedOnly, $includeCancelled);

    echo json_encode([
        "success" => true,
        "data" => $participants
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
