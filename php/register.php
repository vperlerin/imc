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
require_once __DIR__ . "/class/Connect.class.php"; // Ensures $pdo is loaded
require_once __DIR__ . "/class/ConferenceData.class.php";
require_once __DIR__ . "/class/Mail.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require_once __DIR__ . "/class/Workshop.class.php";
require_once __DIR__ . "/class/Arrival.class.php";
require_once __DIR__ . "/class/Contribution.class.php";
require_once __DIR__ . "/class/Accommodation.class.php";
require_once __DIR__ . "/class/Payment.class.php";
require_once __DIR__ . "/class/Extras.class.php";
require_once __DIR__ . "/class/Summary.class.php";

function create_email(array $data, string $summary): string
{
    $year = getenv("YEAR");
    $paymentLink = "https://imc{$year}.imo.net/payment";

    $message = "
        <p>Hello <b>{$data['first_name']} {$data['last_name']}</b>,</p>
        <p>Thank you for registering for IMC <b>{$year}</b>. Your registration is nearly complete.</p>
    ";

    if (strtolower($data['payment_method']) == 'paypal') {
        $message .= "<p>If you haven't paid already, all";
    } else {
        $message .= "<p>All";
    }

    $message .= " you need to do now is send the required payment of:</p>
        <p><b>{$data['total_due']} €</b></p>";

    $message .= "
        <p>The necessary instructions for making your payment can be found 
        <a href='{$paymentLink}'>on this page</a>.</p>

        <p>The registration fee should be sent to the IMO Treasurer 
        <b style='color:red'>IMMEDIATELY</b>. Delaying payment will result in the 
        <b>cancellation of your registration</b>.</p>

        <p>Best regards,</p>
        <p><b>IMC {$year} Team</b></p>

        <hr>

        <h3>Billing Details</h3>
        <h3>Registration Details</h3>
        {$summary}
    ";

    return $message;
}

function create_email_workshop(array $data, string $workshopTitle, array $workshopDirector, ParticipantManager $participantManager): string
{
    $workshopStats = $participantManager->getWorkshopParticipants($workshopTitle);
    $totalRegistered = $workshopStats['total_registered'] ?? 0;
    $confirmedParticipants = $workshopStats['confirmed_participants'] ?? 0;
    $unconfirmedParticipants = $workshopStats['unconfirmed_participants'] ?? 0;

    $message = "
        <p>Hey <b>{$workshopDirector['name']}</b>,</p>
        <p>We are pleased to announce that a new user just registered for the <b>{$workshopTitle}</b> 
    ";

    if ($data['is_online']) {
        $message .= " ONLINE EDITION.</p>";
    } else {
        $message .= " ONSITE EDITION.</p>";
    }

    $message .= "<p>Here are the participant details:</p>";
    $message .= "<b>Name:</b> {$data['title']} {$data['first_name']} {$data['last_name']}<br>";
    $message .= "<b>Email:</b> {$data['email']}<br>";

    if (!empty($data['organization'])) {
        $message .= "<b>Organization:</b> {$data['organization']}<br>";
    }

    $message .= "
        <p><b>Current Workshop Registration Stats:</b></p>
        <ul>
            <li><b>Total Registered:</b> {$totalRegistered}</li>
            <li><b>Confirmed Participants:</b> {$confirmedParticipants}</li>
            <li><b>Unconfirmed Participants:</b> {$unconfirmedParticipants}</li>
        </ul>
    ";

    $message .= "<p>As soon as the participant pays their due fees, they will appear on <a href='https://imc" . getenv('YEAR') . ".imo.net/community/participants'>this page</a>.</p>";

    return $message;
}

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $required_fields = [
        'title',
        'first_name',
        'last_name',
        'email',
        'total_due',
        'paypal_fee',
        'registration_type',
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

    // Initialize ParticipantManager using existing $pdo from Connect.class.php
    $participantManager = new ParticipantManager($pdo);

    if ($participantManager->emailExists($data['email'])) {
        throw new Exception("The email address '{$data['email']}' is already in use. Please use a different email.");
    }

    // Save participant
    $participant_id = $participantManager->saveParticipant($data, $password_hash);

    
    // Get all workshops from the database
    $workshopManager = new WorkshopManager($pdo);
    $workshops = $workshopManager->getWorkshops(); // Fetch all workshops dynamically

    var_dump($workshops);

    $subject = "IMC " . getenv("YEAR") . " Registration";
    $summary = SummaryFormatter::formatEmailContent($data, $workshops, true);

    // Send confirmation email
    $mail = new Mail();
    $message = create_email($data, $summary);
    $emailResponse = $mail->sendEmail([$data['email']], $subject, $message);

    // Send workshop-specific emails
    foreach ($workshops as $workshop) {
        $workshopTitle = $workshop['title']; // Assuming the table has a 'title' column

        if (!empty($data['workshops'][$workshopTitle]) && $data['workshops'][$workshopTitle] === "true") {
            $workshopContact = ConferenceData::getWorkshopEmailTo($workshopTitle);

            if ($workshopContact && isset($workshopContact['email'])) {
                $workshopMessage = create_email_workshop($data, $workshopTitle, $workshopContact, $participantManager);
                $workshopMail = new Mail();
                $workshopMail->sendEmail(
                    [$workshopContact['email']],
                    "New {$workshopTitle} registration",
                    $workshopMessage,
                    $workshopContact['email'],
                    is_array(getenv('BCC_ALL')) ? getenv('BCC_ALL') : explode(',', getenv('BCC_ALL'))
                );
            }
        }
    }

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
