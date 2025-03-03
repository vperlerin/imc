<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


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

require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Participant.class.php";
 
try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'], $data['delete_type'])) {
        throw new Exception("Missing required parameters.");
    }

    $participantManager = new ParticipantManager($pdo);

    if ($data['delete_type'] === "hard") {
        $participantManager->deleteParticipant($data['id']);
    } else {
        $participantManager->softDeleteParticipant($data['id']);
    }

    echo json_encode(["success" => true, "message" => "Participant deleted successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
