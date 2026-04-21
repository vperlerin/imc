<?php

// Allow CORS for local development & production
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

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
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        throw new Exception("Method not allowed.");
    }

    $participantId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($participantId <= 0) {
        http_response_code(400);
        throw new Exception("Missing or invalid participant id.");
    }

    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data) || !array_key_exists('can_be_public', $data)) {
        http_response_code(400);
        throw new Exception("Missing can_be_public in JSON body.");
    }

    $canBePublic = filter_var($data['can_be_public'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    if ($canBePublic === null) {
        http_response_code(400);
        throw new Exception("Invalid can_be_public value.");
    }

    $participantManager = new ParticipantManager($pdo);
    if (!$participantManager->setParticipantCanBePublic($participantId, $canBePublic)) {
        http_response_code(404);
        throw new Exception("Participant not found.");
    }

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Public listing preference updated."]);
} catch (Exception $e) {
    $current = http_response_code();
    if ($current < 400) {
        http_response_code(500);
    }
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
