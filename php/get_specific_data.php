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

/**
 * Dynamic registration_types with computed room_left
 * - counts ONLY participants:
 *    - deleted_at IS NULL
 *    - status = 'active'
 *    - is_online = 0
 * - total=0 means "no accommodation" (not capacity-limited) -> room_left = 0
 * - sorted by rt.sort_order then id
 */
function fetchRegistrationTypesLive(PDO $pdo): array
{
  $sql = "
    SELECT
      rt.id,
      rt.type,
      rt.price,
      rt.description,
      rt.sort_order,
      rt.total,
      rt.room_left AS room_left_stored,
      COALESCE(x.used, 0) AS used,
      CASE
        WHEN rt.total > 0 THEN GREATEST(rt.total - COALESCE(x.used, 0), 0)
        ELSE 0
      END AS room_left
    FROM registration_types rt
    LEFT JOIN (
      SELECT
        a.registration_type_id,
        COUNT(*) AS used
      FROM accommodation a
      JOIN participants p ON p.id = a.participant_id
      WHERE p.deleted_at IS NULL
        AND p.status = 'active'
        AND p.is_online = 0
      GROUP BY a.registration_type_id
    ) x ON x.registration_type_id = rt.id
    ORDER BY rt.sort_order ASC, rt.id ASC
  ";

  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  // normalize numeric types for JSON consumers
  return array_map(function ($r) {
    return [
      "id" => (int)$r["id"],
      "type" => (string)$r["type"],
      "price" => isset($r["price"]) ? (float)$r["price"] : 0.0,
      "description" => isset($r["description"]) ? (string)$r["description"] : "",
      "sort_order" => isset($r["sort_order"]) ? (int)$r["sort_order"] : 0,
      "total" => isset($r["total"]) ? (int)$r["total"] : 0,
      "used" => isset($r["used"]) ? (int)$r["used"] : 0,
      "room_left" => isset($r["room_left"]) ? (int)$r["room_left"] : 0, 
      "room_left_stored" => isset($r["room_left_stored"]) ? (int)$r["room_left_stored"] : null,
    ];
  }, $rows);
}

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

  // Always dynamic availability live
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
