<?php
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
session_start();

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Mail.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require_once __DIR__ . "/class/Workshop.class.php";
require_once __DIR__ . "/class/Arrival.class.php";
require_once __DIR__ . "/class/Contribution.class.php";
require_once __DIR__ . "/class/Accommodation.class.php";
require_once __DIR__ . "/class/Payment.class.php";
require_once __DIR__ . "/class/Extras.class.php";
require_once __DIR__ . "/class/Summary.class.php";

try {
    $data = json_decode(file_get_contents("php://input"), true);

    print_r($data);

    // Required fields validation
    $required_fields = [
        'title',
        'first_name',
        'last_name',
        'gender',
        'dobYear',
        'dobMonth',
        'dobDay',
        'email',
        'phone',
        'address',
        'postal_code',
        'city',
        'country',
        'is_early_bird',
        'is_online',
        'total_due',
        'paypal_fee'
    ];

    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Generate a random password
    $plain_password = bin2hex(random_bytes(4)); // 8-character random password
    $password_hash = password_hash($plain_password, PASSWORD_DEFAULT);

    // Initialize managers
    $participantManager = new ParticipantManager($pdo);

    // Check if email already exists
    if ($participantManager->emailExists($data['email'])) {
        throw new Exception("The email address '{$data['email']}' is already in use. Please use a different email.");
    }

    $workshopManager = new WorkshopManager($pdo);
    $arrivalManager = new ArrivalManager($pdo);
    $contributionManager = new ContributionManager($pdo);
    $accommodationManager = new AccommodationManager($pdo);
    $paymentManager = new PaymentManager($pdo);
    $extraOptionsManager = new ExtraOptionsManager($pdo);

    // Save participant
    $participant_id = $participantManager->saveParticipant($data, $password_hash);

    // Save workshops
    $workshopManager->saveWorkshops($participant_id, $data);

    // Save arrival details
    $arrivalManager->saveArrivalDetails($participant_id, $data);

    // Save contributions (talks & posters)
    if (!empty($data['talks']) || !empty($data['posters'])) {
        $contributionManager->saveContributions($participant_id, $data['talks'], $data['posters']);
    }

    // Save accommodation and payment details
    $accommodationManager->saveAccommodation($participant_id, $data);
    $paymentManager->savePayment($participant_id, $data);

    // Save extra options
    $extraOptionsManager->saveExtraOptions($participant_id, $data);

    // Prepare email body with all details
    $subject = "IMC " . getenv("YEAR") . " Registration Confirmation";

    // Summary for email
    $emailContent = EmailFormatter::formatEmailContent($data);

    $message = "
        Hello {$data['first_name']} {$data['last_name']},\n\n
        Thank you for registering for IMC " . getenv("YEAR") . ". Below is the summary of your registration:\n\n
        $emailContent\n\n 
        <p>Best regards,<br>IMC " . getenv("YEAR") . " Team</p>";

    // Send confirmation email using PHPMailer
    $mail = new Mail();
    $emailResponse = $mail->sendEmail([$data['email']], $subject, $message);

    // Return success response with password
    echo json_encode([
        "success" => true,
        "message" => "Registration successful",
        "participant_id" => $participant_id,
        "password" => $plain_password,
        "email_status" => $emailResponse
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
