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
 
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Validate required fields
$requiredFields = ['name', 'email', 'subject', 'message', 'token'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        echo json_encode(["success" => false, "message" => ucfirst($field) . " is required"]);
        exit;
    }
}

// Verify reCAPTCHA
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY");
if (!$recaptchaSecret) {
    echo json_encode(["success" => false, "message" => "Missing reCAPTCHA secret key"]);
    exit;
}

$recaptchaResponse = $input['token'];
$recaptchaVerify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
$recaptchaData = json_decode($recaptchaVerify, true);
error_log("reCAPTCHA Response: " . print_r($recaptchaData, true));

if (!$recaptchaData['success']) {
    echo json_encode(["success" => false, "message" => "reCAPTCHA verification failed"]);
    exit;
}

// Process the form
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

    // Set up the OAuth2 provider
    $provider = new Google([
        'clientId'     => $clientId,
        'clientSecret' => $clientSecret,
    ]);

    // Pass the OAuth provider and token information to PHPMailer
    $mail->setOAuth(new OAuth([
        'provider'     => $provider,
        'clientId'     => $clientId,
        'clientSecret' => $clientSecret,
        'refreshToken' => $refreshToken,
        'userName'     => $emailSender,
    ]));

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->AuthType = 'XOAUTH2';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Set sender and recipient
    $mail->setFrom($emailSender, getenv("SMTP_USER_NAME"));
    $mail->addAddress("vperlerin@gmail.com");

    // Email content
    $mail->Subject = $subject;
    $mail->Body = "This message has been sent from the IMC2025 contact from\nName: $name\nEmail: $email\n\nMessage:\n$message";

    // Send the email
    $mail->send();
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
}