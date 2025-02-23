<?php
require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../class/Connect.class.php";
require_once __DIR__ . "/../class/Participant.class.php";

header("Content-Type: application/json");

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
