<?php

use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php';
require_once "config.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$provider = new Google([
  'clientId'     => getenv("SMTP_CLIENT_ID"),
  'clientSecret' => getenv("SMTP_CLIENT_SECRET"),
  'redirectUri'  => getenv("SMTP_REDIRECT_URL"),
  'accessType'   => 'offline',
]);

// Check if a refresh token exists
$refreshTokenPath = 'refresh_token.json';
if (file_exists($refreshTokenPath)) {
  $storedToken = json_decode(file_get_contents($refreshTokenPath), true);
  if (!empty($storedToken['refresh_token'])) {
    try {
      // Get a new access token using the refresh token
      $newToken = $provider->getAccessToken('refresh_token', [
        'refresh_token' => $storedToken['refresh_token']
      ]);

      echo json_encode([
        "access_token"  => $newToken->getToken(),
        "expires_in"    => $newToken->getExpires(),
        "refresh_token" => $storedToken['refresh_token']  // Keep using the same refresh token
      ]);
      exit;
    } catch (Exception $e) {
      echo "Error refreshing access token: " . $e->getMessage();
      exit;
    }
  }
}

// If no refresh token is found, start authorization process
if (!empty($_GET['error'])) {
  exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));
} elseif (empty($_GET['code'])) {
  // Request authorization if we don't have an access token
  $authUrl = $provider->getAuthorizationUrl([
    'scope' => ['https://mail.google.com/']
  ]);

  echo "Authorization URL: <a href='$authUrl'>$authUrl</a>";
  exit;
} else {
  try {
    // Get an access token for the first time
    $token = $provider->getAccessToken('authorization_code', [
      'code' => $_GET['code']
    ]);

    // Save the refresh token for future use
    if (!empty($token->getRefreshToken())) {
      file_put_contents($refreshTokenPath, json_encode([
        "refresh_token" => $token->getRefreshToken()
      ]));
    }

    echo json_encode([
      "access_token"  => $token->getToken(),
      "expires_in"    => $token->getExpires(),
      "refresh_token" => $token->getRefreshToken()
    ]);
  } catch (Exception $e) {
    echo "Error obtaining access token: " . $e->getMessage();
  }
}
