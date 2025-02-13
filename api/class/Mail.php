<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require_once __DIR__ . '/../vendor/autoload.php';  
require_once "../config.php";

class Mail {
    private $mailer;
    private $emailSender;
    private $emailSenderName;

    public function __construct() {
        $this->mailer = new PHPMailer(true);
        $this->configureSMTP();
    }

    private function configureSMTP() {
        try {
            // OAuth2 Configuration
            $clientId = getenv("SMTP_CLIENT_ID");
            $clientSecret = getenv("SMTP_CLIENT_SECRET");
            $refreshToken = getenv("SMTP_REFRESH_TOKEN");
            $this->emailSender = getenv("SMTP_USER_EMAIL");
            $this->emailSenderName = getenv("SMTP_USER_NAME");

            $provider = new Google([
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
            ]);

            $this->mailer->setOAuth(new OAuth([
                'provider'     => $provider,
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken,
                'userName'     => $this->emailSender,
            ]));

            // SMTP Configuration
            $this->mailer->isSMTP();
            $this->mailer->Host = 'smtp.gmail.com';
            $this->mailer->SMTPAuth = true;
            $this->mailer->AuthType = 'XOAUTH2';
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mailer->Port = 587;
            $this->mailer->setFrom($this->emailSender, $this->emailSenderName);
        } catch (Exception $e) {
            error_log("Mailer Configuration Error: " . $e->getMessage());
        }
    }

    public function sendEmail(array $recipients, string $subject, string $message, string $replyTo = null) {
        try {
            // Set recipients
            foreach ($recipients as $recipient) {
                $this->mailer->addAddress($recipient);
            }

            // Set Reply-To if provided
            if ($replyTo) {
                $this->mailer->addReplyTo($replyTo);
            }

            // Email content
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $message;

            // Send the email
            $this->mailer->send();
            return ["success" => true, "message" => "Message sent successfully"];
        } catch (Exception $e) {
            error_log("Mailer Error: " . $this->mailer->ErrorInfo);
            return ["success" => false, "message" => "Failed to send message. Check logs."];
        }
    }
}
