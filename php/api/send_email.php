<?php

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$allowedOrigins = ['https://imc2026.imo.net', 'http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Origin denied']);
    return;
}
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    return;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    return;
}

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../class/Connect.class.php';
require_once __DIR__ . '/../class/Mailer.class.php';

function failMailRequest($status, $message)
{
    http_response_code($status);
    echo json_encode(['status' => 'error', 'message' => $message]);
}

function normalizeMailAddress($value)
{
    return strtolower(trim((string) $value));
}

function allowedConfiguredAddresses()
{
    $addresses = [];
    foreach (['REACT_APP_CONTACT_EMAIL', 'TRESORER_EMAIL', 'ADMIN1_EMAIL', 'ADMIN2_EMAIL'] as $key) {
        $addresses[] = normalizeMailAddress(getenv($key));
    }
    $bcc = getenv('MAIL_BCC') ?: getenv('REACT_APP_BCC_ALL');
    foreach (explode(',', (string) $bcc) as $address) {
        $addresses[] = normalizeMailAddress($address);
    }
    return array_values(array_unique(array_filter($addresses)));
}

function knownDatabaseAddress(PDO $pdo, $email)
{
    $stmt = $pdo->prepare(
        'SELECT 1 FROM participants WHERE LOWER(email) = ? '
        . 'UNION ALL SELECT 1 FROM admins WHERE LOWER(email) = ? '
        . 'UNION ALL SELECT 1 FROM workshops WHERE LOWER(responsible_email) = ? LIMIT 1'
    );
    $stmt->execute([$email, $email, $email]);
    return (bool) $stmt->fetchColumn();
}

function withinMailRate($key, $limit, $window)
{
    $directory = sys_get_temp_dir() . '/imc2026-mail-rate';
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        return false;
    }
    $handle = fopen($directory . '/' . hash('sha256', $key), 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        return false;
    }
    $events = json_decode(stream_get_contents($handle) ?: '[]', true);
    $events = is_array($events) ? $events : [];
    $cutoff = time() - $window;
    $events = array_values(array_filter($events, function ($time) use ($cutoff) {
        return is_int($time) && $time >= $cutoff;
    }));
    $allowed = count($events) < $limit;
    if ($allowed) {
        $events[] = time();
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($events));
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}

function validRecaptcha($token)
{
    $secret = getenv('RECAPTCHA_SECRET_KEY');
    if (!$secret) {
        return false;
    }
    $context = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        'timeout' => 8,
    ]]);
    $response = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    $result = $response === false ? null : json_decode($response, true);
    return is_array($result) && !empty($result['success']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 250000) {
    failMailRequest(413, 'Request too large');
    return;
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    failMailRequest(400, 'Invalid JSON');
    return;
}
foreach (['subject', 'message', 'to', 'to_name', 'reply_to', 'reply_name'] as $field) {
    if (!isset($data[$field]) || !is_string($data[$field])) {
        failMailRequest(400, 'Missing or invalid field: ' . $field);
        return;
    }
}

$to = normalizeMailAddress($data['to']);
$replyTo = normalizeMailAddress($data['reply_to']);
if (!filter_var($to, FILTER_VALIDATE_EMAIL)
    || ($replyTo !== '' && !filter_var($replyTo, FILTER_VALIDATE_EMAIL))) {
    failMailRequest(400, 'Invalid email address');
    return;
}
if (strlen($data['subject']) > 255 || strlen($data['message']) > 200000) {
    failMailRequest(400, 'Email content is too long');
    return;
}
if (preg_match('~<(?:script|iframe|object|embed)\b|javascript\s*:|\bon\w+\s*=~i', $data['message'])) {
    failMailRequest(400, 'Unsafe email content');
    return;
}
if (!empty($data['token']) && !validRecaptcha((string) $data['token'])) {
    failMailRequest(403, 'reCAPTCHA verification failed');
    return;
}

try {
    $pdo = Connect::getPDO();
    if (!in_array($to, allowedConfiguredAddresses(), true) && !knownDatabaseAddress($pdo, $to)) {
        failMailRequest(403, 'Recipient is not authorized');
        return;
    }
    $client = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!withinMailRate('client:' . $client, 30, 3600) || !withinMailRate('global', 500, 86400)) {
        failMailRequest(429, 'Email rate limit exceeded');
        return;
    }

    $serverBcc = [];
    $bcc = getenv('MAIL_BCC') ?: getenv('REACT_APP_BCC_ALL');
    foreach (explode(',', (string) $bcc) as $address) {
        $address = normalizeMailAddress($address);
        if (filter_var($address, FILTER_VALIDATE_EMAIL) && $address !== $to) {
            $serverBcc[] = ['email' => $address, 'name' => 'IMC archive'];
        }
    }
    ImcMailer::send(
        $data['subject'],
        $data['message'],
        $to,
        $data['to_name'],
        $replyTo,
        $data['reply_name'],
        $serverBcc
    );
    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
} catch (Throwable $exception) {
    error_log('IMC mail delivery failed: ' . $exception->getMessage());
    failMailRequest(500, 'Email delivery failed');
}
