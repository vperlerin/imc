<?php
// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;

// Import Google OAuth 2.0 provider
use League\OAuth2\Client\Provider\Google;

// Start the session
session_start();

// Load Composer's autoloader
require '../vendor/autoload.php'; 
require_once "config.php";


// Gmail API credentials
$clientId = getenv("SMTP_CLIENT_ID");
$clientSecret = getenv("SMTP_CLIENT_SECRET");
$redirectUri = 'https://imc2025.imo.net/php/auth3.php';

// Create a new Google OAuth 2.0 provider
$provider = new Google([
    'clientId'     => $clientId,
    'clientSecret' => $clientSecret,
    'redirectUri'  => $redirectUri,
    'accessType' => 'offline'
]);

// If we don't have an authorization code, then get one
if (!isset($_GET['code'])) {
    // Get authorization URL
    $authUrl = $provider->getAuthorizationUrl([
        'scope' => [ 'https://mail.google.com/' ]
    ]);
    // Get the generated state and store it in session
    $_SESSION['oauth2state'] = $provider->getState();
    // Redirect the user to Google's OAuth consent page
    header('Location: ' . $authUrl);
    exit;
}

// Check if the authorization code exists
if (isset($_GET['code']) && !empty($_GET['code'])) {
    try {
        // Verify the state to protect against CSRF attacks
        if (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
            unset($_SESSION['oauth2state']);
            exit('Invalid state!');
        }

        // Get the access token with the refresh token
        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code'],
        ]);

        // Retrieve the refresh token
        $refreshToken = $token->getRefreshToken();

    } catch (Exception $e) {
        exit('Failed to get access token: ' . $e->getMessage());
    }

    // Add PHPMailer code here
    echo "TEST";
}
?>