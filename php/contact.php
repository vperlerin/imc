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
var_dump("Raw Input: " . $rawInput);

$input = json_decode($rawInput, true);

if (!$input) {
    var_dump("Invalid input received.");
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Validate required fields
$requiredFields = ['name', 'email', 'subject', 'message', 'token'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        var_dump("Missing field: $field");
        echo json_encode(["success" => false, "message" => ucfirst($field) . " is required"]);
        exit;
    }
}

// Verify reCAPTCHA
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY");
if (!$recaptchaSecret) {
    var_dump("Missing reCAPTCHA secret key.");
    echo json_encode(["success" => false, "message" => "Missing reCAPTCHA secret key"]);
    exit;
}

$recaptchaResponse = $input['token'];
$recaptchaVerify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
$recaptchaData = json_decode($recaptchaVerify, true);
var_dump("reCAPTCHA Response: " . print_r($recaptchaData, true));

if (!$recaptchaData['success']) {
    var_dump("reCAPTCHA verification failed: " . print_r($recaptchaData, true));
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

    // Log OAuth settings
    var_dump("OAuth2 Setup:");
    var_dump("Client ID: " . ($clientId ? "Loaded" : "Missing"));
    var_dump("Client Secret: " . ($clientSecret ? "Loaded" : "Missing"));
    var_dump("Refresh Token: " . ($refreshToken ? "Loaded" : "Missing"));
    var_dump("Sender Email: " . ($emailSender ? $emailSender : "Missing"));

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

    var_dump("SMTP Configuration:");
    var_dump("SMTP Host: " . getenv("SMTP_HOST"));
    var_dump("Auth Type: " . getenv("SMTP_AUTH_TYPE"));
    var_dump("SMTP Secure: " . PHPMailer::ENCRYPTION_STARTTLS);
    var_dump("SMTP Port: " . getenv("SMTP_TLS_PORT"));

    // Set sender and recipient
    $mail->setFrom($emailSender, getenv("SMTP_USER_NAME"));
    $mail->addAddress("vperlerin@gmail.com");

    // Email content
    $mail->Subject = $subject;
    $mail->Body = "This message has been sent from the IMC2025 contact form\n\nName: $name\nEmail: $email\n\nMessage:\n$message";

    // Attempt to send email
    if ($mail->send()) {
        var_dump("Email sent successfully to vperlerin@gmail.com");
        echo json_encode(["success" => true, "message" => "Message sent successfully"]);
    } else {
        var_dump("Email failed to send: " . $mail->ErrorInfo);
        echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
    }
} catch (Exception $e) {
    var_dump("Mailer Exception: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
}
