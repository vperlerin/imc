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

try {
    $data = json_decode(file_get_contents("php://input"), true);

    // Required fields validation
    $required_fields = ['title', 'firstName', 'lastName', 'gender', 'dobYear', 'dobMonth', 'dobDay', 'email', 'phone', 'address', 'postal_code', 'city', 'country'];

    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Generate a random password
    $plain_password = bin2hex(random_bytes(4)); // Generates an 8-character random password
    $password_hash = password_hash($plain_password, PASSWORD_DEFAULT);

    // Initialize ParticipantManager
    $participantManager = new ParticipantManager($pdo);
    $participant_id = $participantManager->saveParticipant($data, $password_hash);

    // Send email confirmation
    $subject = "IMC " . getenv("YEAR") . " Registration Confirmation";
    $message = "
        Hello {$data['firstName']} {$data['lastName']},

        Thank you for registering for IMC " . getenv("YEAR") . ". Here is the information you provided:

        Name: {$data['title']} {$data['firstName']} {$data['lastName']}
        Gender: {$data['gender']}
        Date of Birth: {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}
        Email: {$data['email']}
        Phone: {$data['phone']}
        Address: {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}
        Organization: " . ($data['organization'] ?? "N/A") . "

        You can use the following password to update your record:
        Password: $plain_password

        Please keep this password safe.

        Best regards,
        IMC " . getenv("YEAR") . " Team
    ";

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
?>
