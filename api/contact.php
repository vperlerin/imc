<?php
header("Access-Control-Allow-Origin: https://imc2025.imo.net");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php'; 
require_once "config.php";

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
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY") ?? $_ENV["RECAPTCHA_SECRET_KEY"] ?? $_SERVER["RECAPTCHA_SECRET_KEY"];
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
    // SMTP Configuration
    $mail->SMTPDebug = 2;  // Use 2 for debugging, 0 for production
    $mail->isSMTP();
    $mail->Host = getenv("SMTP_HOST") ?? $_ENV["SMTP_HOST"] ?? $_SERVER["SMTP_HOST"];
    $mail->SMTPAuth = true;
    $mail->Username = getenv("SMTP_USER") ?? $_ENV["SMTP_USER"] ?? $_SERVER["SMTP_USER"];
    $mail->Password = getenv("SMTP_PWD") ?? $_ENV["SMTP_PWD"] ?? $_SERVER["SMTP_PWD"];
    $mail->SMTPSecure = getenv("SMTP_SECURE") ?? $_ENV["SMTP_SECURE"] ?? $_SERVER["SMTP_SECURE"];
    $mail->Port = (int) (getenv("SMTP_TLS_PORT") ?? $_ENV["SMTP_TLS_PORT"] ?? $_SERVER["SMTP_TLS_PORT"]);

    // Set sender and recipient
    $mail->setFrom(getenv("SMTP_USER_EMAIL") ?? $_ENV["SMTP_USER_EMAIL"] ?? $_SERVER["SMTP_USER_EMAIL"], 
                   getenv("SMTP_USER_NAME") ?? $_ENV["SMTP_USER_NAME"] ?? $_SERVER["SMTP_USER_NAME"]);
    $mail->addAddress("vperlerin@gmail.com");

    // Email content
    $mail->Subject = "Contact Form: " . $subject;
    $mail->Body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Send the email
    $mail->send();
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} catch (Exception $e) {
    echo("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(["success" => false, "message" => "Failed to send message. Check logs."]);
}
