<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\SMTP;
use League\OAuth2\Client\Provider\Google;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . "/../config.php";

class Mail
{
    private $mailer;
    private $emailSender;
    private $emailSenderName;

    public function __construct()
    {
        $this->mailer = new PHPMailer;
        $this->configureSMTP();
    }

    private function configureSMTP()
    {
        try {
            date_default_timezone_set('Etc/UTC');  

            // Load SMTP credentials
            $clientId = getenv("SMTP_CLIENT_ID");
            $clientSecret = getenv("SMTP_CLIENT_SECRET");
            $refreshToken = getenv("SMTP_REFRESH_TOKEN");

            $this->emailSender = getenv("SMTP_USER_EMAIL");
            $this->emailSenderName = getenv("SMTP_USER_NAME");

            // Validate credentials
            if (!$clientId || !$clientSecret || !$refreshToken || !$this->emailSender) {
                throw new Exception("SMTP OAuth credentials are missing or invalid.");
            }

            // Correct SMTP settings order
            $this->mailer->isSMTP();
            $this->mailer->Host = getenv("SMTP_HOST");
            $this->mailer->Port = 465;
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $this->mailer->SMTPAuth = true;
            $this->mailer->AuthType = 'XOAUTH2';
            $this->mailer->CharSet = PHPMailer::CHARSET_UTF8;

            // OAuth2 Provider Setup
            $provider = new Google([
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
            ]);

            // Configure OAuth2 authentication
            $this->mailer->setOAuth(new OAuth([
                'provider'     => $provider,
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken,
                'userName'     => $this->emailSender,
            ]));

            // Debug sender email
            if (!filter_var($this->emailSender, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Invalid sender email: {$this->emailSender}");
            }

            // Hardcode a working sender email for debugging
            $this->mailer->setFrom("webserver@imo.net", "International Meteor Organization"); 

        } catch (Exception $e) {
            error_log("Mailer Configuration Error: " . $e->getMessage());
            throw $e; // Prevent silent failure
        }
    }

    public function sendEmail(array $recipients, string $subject, string $message, string $replyTo = null, array $bccRecipients = [])
    {
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

                $this->mailer->addAddress($email, $name);
            }

            // Add BCC recipients if provided
            foreach ($bccRecipients as $bccEmail) {
                if (!filter_var($bccEmail, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid BCC email: $bccEmail");
                }
                $this->mailer->addBCC($bccEmail, '');
            }

            // Set Reply-To if provided
            if ($replyTo) {
                if (!filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid Reply-To email: $replyTo");
                }
                $this->mailer->addReplyTo($replyTo);
            }

            // Enable HTML format
            $this->mailer->isHTML(true);

            // Email content
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $message;
            $this->mailer->AltBody = strip_tags($message);

            // Send the email
            $this->mailer->send();
            return ["success" => true, "message" => "Message sent successfully"];
        } catch (Exception $e) {
            error_log("Email Error: " . $e->getMessage());
            return ["success" => false, "message" => "Failed to send message. Error: " . $e->getMessage()];
        }
    }
}
