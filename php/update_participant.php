<?php
header("Content-Type: application/json");

// Allowed origins
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
 

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";  
require_once __DIR__ . "/class/Participant.class.php";   

try {
    // Ensure participant ID is provided via query parameter
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception("Invalid request. Participant ID is required.");
    }

    $participantId = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data)) {
        throw new Exception("No data provided for update.");
    }

    // Initialize ParticipantManager using $pdo
    $participantManager = new ParticipantManager($pdo);
 
    // Attempt to update participant
    $updateSuccess = $participantManager->updateParticipant($participantId, $data);

    if ($updateSuccess) {
        echo json_encode([
            "success" => true,
            "message" => "Participant updated successfully",
            "participant_id" => $participantId
        ]);
    } else {
        throw new Exception("Failed to update participant.");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
