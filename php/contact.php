<?php
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require '../vendor/autoload.php';
require_once __DIR__ . "/config.php";

// Capture raw input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

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

if (!isset($recaptchaData['success']) || !$recaptchaData['success']) {
    echo json_encode(["success" => false, "message" => "reCAPTCHA verification failed"]);
    exit;
}

// Process form data securely
$name = htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8');
$email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars($input['subject'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8');

if (!$email) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit;
}

// Prepare email content
$emailMessage = "This message has been sent from the IMC2025 contact form<br><br>";
$emailMessage .= "Name: $name<br>";
$emailMessage .= "Email: $email<br>";
$emailMessage .= "Message:\n$message<br>";

// Define the Reply-To address
$to = getenv("CONTACT_EMAIL");
$to_name = getenv("CONTACT_NAME");

$bcc = getenv('BCC_ALL');

// Convert BCC into an array if valid 
$bccRecipients = [];

if ($bcc) {
    $bccArray = array_map('trim', explode(',', $bcc));
    
    foreach ($bccArray as $bccEmail) {
        if (filter_var($bccEmail, FILTER_VALIDATE_EMAIL)) {
            $bccRecipients[] = ['email' => $bccEmail, 'name' => 'BCC Recipient'];
        } else {
            error_log("Invalid BCC email: $bccEmail");
        }
    }
}

// Prepare API request payload
$data = [
    "subject" => $subject,
    "message" => $emailMessage,
    "to" => $to,
    "to_name" => $to_name,
    "from_name" => "IMC 2025",
    "reply_to" => $email,
    "reply_name" => $name,
    "bcc" => $bccRecipients
];

// Send the request to the API using cURL
$ch = curl_init("https://www.imo.net/members/api/imc_mailer_api/send_email");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Return API response
http_response_code($httpCode);
echo $response;
?>
