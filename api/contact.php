<?php
header("Access-Control-Allow-Origin: https://imc2025.imo.net");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

// Example: Send email (modify as needed)
$to = "vperlerin@gmail.com";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$mailSent = mail($to, "Contact Form: $subject", "Name: $name\nEmail: $email\n\nMessage:\n$message", $headers);

if ($mailSent) {
    echo json_encode(["success" => true, "message" => "Message sent successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send message"]);
}
?>
