<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

require '../vendor/autoload.php';
require_once "config.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

// Check if an OAuth2 code is already set or if the provider is selected
if (!isset($_GET['code']) && !isset($_GET['provider'])) {
    ?>
    <html>
    <body>
        <h3>Select Provider:</h3>
        <a href='?provider=Google'>Login with Google</a>
    </body>
    </html>
    <?php
    exit;
}

// Determine OAuth2 provider
$providerName = '';

if (isset($_GET['provider'])) {
    $providerName = $_GET['provider'];
    $_SESSION['provider'] = $providerName;
} elseif (isset($_SESSION['provider'])) {
    $providerName = $_SESSION['provider'];
}

$allowedProviders = ['Google', 'Microsoft', 'Yahoo'];
if (!in_array($providerName, $allowedProviders)) {
    exit('Only Google, Microsoft, and Yahoo OAuth2 providers are supported.');
}

// Load OAuth2 credentials
$clientId = getenv("SMTP_CLIENT_ID");
$clientSecret = getenv("SMTP_CLIENT_SECRET");
$redirectUri = 'https://imc2025.imo.net/php/auth3.php';

// Validate OAuth2 credentials
if (!$clientId || !$clientSecret) {
    exit('Error: Missing OAuth2 credentials. Check your environment variables.');
}

// OAuth2 Provider Configuration
$params = [
    'clientId' => $clientId,
    'clientSecret' => $clientSecret,
    'redirectUri' => $redirectUri,
    'accessType' => 'offline' // Ensures refresh tokens are obtained
];

$options = [];
$provider = null;

// Define the correct provider
switch ($providerName) {
    case 'Google':
        $provider = new Google($params);
        $options = [
            'scope' => ['https://mail.google.com/']
        ];
        break;
}

// If provider is missing
if (!$provider) {
    exit('Error: OAuth2 provider not found.');
}

// Step 1: Redirect User to OAuth2 Login Page
if (!isset($_GET['code'])) {
    $authUrl = $provider->getAuthorizationUrl($options);

    // Store state to prevent CSRF attacks
    $_SESSION['oauth2state'] = $provider->getState();

    header('Location: ' . $authUrl);
    exit;
}

// Step 2: Handle OAuth2 Callback & Validate CSRF Token
if (!isset($_GET['state']) || $_GET['state'] !== $_SESSION['oauth2state']) {
    unset($_SESSION['oauth2state']);
    unset($_SESSION['provider']);
    exit('Error: Invalid OAuth2 state. Possible CSRF attack detected.');
}

// Step 3: Exchange Authorization Code for Access Token
try {
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    // Display Refresh Token for further use
    echo '<h3>OAuth2 Authentication Successful</h3>';
    echo '<p>Save this refresh token securely:</p>';
    echo '<pre>' . $token->getRefreshToken() . '</pre>';

    // Cleanup session
    unset($_SESSION['provider']);
} catch (Exception $e) {
    exit('Error retrieving access token: ' . $e->getMessage());
}
