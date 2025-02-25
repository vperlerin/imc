<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . "/../config.php";

class Mail
{
    private $mailer;
    private $emailSender;
    private $emailSenderName;
    private $refreshTokenPath = __DIR__ . "/../refresh_token.json"; // Path to refresh token file

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->configureSMTP();
    }

    private function configureSMTP()
    {
        try {
            // Load SMTP credentials
            $clientId = getenv("SMTP_CLIENT_ID");
            $clientSecret = getenv("SMTP_CLIENT_SECRET");
            $email = getenv("SMTP_USER_EMAIL");
            $this->emailSender = getenv("SMTP_USER_EMAIL");
            $this->emailSenderName = getenv("SMTP_USER_NAME");

            // Load refresh token & access token from file
            if (!file_exists($this->refreshTokenPath) || !is_readable($this->refreshTokenPath)) {
                throw new Exception("Refresh token file not found or unreadable: {$this->refreshTokenPath}");
            }

            $tokenData = json_decode(file_get_contents($this->refreshTokenPath), true);
            $refreshToken = $tokenData['refresh_token'] ?? null;
            $accessToken = $tokenData['access_token'] ?? null;
            $expiresAt = $tokenData['expires_in'] ?? 0; // Expiry time in UNIX timestamp

            if (!$refreshToken) {
                throw new Exception("Missing refresh token in `refresh_token.json`.");
            }

            // Set up OAuth2 Provider
            $provider = new Google([
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
            ]);
 
            // Configure OAuth2 authentication with the valid access token
            $this->mailer->setOAuth(new OAuth([
                'provider'     => $provider,
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken, 
                'userName'     => $email,
            ]));

            // SMTP Configuration
            $this->mailer->isSMTP();
            $this->mailer->Host = 'smtp.gmail.com';
            $this->mailer->SMTPAuth = true;
            $this->mailer->AuthType = 'XOAUTH2';
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $this->mailer->Port = 587;

            // Validate and set sender email
            if (!filter_var($this->emailSender, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Invalid sender email: {$email}");
            }
            $this->mailer->setFrom($email,  getenv("SMTP_USER_NAME") ?: "No Name");

        } catch (Exception $e) {
            error_log("Mailer Configuration Error: " . $e->getMessage());
        }
    }

    /**
     * Store updated access & refresh tokens in `refresh_token.json`
     */
    private function storeTokens($refreshToken, $accessToken, $expiresAt)
    {
        $tokenData = json_encode([
            "refresh_token" => $refreshToken,
            "access_token"  => $accessToken,
            "expires_in"    => $expiresAt
        ], JSON_PRETTY_PRINT);

    

        if (file_put_contents($this->refreshTokenPath, $tokenData) === false) {
            error_log("❌ Error: Unable to write to `refresh_token.json`. Check file permissions.");
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
            $this->mailer->AltBody = strip_tags($message); // Fallback for non-HTML email clients

            // Send the email
            $this->mailer->send();
            return ["success" => true, "message" => "Message sent successfully"];
        } catch (Exception $e) { 
            return ["success" => false, "message" => "Failed to send message. Check logs." . $this->mailer->ErrorInfo];
        }
    }
}
