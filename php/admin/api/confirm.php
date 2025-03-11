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
  $data = json_decode(file_get_contents("php://input"), true);

  // Validate input
  if (!isset($data['id'])) {
    http_response_code(400);
    throw new Exception("Missing required participant ID.");
  }

  // Ensure ID is numeric to prevent SQL injection risks
  if (!is_numeric($data['id'])) {
    http_response_code(400);
    throw new Exception("Invalid participant ID.");
  }

  $participantId = (int) $data['id'];
  $participantManager = new ParticipantManager($pdo);

  /*
  ex:
    EMAIL ONLY:  $participantManager->confirm(123, ['confirmation_sent' => true]);
    EMAIL + CONFIRM: $participantManager->confirm(456, ['confirmation_sent' => true, 'confirmation_date' => true]);
    CONFIRM ONLY: $participantManager->confirm(789, ['confirmation_date' => true]);

  */
  
  if (!$participantManager->confirm($participantId, $data)) {
    throw new Exception("Failed to update participant confirmation status.");
  }

  http_response_code(200);
  echo json_encode(["success" => true, "message" => "Participant confirmation updated successfully."]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
