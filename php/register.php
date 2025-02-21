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
    $required_fields = [
        'title',
        'firstName', 
        'lastName', 
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
        'is_online'
    ];

    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format.");
    }

    // Validate guardian email if provided
    if (!empty($data['guardian_email']) && !filter_var($data['guardian_email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid guardian email format.");
    }

    // Validate phone numbers
    if (!preg_match('/^\+?[0-9\s\-]{7,20}$/', $data['phone'])) {
        throw new Exception("Invalid phone number format.");
    }
    if (!empty($data['guardian_contact']) && !preg_match('/^\+?[0-9\s\-]{7,20}$/', $data['guardian_contact'])) {
        throw new Exception("Invalid guardian contact number format.");
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
        <h2>Hello {$data['firstName']} {$data['lastName']},</h2>
        <p>Thank you for registering for IMC " . getenv("YEAR") . ". Here is the information you provided:</p>
        <ul>
            <li><strong>Name:</strong> {$data['title']} {$data['firstName']} {$data['lastName']}</li>
            <li><strong>Gender:</strong> {$data['gender']}</li>
            <li><strong>Date of Birth:</strong> {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}</li>
            <li><strong>Email:</strong> {$data['email']}</li>
            <li><strong>Phone:</strong> {$data['phone']}</li>
            <li><strong>Address:</strong> {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}</li>
            <li><strong>Organization:</strong> " . ($data['organization'] ?? "N/A") . "</li>
        </ul>";

    if (!empty($data['comments'])) {
        $message .= "<p><strong>Comments:</strong> {$data['comments']}</p>";
    }

    if (!empty($data['guardian_name'])) {
        $message .= "
        <h3>Guardian Information:</h3>
        <ul>
            <li><strong>Guardian Name:</strong> {$data['guardian_name']}</li>
            <li><strong>Guardian Contact:</strong> {$data['guardian_contact']}</li>
            <li><strong>Guardian Email:</strong> {$data['guardian_email']}</li>
        </ul>";
    }

    $message .= "
        <p><strong>Your registration password:</strong> <span style='font-weight:bold; color:#d9534f;'>$plain_password</span></p>
        <p>You can use this password to update your record.</p>
        <p>Best regards,<br>IMC " . getenv("YEAR") . " Team</p>
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
