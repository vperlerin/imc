<?php
require '../vendor/autoload.php';
require_once __DIR__ . "/config.php";
use League\OAuth2\Client\Provider\Google;

// Load refresh token from file
$refreshTokenPath = __DIR__ . "/refresh_token.json";
if (!file_exists($refreshTokenPath)) {
    die("❌ Error: Refresh token file not found.");
}

$tokenData = json_decode(file_get_contents($refreshTokenPath), true);
$refreshToken = $tokenData['refresh_token'] ?? null;

if (!$refreshToken) {
    die("❌ Error: No refresh token found in JSON.");
}

// Load Google API credentials
$clientId = getenv("SMTP_CLIENT_ID");
$clientSecret = getenv("SMTP_CLIENT_SECRET");

if (!$clientId || !$clientSecret) {
    die("❌ Error: Missing client ID or secret.");
}

$provider = new Google([
    'clientId'     => $clientId,
    'clientSecret' => $clientSecret,
]);

try {
    // Get a new access token using the refresh token
    $newToken = $provider->getAccessToken('refresh_token', [
        'refresh_token' => $refreshToken
    ]);

    echo "✅ Success! New access token generated:\n";
    echo json_encode([
        "access_token"  => $newToken->getToken(),
        "expires_in"    => $newToken->getExpires(),
        "refresh_token" => $refreshToken
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    die("❌ Error refreshing access token: " . $e->getMessage());
}