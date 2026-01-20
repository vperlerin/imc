<?php 
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Payment.class.php";


// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

// Capture JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

if (!$input || empty($input['payment_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

try {
    $paymentManager = new PaymentManager($pdo);
    $success = $paymentManager->deletePayment($input['payment_id']);

    echo json_encode(["success" => $success, "message" => $success ? "Payment deleted successfully" : "Failed to delete payment"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
