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

try {
  $query = "
    SELECT * FROM registration_types;
    SELECT * FROM payment_methods;
    SELECT * FROM workshops;
    SELECT * FROM imc_sessions;
";
  $stmt = $pdo->prepare($query);
  $stmt->execute();

  $results = [];
  $results['registration_types'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->nextRowset(); 
  $results['payment_methods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->nextRowset();  
  $results['workshops'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->nextRowset();  
  $results['sessions'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    "success" => true,
    "data" => $results
  ]);
} catch (Exception $e) {
  echo json_encode([
    "success" => false,
    "message" => "Failed to fetch specific IMC data: " . $e->getMessage()
  ]);
}
