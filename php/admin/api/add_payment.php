<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require '../vendor/autoload.php';
require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../PaymentManager.php";
require_once __DIR__ . "/../../class/Connect.class.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

// Capture JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input || empty($input['payment_id'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid input. Payment ID is required."]);
    exit;
}

try {
    // Ensure participant ID is provided via query parameter
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        throw new Exception("Invalid request. Participant ID is required and must be a number.");
    }

    $participantId = (int) $_GET['id'];

    if (empty($input['amount']) || empty($input['payment_method_id'])) {
        throw new Exception("Invalid data. Amount and payment method ID are required.");
    }

    // Initialize PaymentManager using $pdo
    $paymentManager = new PaymentManager($pdo);
    $success = $paymentManager->addPayment(
        $participantId,
        floatval($input['amount']),
        intval($input['payment_method_id']),
        isset($input['admin_note']) ? trim($input['admin_note']) : null
    );

    echo json_encode([
        "success" => $success,
        "message" => $success ? "Payment Added" : "Failed to add payment"
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
