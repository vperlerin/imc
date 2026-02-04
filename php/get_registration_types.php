<?php
/**
 * registration_types.php
 * Returns registration types + live availability (room_left), computed from DB.
 *
 * Rules:
 * - Only count participants with p.deleted_at IS NULL
 * - (recommended) Only count p.status = 'active'
 * - Only count onsite participants (p.is_online = 0)
 * - total = 0 means "no accommodation" (not capacity-limited)
 */

// --- Errors (optional, remove in prod) ---
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// --- CORS ---
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000",
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Includes ---
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";

// --- JSON output ---
header("Content-Type: application/json; charset=utf-8");

try {
    $pdo = Connect::getPDO();

    /**
     * Live availability:
     * used = number of ACTIVE, ONSITE, NOT DELETED participants having this registration_type_id
     * room_left = max(total - used, 0) for total > 0
     * for total = 0 ("no accommodation"), room_left is set to 0
     */
    $sql = "
        SELECT
            rt.id,
            rt.type,
            rt.price,
            rt.description,
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
        ORDER BY
            CASE rt.type
                WHEN 'quadruple' THEN 1
                WHEN 'double' THEN 2
                WHEN 'single' THEN 3
                WHEN 'no' THEN 99
                ELSE 50
            END,
            rt.id ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Normalize types for JSON consumers
    $out = array_map(function ($r) {
        return [
            "id" => (int)$r["id"],
            "type" => (string)$r["type"],
            "price" => isset($r["price"]) ? (float)$r["price"] : 0.0,
            "description" => isset($r["description"]) ? (string)$r["description"] : "",
            "total" => isset($r["total"]) ? (int)$r["total"] : 0,
            "used" => isset($r["used"]) ? (int)$r["used"] : 0,
            "room_left" => isset($r["room_left"]) ? (int)$r["room_left"] : 0, 
            "room_left_stored" => isset($r["room_left_stored"]) ? (int)$r["room_left_stored"] : null,
        ];
    }, $rows);

    echo json_encode([
        "success" => true,
        "data" => $out,
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage(),
    ], JSON_UNESCAPED_UNICODE);
}
