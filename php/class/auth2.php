<?php
session_start(); // Needed to store the OAuth2 "state" parameter

use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php';
require_once "config.php";

// 1. Configure your OAuth2 Client
$provider = new Google([
    'clientId'      => getenv("SMTP_CLIENT_ID"),
    'clientSecret'  => getenv("SMTP_CLIENT_SECRET"),
    'redirectUri'   => 'https://imc2025.imo.net/php/auth2.php', // Must match "Authorized redirect URI" in Google Cloud Console
    'accessType'    => 'offline', // Ensures we get a refresh token
]);
 
  
// If we don't have a code from Google yet, fetch one
if (!isset($_GET['code'])) {
    // Generate auth URL with special parameters
    $authUrl = $provider->getAuthorizationUrl([
        'scope'       => ['https://mail.google.com/'],
        'prompt'      => 'consent',     // force re-consent
        'access_type' => 'offline',     // get refresh token
    ]);

    // Save state in session (for CSRF protection)
    $_SESSION['oauth2state'] = $provider->getState();
    echo '<a href="' . htmlspecialchars($authUrl) . '">Click here to authorize with Google</a>';
    exit;
    
} elseif (empty($_GET['state']) || $_GET['state'] !== $_SESSION['oauth2state']) {
    // State is invalid
    unset($_SESSION['oauth2state']);
    exit('Invalid state, make sure HTTP sessions are working properly and try again.');
    
} else {
    // We got the authorization code, let's trade it for tokens
    try {
        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        // Print out the tokens
        echo '<h3>Access Token</h3>';
        echo '<pre>' . $token->getToken() . '</pre>';

        echo '<h3>Refresh Token</h3>';
        $refreshToken = $token->getRefreshToken();
        echo '<pre>' . ($refreshToken ?: 'No refresh token returned') . '</pre>';

        echo '<h3>Expires</h3>';
        echo '<pre>' . $token->getExpires() . '</pre>';

    } catch (Exception $e) {
        exit('Failed to get tokens: ' . $e->getMessage());
    }
}
