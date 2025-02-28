<?php
session_start(); // Needed to store the OAuth2 "state" parameter

use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php';
require_once "config.php";

// 1. Configure your OAuth2 Client
$provider = new Google([
    'clientId'      => getenv("SMTP_CLIENT_ID"),
    'clientSecret'  => getenv("SMTP_CLIENT_SECRET"),
    'redirectUri'   => 'https://imc2025.imo.net/php/auth2.php', 
    'accessType'    => 'offline', 
]);
 
// 2. If we do not have an authorization code, get one
if (!isset($_GET['code'])) {
    // Optional: force re-consent to ensure we get a refresh token every time
    $options = [
        'scope'         => ['https://mail.google.com/'], // or narrower scope if you only need email sending
        'prompt'        => 'consent', // forces the re-consent screen, ensuring refresh token is returned
    ];

    $authUrl = $provider->getAuthorizationUrl($options);
    
    // Store the state in session to verify in the callback
    $_SESSION['oauth2state'] = $provider->getState();

    // Provide the user with a clickable link
    echo '<a href="' . htmlspecialchars($authUrl) . '">Click here to authorize</a>';
    exit;

// 3. Check for state validity
} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
    // State is invalid, possible CSRF attack
    unset($_SESSION['oauth2state']);
    exit('Invalid OAuth2 state');

// 4. If we have the code and state, exchange it for an access token
} else {
    try {
        // This will exchange the authorization code for an access token
        $token = $provider->getAccessToken('authorization_code', [
            'code' => $_GET['code']
        ]);

        // 5. Now we have an access token and (hopefully) a refresh token
        echo '<h2>Success!</h2>';
        echo '<p><strong>Access Token:</strong> '  . $token->getToken() . '</p>';
        echo '<p><strong>Refresh Token:</strong> ' . $token->getRefreshToken() . '</p>';
        echo '<p><strong>Expires (timestamp):</strong> ' . $token->getExpires() . '</p>';

        // You can store these tokens in your database or .env for future use.
        // The refresh token is what's needed for continuous "offline" access.
        // DO NOT just store them in a publicly visible place or commit to Git.

    } catch (Exception $e) {
        exit('Failed to get access token: ' . $e->getMessage());
    }
}
