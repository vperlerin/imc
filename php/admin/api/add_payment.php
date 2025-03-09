<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Payment.class.php";
require_once __DIR__ . "/../../class/Connect.class.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Ensure this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed. Use POST."]);
    exit;
}

// Capture and decode JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

// Validate input
if (!$input || !isset($input['participant_id'], $input['amount'], $input['payment_method_id'], $input['payment_date'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid input. Required fields: participant_id, amount, payment_method_id, payment_date."]);
    exit;
}

try {
    $pdo->beginTransaction();

    $participantId = (int) $input['participant_id'];
    $amount = floatval($input['amount']);
    $paymentMethodId = intval($input['payment_method_id']);
    $paymentDate = trim($input['payment_date']);
    $adminNote = isset($input['admin_note']) ? trim($input['admin_note']) : null;

    // Validate numerical values
    if ($participantId <= 0 || $paymentMethodId <= 0) {
        throw new Exception("Invalid values provided. Participant ID and payment method ID must be positive numbers.");
    }

    // Ensure the date format is valid (YYYY-MM-DD)
    if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $paymentDate)) {
        throw new Exception("Invalid payment date format. Expected YYYY-MM-DD.");
    }

    // Initialize PaymentManager
    $paymentManager = new PaymentManager($pdo);
    
    // Add payment using PaymentManager's method
    $success = $paymentManager->addPayment(
        $participantId,
        $amount,
        $paymentMethodId,
        $paymentDate,
        $adminNote
    );

    if (!$success) {
        throw new Exception("Failed to add payment.");
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Payment Added Successfully"
    ]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
