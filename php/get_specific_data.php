<?php

// Allow CORS for local development & production
$allowed_origins = [
  "https://imc2026.imo.net",
  "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// Load dependencies
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/lib/registration_types_live.php";

// DB
try {
  $pdo = Connect::getPDO();
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => $e->getMessage()
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

// Initialize Memcached
$memcached = new Memcached();
$memcached->addServer('localhost', 11211);

$cacheKey = 'imc_specific_data_static';
$cacheTTL = 4320000;  // 50 days

try {
  // Cache ONLY static data (payment_methods, workshops, sessions)
  $results = $memcached->get($cacheKey);

  if (!$results || !is_array($results)) {
    $results = [];

    // Multi-statement query for static data
    $query = "
      SELECT * FROM payment_methods;
      SELECT * FROM workshops;
      SELECT * FROM imc_sessions;
    ";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $results['payment_methods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->nextRowset();
    $results['workshops'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt->nextRowset();
    $results['sessions'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $memcached->set($cacheKey, $results, $cacheTTL);
  }

  // Always dynamic availability live: no cache as we compute the # of room available
  $results['registration_types'] = fetchRegistrationTypesLive($pdo);

  echo json_encode([
    "success" => true,
    "data" => $results
  ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "Failed to fetch specific IMC data: " . $e->getMessage()
  ], JSON_UNESCAPED_UNICODE);
}
