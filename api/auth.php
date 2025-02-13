<?php

declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php'; 
require_once "config.php";

session_start();

// Display provider selection if no OAuth parameters are set
if (!isset($_GET['code']) && !isset($_GET['provider'])) {
    ?>
    <html>
    <body>
        <h3>Select Provider:</h3>
        <a href="?provider=Google">Google</a>
    </body>
    </html>
    <?php
    die();
}

// Retrieve OAuth provider from GET or SESSION
$providerName = $_GET['provider'] ?? $_SESSION['provider'] ?? '';

if (!in_array($providerName, ['Google', 'Microsoft', 'Yahoo'], true)) {
    die('Only Google, Microsoft, and Yahoo OAuth2 providers are supported.');
}

// OAuth App Credentials (Replace with actual credentials)
$clientId = getenv("GOOGLE_CLIENT_ID") ;
$clientSecret = getenv("GOOGLE_CLIENT_SECRET");

// Redirect URI (Set this properly in your OAuth app settings)
$redirectUri = 'https://imc2025.imo.net/api/auth.php';

// OAuth2 Provider Configuration
$params = [
    'clientId'     => $clientId,
    'clientSecret' => $clientSecret,
    'redirectUri'  => $redirectUri,
    'accessType'   => 'offline'
];

$options = [];
$provider = null;

switch ($providerName) {
    case 'Google':
        $provider = new Google($params);
        $options = [
            'scope' => ['https://mail.google.com/']
        ];
        break;
    default:
        die('Provider not supported.');
}

// Handle OAuth Authorization Flow
if (!isset($_GET['code'])) {
    // Step 1: Get Authorization URL and Redirect
    $_SESSION['provider'] = $providerName;
    $_SESSION['oauth2state'] = $provider->getState();
    
    header('Location: ' . $provider->getAuthorizationUrl($options));
    exit;
}

// Step 2: Validate CSRF State
if (empty($_GET['state']) || ($_GET['state'] !== ($_SESSION['oauth2state'] ?? ''))) {
    session_unset();
    die('Invalid state. Possible CSRF attack detected.');
}

// Step 3: Exchange Authorization Code for Access Token
try {
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    echo 'Refresh Token: ' . htmlspecialchars($token->getRefreshToken(), ENT_QUOTES, 'UTF-8');
} catch (Exception $e) {
    die('Error retrieving access token: ' . $e->getMessage());
}

// Cleanup session
unset($_SESSION['provider'], $_SESSION['oauth2state']);
