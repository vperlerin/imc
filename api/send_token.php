<?php

require '../vendor/autoload.php';
require_once "config.php";


error_reporting(E_ALL);
ini_set('display_errors', 'On');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use League\OAuth2\Client\Provider\Google;

     $mail = new PHPMailer();
     $mail->isSMTP();
     $mail->Host = 'smtp.gmail.com';
     $mail->SMTPAuth = true;
     $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
     $mail->Port = 465;
     $mail->AuthType = 'XOAUTH2';

     $provider = new Google(
         [
             'clientId' => getenv("SMTP_CLIENT_ID"),
             'clientSecret' => getenv("SMTP_CLIENT_SECRET"),
         ]
     );

     $mail->setOAuth(
         new OAuth(
             [
                 'provider' => $provider,
                 'clientId' => getenv("SMTP_CLIENT_ID"),
                 'clientSecret' => getenv("SMTP_CLIENT_SECRET"),
                 'refreshToken' => getenv("SMTP_REFRESH_TOKEN"),
                 'userName' => getenv("SMTP_USER"),
             ]
         )
     );