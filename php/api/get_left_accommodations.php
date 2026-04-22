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
require_once __DIR__ . "/../lib/registration_types_live.php";

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
