<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../config/gmail.config.php";


// Debug
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

class Mail
{ 
    public function getMailer()
    {
        date_default_timezone_set('Etc/UTC');
        require_once __DIR__ . '/../../vendor/autoload.php';
  
        $mail = new PHPMailer;
        $mail->SMTPDebug = 4;
        $mail->isSMTP();

        $mail->Host 			= SMTP_HOST;					 
		$mail->Port 			= SMTP_TLS_PORT;			 
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		$mail->SMTPAuth = true;
		$mail->AuthType = 'XOAUTH2';

        $email = SMTP_USER_EMAIL;
		$clientId = SMTP_CLIENT_ID;
		$clientSecret = SMTP_CLIENT_SECRET;
		$refreshToken =  SMTP_REFRESH_TOKEN;

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
		return $mail;
    }


    public static function sendEmail(array $recipients, string $subject, string $message, string $replyTo = null, array $bccRecipients = [])
    {
        $mail = Mail::getMailer();

        try {
            // Validate recipients
            if (empty($recipients)) {
                throw new Exception("No recipients provided.");
            }

            foreach ($recipients as $recipient) {
                if (is_array($recipient) && isset($recipient['email'])) {
                    $email = $recipient['email'];
                    $name = $recipient['name'] ?? '';
                } else {
                    $email = $recipient;
                    $name = '';
                }

                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid recipient email: $email");
                }

                $mail->addAddress($email, $name);
            }

            // Add BCC recipients if provided
            foreach ($bccRecipients as $bccEmail) {
                if (!filter_var($bccEmail, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid BCC email: $bccEmail");
                }
                $mail->addBCC($bccEmail, '');
            }

            // Set Reply-To if provided
            if ($replyTo) {
                if (!filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid Reply-To email: $replyTo");
                }
                $mail->addReplyTo($replyTo);
            }

            // Enable HTML format
            $mail->isHTML(true);

            // Email content
            $mail->Subject = $subject;
            $mail->Body = $message;
            $mail->AltBody = strip_tags($message);

            // Send the email
            $res =  $mail->send();

            var_dump($res);
            //return ["success" => true, "message" => "Message sent successfully"];
        } catch (Exception $e) {
            error_log("Email Error: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to send message. Error: " . $e->getMessage()];
        }
    }
}
