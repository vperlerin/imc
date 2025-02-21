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
 
require_once "config.php";
require_once "./class/connect_db.php";
require_once "./class/Mail.php";  

try {
  $data = json_decode(file_get_contents("php://input"), true);

  // Required fields
  $required_fields = ['title', 'first_name', 'last_name', 'gender', 'dob', 'email', 'phone', 'address', 'postal_code', 'city', 'country'];

  foreach ($required_fields as $field) {
      if (empty($data[$field])) {
          throw new Exception("Missing required field: $field");
      }
  }

  // Generate a random password
  $plain_password = bin2hex(random_bytes(4)); // Generates an 8-character random password
  $password_hash = password_hash($plain_password, PASSWORD_DEFAULT);

  // Insert participant into DB
  $stmt = $pdo->prepare("
      INSERT INTO participants (title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, organization, password_hash, created_at, updated_at)
      VALUES (:title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, :organization, :password_hash, NOW(), NOW())
  ");

  $stmt->execute([
      ':title' => $data['title'],
      ':first_name' => $data['first_name'],
      ':last_name' => $data['last_name'],
      ':gender' => $data['gender'],
      ':dob' => $data['dob'],
      ':email' => $data['email'],
      ':phone' => $data['phone'],
      ':address' => $data['address'],
      ':postal_code' => $data['postal_code'],
      ':city' => $data['city'],
      ':country' => $data['country'],
      ':organization' => $data['organization'] ?? null,
      ':password_hash' => $password_hash
  ]);

  // Get inserted participant ID
  $participant_id = $pdo->lastInsertId();

  // Send email confirmation
  $subject = "IMC". getenv("YEAR") . " Registration Confirmation";
  $message = "
      Hello {$data['first_name']} {$data['last_name']},

      Thank you for registering for IMC2025. Here is the information you provided:

      Name: {$data['title']} {$data['first_name']} {$data['last_name']}
      Gender: {$data['gender']}
      Date of Birth: {$data['dob']}
      Email: {$data['email']}
      Phone: {$data['phone']}
      Address: {$data['address']}, {$data['postal_code']}, {$data['city']}, {$data['country']}
      Organization: " . ($data['organization'] ?? "N/A") . "

      You can use the following password to update your record:
      Password: $plain_password

      Please keep this password safe.

      Best regards,
      IMC2025 Team
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