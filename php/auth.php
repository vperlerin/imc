<?php
namespace PHPMailer\PHPMailer;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
 
use League\OAuth2\Client\Provider\Google;

// Start session securely
session_start();
session_regenerate_id(true);

// Ensure Composer dependencies are installed
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    exit('Composer dependencies not found. Run `composer install`.');
}
require '../vendor/autoload.php';

// CSRF Protection Token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        exit('Invalid CSRF token.');
    }
    
    $_SESSION['provider'] = $_POST['provider'] ?? 'Google';
    $_SESSION['clientId'] = $_POST['clientId'] ?? '';
    $_SESSION['clientSecret'] = $_POST['clientSecret'] ?? '';
    
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (!isset($_SESSION['clientId']) || !isset($_SESSION['clientSecret'])) {
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Enter OAuth Credentials</title>
    </head>
    <body>
        <form method="post">
            <h1>Select Provider</h1>
            <input type="radio" name="provider" value="Google" id="providerGoogle" checked>
            <label for="providerGoogle">Google</label><br>
            
            <h1>Enter ID and Secret</h1>
            <p>These details are obtained by setting up an app in your provider's developer console.</p>
            <p>ClientId: <input type="text" name="clientId" required></p>
            <p>ClientSecret: <input type="text" name="clientSecret" required></p>
            <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
            <input type="submit" value="Continue">
        </form>
    </body>
    </html>
    <?php
    exit;
}

$providerName = $_SESSION['provider'] ?? 'Google';
$clientId = $_SESSION['clientId'];
$clientSecret = $_SESSION['clientSecret'];
$redirectUri = (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];

$params = [
    'clientId' => $clientId,
    'clientSecret' => $clientSecret,
    'redirectUri' => $redirectUri,
    'accessType' => 'offline'
];

$options = [];
$provider = null;

switch ($providerName) {
    case 'Google':
        $provider = new Google($params);
        $options = [
          'scope' => ['https://mail.google.com/'],
          'accessType' => 'offline', // Ensures refresh token is issued
          'prompt' => 'consent' // Forces consent screen to appear
      ];
        break;
    default:
        exit('Invalid provider selected.');
}

if (!isset($_GET['code'])) {
    // Generate authorization URL
    $authUrl = $provider->getAuthorizationUrl($options);
    $_SESSION['oauth2state'] = $provider->getState();
    header('Location: ' . $authUrl);
    exit;
} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
    unset($_SESSION['oauth2state']);
    exit('Invalid state parameter.');
} else {
    try {
        $token = $provider->getAccessToken('authorization_code', ['code' => $_GET['code']]);
        echo 'Refresh Token: ', htmlspecialchars($token->getRefreshToken(), ENT_QUOTES, 'UTF-8');
    } catch (Exception $e) {
        exit('Error obtaining access token: ' . $e->getMessage());
    }
}
?>