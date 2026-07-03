<?php
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('session.cookie_lifetime', 259200);
ini_set('session.cookie_path', '/');
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_samesite', 'None');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Carpooling.class.php";

try {
    $pdo = Connect::getPDO();
    $manager = new CarpoolingManager($pdo);

    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception("Missing required parameter: id");
    }

    $offer = $manager->getOfferById(intval($_GET['id']));

    if (!$offer) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "Offer not found"]);
        exit;
    }

    $participantId = $_SESSION["participant_id"] ?? null;
    $isOwner = $participantId && intval($offer['participant_id']) === intval($participantId);
    $isAdmin = $_SESSION["is_admin"] ?? false;

    // Only include driver email for non-owners (used for the contact flow)
    if ($isOwner) {
        unset($offer['driver_email']);
    }

    if (!$isAdmin) {
        unset($offer['admin_notes']);
    }

    $response = [
        "success" => true,
        "data" => $offer,
        "is_owner" => $isOwner
    ];

    // For non-owners, include requester info for the contact email flow
    if (!$isOwner && $participantId) {
        $reqStmt = $pdo->prepare("SELECT first_name, last_name, email FROM participants WHERE id = ?");
        $reqStmt->execute([$participantId]);
        $requester = $reqStmt->fetch(PDO::FETCH_ASSOC);
        if ($requester) {
            $response['requester'] = $requester;
        }
    } elseif (!$isOwner && $isAdmin && !$participantId) {
        $adminId = $_SESSION["admin_id"] ?? null;
        if ($adminId) {
            $adminStmt = $pdo->prepare("SELECT email FROM admins WHERE id = ?");
            $adminStmt->execute([$adminId]);
            $admin = $adminStmt->fetch(PDO::FETCH_ASSOC);
            if ($admin) {
                $response['requester'] = [
                    'first_name' => 'Admin',
                    'last_name' => '',
                    'email' => $admin['email'],
                ];
            }
        }
    }

    echo json_encode($response);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
