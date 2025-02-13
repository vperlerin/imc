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
  'redirectUri'  => 'https://imc2025.imo.net',
  'accessType'   => 'offline',
]);

if (!empty($_GET['error'])) {
  exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));
} elseif (empty($_GET['code'])) {
  // If we don't have an authorization code, request one
  $authUrl = $provider->getAuthorizationUrl([
    'scope' => ['https://mail.google.com/']
  ]);

  echo "Authorization URL: <a href='$authUrl'>$authUrl</a>";
  exit;
} else {
  try {
    // Get an access token
    $token = $provider->getAccessToken('authorization_code', [
      'code' => $_GET['code']
    ]);

    echo json_encode([
      "access_token" => $token->getToken(),
      "expires_in"   => $token->getExpires(),
      "refresh_token"=> $token->getRefreshToken()
    ]);
  } catch (Exception $e) {
    echo "Error obtaining access token: " . $e->getMessage();
  }
}
