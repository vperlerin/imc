<?php
header("Access-Control-Allow-Origin: https://imc2025.imo.net");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 
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
    // Enable SMTP debugging if needed
    $mail->SMTPDebug = 0; // Use 2 for debugging output
    $mail->isSMTP();
    $mail->Host = getenv("SMTP_HOST"); // Load from .env
    $mail->SMTPAuth = true;
    $mail->Username = getenv("SMTP_USER"); // Gmail SMTP email
    $mail->Password = getenv("SMTP_PWD"); // Gmail SMTP password or App Password
    $mail->SMTPSecure = getenv("SMTP_SECURE"); // Use 'tls' or 'ssl'
    $mail->Port = getenv("SMTP_TLS_PORT"); // Use 587 for TLS, 465 for SSL

    // Set sender and recipient
    $mail->setFrom(getenv("SMTP_USER_EMAIL"), getenv("SMTP_USER_NAME"));
    $mail->addAddress("vperlerin@gmail.com"); // Your receiving email

    // Email content
    $mail->Subject = "Contact Form: " . htmlspecialchars($input['subject']);
    $mail->Body = "Name: " . htmlspecialchars($input['name']) . "\n"
                . "Email: " . htmlspecialchars($input['email']) . "\n\n"
                . "Message:\n" . htmlspecialchars($input['message']);

    // Send the email
    $mail->send();
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} catch (Exception $e) {
    error_log("Mailer Error: " . $mail->ErrorInfo);
    echo json_encode(["success" => false, "message" => "Failed to send message"]);
}
