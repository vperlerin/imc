<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

 require '../vendor/autoload.php';

 // Test Mail.php
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\SMTP;
 use PHPMailer\PHPMailer\OAuth;
 use League\OAuth2\Client\Provider\Google;

 $mail = new PHPMailer;
 $mail->SMTPDebug = 4;
 $mail->isSMTP();

 $mail->Host 			= 'smtp.gmail.com';					 
 $mail->Port 			= 465;				 
 $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
 $mail->SMTPAuth = true;
 $mail->AuthType = 'XOAUTH2';

 $email = 'president@imo.net';
 $clientId = '1042243922274-pmhvvd7bamoin1qldgsa4kr78jf28n0m.apps.googleusercontent.com';
 $clientSecret = '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';
 $refreshToken =  '1//05SsZ8NEdpL3gCgYIARAAGAUSNwF-L9IrY1QntjCYd3xUS7HNyWmxoCqxeizXPSHrDyF0MEFUCKnLG87IMDjsH8uFsr9Zr2OUCN0';

 $provider = new Google(
   [
     'clientId' => $clientId,
     'clientSecret' => $clientSecret,
   ]
 );
 $mail->setOAuth(
   new OAuth(
     [
       'provider' => $provider,
       'clientId' => $clientId,
       'clientSecret' => $clientSecret,
       'refreshToken' => $refreshToken,
       'userName' => $email,
     ]
   )
 );

 $mail->CharSet = PHPMailer::CHARSET_UTF8;
 

 $mail->setFrom('webserver@imo.net', 'International Meteor Organization');
 $mail->addAddress('vperlerin@gmail.com', 'Vincent Perlerin'); / 
 $mail->addReplyTo('noreply@imo.net','DO NOT REPLY'); 

 $mail->isHTML(true);  // HTML
 $mail->Subject  = "TEST SUBJECT";
 $mail->Body 	= "TEST";
 $mail->AltBody 	= "TEST";

$mail->send();

?>