<?php



// Allow CORS for local development & production
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Participant.class.php";

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input
    if (!isset($data['id'], $data['delete_type'])) {
        http_response_code(400);
        throw new Exception("Missing required parameters.");
    }

    // Ensure ID is numeric to prevent SQL injection risks
    if (!is_numeric($data['id'])) {
        http_response_code(400);
        throw new Exception("Invalid participant ID.");
    }

    $participantManager = new ParticipantManager($pdo);

    if ($data['delete_type'] === "hard") {
        $participantManager->deleteParticipant((int)$data['id']);
    } else {
        $participantManager->softDeleteParticipant((int)$data['id']);
    }

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Participant deleted successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
