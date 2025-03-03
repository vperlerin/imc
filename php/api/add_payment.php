<?php
require '../vendor/autoload.php';
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/../class/PaymentManager.php";

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


require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Capture JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

// Validate required fields
$requiredFields = ['participant_id', 'amount', 'payment_method_id'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        echo json_encode(["success" => false, "message" => ucfirst($field) . " is required"]);
        exit;
    }
}

try {
    $paymentManager = new PaymentManager($pdo);

    $success = $paymentManager->addPayment(
        $input['participant_id'],
        $input['amount'],
        $input['payment_method_id'],
        $input['admin_note'] ?? null
    );

    echo json_encode(["success" => $success, "message" => $success ? "Payment added successfully" : "Failed to add payment"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
