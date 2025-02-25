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
            $this->emailSender = getenv("SMTP_USER_EMAIL");
            $this->emailSenderName = getenv("SMTP_USER_NAME");
    
            // Load refresh token from file
            if (!file_exists($this->refreshTokenPath)) {
                throw new Exception("Refresh token file not found: {$this->refreshTokenPath}");
            }
    
            $tokenData = json_decode(file_get_contents($this->refreshTokenPath), true);
            $refreshToken = $tokenData['refresh_token'] ?? null;
    
            // Validate required variables
            if (!$clientId || !$clientSecret || !$refreshToken || !$this->emailSender) {
                throw new Exception("Missing SMTP environment variables or refresh token. Check .env and refresh_token.json.");
            }
    
            // Set up OAuth2 Provider
            $provider = new Google([
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
            ]);
    
            // Request a new access token using the refresh token
            $newToken = $provider->getAccessToken('refresh_token', [
                'refresh_token' => $refreshToken
            ]);
    
            $accessToken = $newToken->getToken(); // New access token
    
            // Configure OAuth2 authentication with the new access token
            $this->mailer->setOAuth(new OAuth([
                'provider'     => $provider,
                'clientId'     => $clientId,
                'clientSecret' => $clientSecret,
                'refreshToken' => $refreshToken,
                'accessToken'  => $accessToken,  
                'userName'     => $this->emailSender,
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
                throw new Exception("Invalid sender email: {$this->emailSender}");
            }
            $this->mailer->setFrom($this->emailSender, $this->emailSenderName ?: "No Name");
    
        } catch (Exception $e) {
            error_log("Mailer Configuration Error: " . $e->getMessage());
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
            return ["success" => false, "message" => "Failed to send message: ". $this->mailer->ErrorInfo];
        }
    } 
}
