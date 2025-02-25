<?php

use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php';
require_once "config.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$refreshTokenPath = 'refresh_token.json';

// Function to store tokens in the JSON file
function storeTokens($refreshToken, $accessToken, $expiresIn)
{
    global $refreshTokenPath;

    $data = [
        "refresh_token" => $refreshToken,
        "access_token"  => $accessToken,
        "expires_in"    => time() + $expiresIn // Store expiry as a timestamp
    ];

    $jsonData = json_encode($data, JSON_PRETTY_PRINT);

    // Ensure the file is writable
    if (!is_writable($refreshTokenPath)) {
        chmod($refreshTokenPath, 0666); // Set write permissions
    }

    if (file_put_contents($refreshTokenPath, $jsonData) === false) {
        die("❌ Error: Unable to write to `refresh_token.json`. Check file permissions.");
    }
}

// Create Google OAuth Provider
$provider = new Google([
    'clientId'     => getenv("SMTP_CLIENT_ID"),
    'clientSecret' => getenv("SMTP_CLIENT_SECRET"),
    'redirectUri'  => getenv("SMTP_REDIRECT_URL"),
    'approvalPrompt' => 'force',  
    'accessType'   => 'offline',  
]);

// 1️⃣ **Check if a refresh token exists**
/*
if (file_exists($refreshTokenPath)) {
    $storedToken = json_decode(file_get_contents($refreshTokenPath), true);
    if (!empty($storedToken['refresh_token'])) {
        try {
            // Request a new access token using the refresh token
            $newToken = $provider->getAccessToken('refresh_token', [
                'refresh_token' => $storedToken['refresh_token']
            ]);

            // Store updated tokens
            storeTokens(
                $storedToken['refresh_token'], 
                $newToken->getToken(), 
                $newToken->getExpires()
            );

            echo "<pre>" . json_encode([
                "access_token"  => $newToken->getToken(),
                "expires_in"    => $newToken->getExpires(),
                "refresh_token" => $storedToken['refresh_token']
            ], JSON_PRETTY_PRINT) . "</pre>";
            exit;

        } catch (Exception $e) {
            die("❌ Error refreshing access token: " . $e->getMessage());
        }
    }
}
    */

// 2️⃣ **Handle First-Time Authorization**
if (!empty($_GET['error'])) {
    exit('❌ Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));
} elseif (empty($_GET['code'])) {
    // We don't have a refresh token yet, so start the OAuth flow
    $authUrl = $provider->getAuthorizationUrl([
        // Minimal scope for just sending emails:
        'scope'  => ['https://mail.google.com/'],
        // If you need full mailbox access, use: 'scope' => ['https://mail.google.com/'],
        'prompt' => 'consent' // Ask user to consent (ensures refresh token is issued)
    ]);

    echo "🔗 Authorization URL: <a href='$authUrl'>$authUrl</a>";
    exit;
}

// 3️⃣ **Process Authorization Code and Store Tokens**
try {
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    $refreshToken = $token->getRefreshToken() ?: null; // Google might not always return a new one

    // Store tokens
    if ($refreshToken) {
        storeTokens($refreshToken, $token->getToken(), $token->getExpires());
    } else {
        echo "⚠️ Warning: No new refresh token received. Using the existing one.";
    }

    echo "<pre>" . json_encode([
        "access_token"  => $token->getToken(),
        "expires_in"    => $token->getExpires(),
        "refresh_token" => $refreshToken
    ], JSON_PRETTY_PRINT) . "</pre>";

} catch (Exception $e) {
    die("❌ Error obtaining access token: " . $e->getMessage());
}
