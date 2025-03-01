<?php
// Allow CORS for local development & production
$allowed_origins = [
  "https://imc2025.imo.net",
  "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Load dependencies
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";  
require_once __DIR__ . "/class/Payment.class.php";

try {
  $paymentManager = new PaymentManager($pdo);
  $payment_methods = $paymentManager->getPaymentMethods();

    echo json_encode([
        "success" => true,
        "data" => $payment_methods
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch workshops: " . $e->getMessage()
    ]);
}
