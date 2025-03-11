<?php
$allowed_origins = [
    "https://imc2025.imo.net",
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
require_once __DIR__ . "/../class/ConferenceData.class.php";
require_once __DIR__ . "/../class/Participant.class.php";
require_once __DIR__ . "/../class/Workshop.class.php";
require_once __DIR__ . "/../class/Arrival.class.php";
require_once __DIR__ . "/../class/Contribution.class.php";
require_once __DIR__ . "/../class/Accommodation.class.php";
require_once __DIR__ . "/../class/Payment.class.php";
require_once __DIR__ . "/../class/Extras.class.php";
require_once __DIR__ . "/../class/Registrationtype.class.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $required_fields = [
        'title',
        'first_name',
        'last_name',
        'email',
        'total_due',
        'paypal_fee', 
        'is_online'
    ];

    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Generate a random password
    $plain_password = bin2hex(random_bytes(4));
    $password_hash = password_hash($plain_password, PASSWORD_DEFAULT);
    $data['password'] = $plain_password;
 
    $participantManager = new ParticipantManager($pdo);

    if ($participantManager->emailExists($data['email'])) {
        throw new Exception("The email address '{$data['email']}' is already in use. Please use a different email.");
    }

    // Save participant
    $participant_id = $participantManager->saveOnlineParticipant($data, $password_hash);
  
    echo json_encode([
        "success" => true,
        "message" => "Registration successful",
        "participant_id" => $participant_id,
        "password" => $plain_password,
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
