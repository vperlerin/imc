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

    // Override with test data if "test=1" is in the request
    if (isset($_GET['test']) && $_GET['test'] == "1") {
        $data = [
            "is_early_bird" => "true",
            "is_online" => "false",
            "title" => "Dr.",
            "first_name" => "TEST",
            "last_name" => "TEST",
            "gender" => "Male",
            "phone" => "+33 686753212",
            "email" => "vperlerin22@gmail.com",
            "address" => "16, rue Georges Bernanos",
            "postal_code" => "51100",
            "city" => "Reims",
            "country" => "FR",
            "organization" => "AMS/IMO",
            "dobDay" => "10",
            "dobMonth" => "9",
            "dobYear" => "1976",
            "arrival_date" => "2025-09-18",
            "arrival_hour" => "14",
            "arrival_minute" => "30",
            "departure_date" => "2025-09-21",
            "departure_hour" => "12",
            "departure_minute" => "00",
            "travelling" => "train",
            "travelling_details" => "Not known yet.",
            "wantsToContribute" => null,
            "talks" => [],
            "posters" => [],
            "registration_type_id" => "1",
            "payment_method_id" => "1",
            "excursion" => "false",
            "buy_tshirt" => "true",
            "tshirt_size" => "Men S",
            "comments" => "",
            "service_agreement" => true,
            "total_due" => "265.00",
            "paypal_fee" => "9.69"
        ];
    }

    // Required fields validation
    $required_fields = [
        'title', 'first_name', 'last_name', 'email', 
        'total_due', 'paypal_fee', 'registration_type_id', 'is_online'
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

    // Initialize ParticipantManager using existing $pdo from Connect.class.php
    $participantManager = new ParticipantManager($pdo);

    if ($participantManager->emailExists($data['email'])) {
        throw new Exception("The email address '{$data['email']}' is already in use. Please use a different email.");
    }

    // Save participant
    $participant_id = $participantManager->saveParticipant($data, $password_hash);

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
