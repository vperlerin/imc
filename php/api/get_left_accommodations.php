<?php

$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../class/Connect.class.php";

// Handle preflight OPTIONS request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validate type filter (optional)
$typeFilter = $_GET['type'] ?? null;
if ($typeFilter !== null && !in_array($typeFilter, ['no', 'not_no'], true)) {
    echo json_encode(["success" => false, "message" => "Invalid type filter"]);
    exit;
}

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
    exit;
}

/**
 * Live computation of registration types availability (room_left)
 * based on current active, non-deleted, on-site participants.
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
            "room_left_stored" => array_key_exists("room_left_stored", $r) && $r["room_left_stored"] !== null
                ? (int)$r["room_left_stored"]
                : null,
        ];
    }, $rows);
}

try {
    $rows = fetchRegistrationTypesLive($pdo);

    // Apply optional type filter (kept compatible with previous API)
    if ($typeFilter === 'no') {
        $rows = array_values(array_filter($rows, function ($r) {
            return isset($r['type']) && $r['type'] === 'no';
        }));
    } elseif ($typeFilter === 'not_no') {
        $rows = array_values(array_filter($rows, function ($r) {
            return isset($r['type']) && $r['type'] !== 'no';
        }));
    }

    echo json_encode(["success" => true, "data" => $rows]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
