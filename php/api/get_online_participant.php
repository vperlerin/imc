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
require_once __DIR__ . "/../class/Participant.class.php";
require_once __DIR__ . "/../class/Connect.class.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

// Validate participant ID
$participantId = $_GET['id'] ?? null;
if (!$participantId || !is_numeric($participantId)) {
    echo json_encode(["success" => false, "message" => "Invalid participant ID"]);
    exit;
}

// Check if admin_notes parameter is set and convert to boolean
$admin_notes = isset($_GET['admin_notes']) && filter_var($_GET['admin_notes'], FILTER_VALIDATE_BOOLEAN);

try {
    $participantManager = new ParticipantManager($pdo);
    $participant = $participantManager->getOnlineParticipantDetails($participantId, $admin_notes);

    echo json_encode(["success" => true, "data" => $participant]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>