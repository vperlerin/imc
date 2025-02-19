<?php
header("Access-Control-Allow-Origin: https://imc2025.imo.net");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

require '../vendor/autoload.php'; 
require_once "config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

// Capture raw input for debugging
$rawInput = file_get_contents("php://input");
echo "Raw Input: " . $rawInput . "\n";

$input = json_decode($rawInput, true);

if (!$input) {
    echo "Invalid input received.\n";
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Validate required fields
$requiredFields = ['name', 'email', 'subject', 'message', 'token'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        echo "Missing field: $field\n";
        echo json_encode(["success" => false, "message" => ucfirst($field) . " is required"]);
        exit;
    }
}

// Verify reCAPTCHA
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY");
if (!$recaptchaSecret) {
    echo "Missing reCAPTCHA secret key.\n";
    echo json_encode(["success" => false, "message" => "Missing reCAPTCHA secret key"]);
    exit;
}

$recaptchaResponse = $input['token'];
$recaptchaVerify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
$recaptchaData = json_decode($recaptchaVerify, true);
echo "reCAPTCHA Response: " . print_r($recaptchaData, true) . "\n";

if (!$recaptchaData['success']) {
    echo "reCAPTCHA verification failed: " . print_r($recaptchaData, true) . "\n";
    echo json_encode(["success" => false, "message" => "reCAPTCHA verification failed"]);
    exit;
}

// Process form data
$name = htmlspecialchars($input['name']);
$email = htmlspecialchars($input['email']);
$subject = htmlspecialchars($input['subject']);
$message = htmlspecialchars($input['message']);

$mail = new PHPMailer(true);

try {
    // OAuth2 Configuration
    $clientId = getenv("SMTP_CLIENT_ID");
    $clientSecret = getenv("SMTP_CLIENT_SECRET");
    $refreshToken = getenv("SMTP_REFRESH_TOKEN");
    $emailSender = getenv("SMTP_USER_EMAIL");

     
    if (!$clientId || !$clientSecret || !$refreshToken || !$emailSender) {
        throw new Exception("Missing OAuth credentials.");
    }

    // Set up the OAuth2 provider
    $provider = new Google([
        'clientId'     => $clientId,
        'clientSecret' => $clientSecret,
    ]);

    $mail->setOAuth(new OAuth([
        'provider'     => $provider,
        'clientId'     => $clientId,
        'clientSecret' => $clientSecret,
        'refreshToken' => $refreshToken,
        'userName'     => $emailSender,
    ]));

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = getenv("SMTP_HOST");
    $mail->SMTPAuth = true;
    $mail->AuthType = getenv("SMTP_AUTH_TYPE");
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = getenv("SMTP_TLS_PORT");
 
    // Set sender and recipient
    $mail->setFrom($emailSender, getenv("SMTP_USER_NAME"));
    $mail->addAddress("vperlerin@gmail.com");

    // Email content
    $mail->Subject = $subject;
    $mail->Body = "This message has been sent from the IMC2025 contact form\n\nName: $name\nEmail: $email\n\nMessage:\n$message";

    // Attempt to send email
    if ($mail->send()) { 
        echo json_encode(["success" => true, "message" => "Message sent successfully"]);
    } else { 
        echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
    }
} catch (Exception $e) {
    echo "Mailer Exception: " . $e->getMessage() . "\n";
    echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
}
