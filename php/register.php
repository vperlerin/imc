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

try {
    $data = json_decode(file_get_contents("php://input"), true);

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
        'total',
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

    $message = "
    <h2>Hello {$data['first_name']} {$data['last_name']},</h2>
    <p>Thank you for registering for IMC " . getenv("YEAR") . ". Below is the summary of your registration:</p>
    
    <h3>Personal Information</h3>
    <ul>
        <li><strong>Name:</strong> {$data['title']} {$data['first_name']} {$data['last_name']}</li>
        <li><strong>Gender:</strong> {$data['gender']}</li>
        <li><strong>Date of Birth:</strong> {$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}</li>
        <li><strong>Email:</strong> {$data['email']}</li>
        <li><strong>Phone:</strong> {$data['phone']}</li>
        <li><strong>Address:</strong> {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}</li>
        <li><strong>Organization:</strong> " . ($data['organization'] ?? "N/A") . "</li>
    </ul>

    <h3>Workshops</h3>
    <ul>
        <li><strong>Spectroscopy Workshop:</strong> " . ($data['Spectroscopy Workshop'] === "true" ? "Yes" : "No") . "</li>
        <li><strong>Radio Workshop:</strong> " . ($data['Radio Workshop'] === "true" ? "Yes" : "No") . "</li>
    </ul>

    <h3>Arrival & Departure</h3>
    <ul>
        <li><strong>Arrival Date:</strong> {$data['arrival_date']}</li>
        <li><strong>Arrival Time:</strong> {$data['arrival_hour']}:{$data['arrival_minute']}</li>
        <li><strong>Departure Date:</strong> {$data['departure_date']}</li>
        <li><strong>Departure Time:</strong> {$data['departure_hour']}:{$data['departure_minute']}</li>
        <li><strong>Travel Method:</strong> {$data['travelling']}</li>
        <li><strong>Travel Details:</strong> " . ($data['travelling_details'] ?? "N/A") . "</li>
    </ul>";

    if (!empty($data['talks'])) {
        $message .= "<h3>Talk Contributions</h3><ul>";
        foreach ($data['talks'] as $talk) {
            $message .= "
            <li><strong>Title:</strong> {$talk['title']}</li>
            <li><strong>Authors:</strong> {$talk['authors']}</li>
            <li><strong>Abstract:</strong> {$talk['abstract']}</li>
            <li><strong>Session:</strong> {$talk['session']}</li>
            <li><strong>Duration:</strong> {$talk['duration']}</li> 
            <br>";
        }
        $message .= "</ul>";
    }

    if (!empty($data['posters'])) {
        $message .= "<h3>Poster Contributions</h3><ul>";
        foreach ($data['posters'] as $poster) {
            $message .= "
            <li><strong>Title:</strong> {$poster['title']}</li>
            <li><strong>Authors:</strong> {$poster['authors']}</li>
            <li><strong>Abstract:</strong> {$poster['abstract']}</li>
            <li><strong>Session:</strong> {$poster['session']}</li> 
            <br>";
        }
        $message .= "</ul>";
    }

    $message .= "
    <h3>Accommodation & Payment</h3>
    <ul>
        <li><strong>Registration Type:</strong> {$data['registrationType']}</li>
        <li><strong>Payment Method:</strong> {$data['paymentMethod']}</li>
    </ul>

    <h3>Extra Options</h3>
    <ul>
        <li><strong>Excursion:</strong> " . ($data['excursion'] === "yes" ? "Yes" : "No") . "</li>
        <li><strong>Buy T-Shirt:</strong> " . ($data['buy_tshirt'] === "yes" ? "Yes" : "No") . "</li>
        <li><strong>T-Shirt Size:</strong> " . ($data['tshirt_size'] ?? "N/A") . "</li>
    </ul>";

    if (!empty($data['comments'])) {
        $message .= "<h3>Comments</h3><p>{$data['comments']}</p>";
    }

    $message .= "
    <h3>Your Registration Password</h3>
    <p><strong><span style='font-weight:bold; color:#d9534f;'>$plain_password</span></strong></p>
    <p>You can use this password to update your registration details.</p>

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
