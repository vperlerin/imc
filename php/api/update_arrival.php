<?php
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");



require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../class/Connect.class.php"; 
require_once __DIR__ . "/../class/Arrival.class.php"; 

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['participant_id']) || empty($data['participant_id'])) {
        throw new Exception("Missing required field: participant_id");
    }

    $participant_id = intval($data['participant_id']);

    $required_fields = [
        'arrival_date',
        'arrival_hour',
        'arrival_minute',
        'departure_date',
        'departure_hour',
        'departure_minute',
        'travelling', 
    ];
 
    foreach ($required_fields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Initialize ArrivalManager
    $arrivalManager = new ArrivalManager($pdo);
    $arrivalManager->updateArrival($participant_id, $data);
 
    echo json_encode([
        "success" => true,
        "message" => "Registration updated successfully",
        "participant_id" => $participant_id
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
