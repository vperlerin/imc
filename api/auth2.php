<?php

use League\OAuth2\Client\Provider\Google;

require '../vendor/autoload.php';
require_once "config.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$provider = new Google([
  'clientId'     => getenv("SMTP_CLIENT_ID")
  'clientSecret' => getenv("SMTP_CLIENT_SECRET")
  'redirectUri'  => 'https://imc2025.imo.net',
  'accessType' => 'offline',
]);
if (!empty($_GET['error'])) {
  // Got an error; probably user denied access
  exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));
} elseif (empty($_GET['code'])) {
  // If we don't have an authorization code, then get one
  $authUrl = $provider->getAuthorizationUrl([
    'scope' => [
      'https://mail.google.com/'
    ]
  ]);

  echo "ERROR";
  //header('Location: ' . $authUrl);
  exit;
} else {
  // Try to get an access token (using the authorization code grant)
  $token = $provider->getAccessToken('authorization_code', [
    'code' => $_GET['code']
  ]);

  echo ($token);

  // Use this to get a new access token if the old one expires
  $refreshToken = $token->getRefreshToken();

  echo ($refreshToken);
}
