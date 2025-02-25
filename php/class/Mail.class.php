<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config.php';

class Mail
{
    private PHPMailer $mailer;
    private string $emailSender;
    private string $emailSenderName;
    private string $refreshTokenPath = __DIR__ . '/../refresh_token.json'; // Path to refresh token file

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->configureSMTP();
    }

    private function configureSMTP()
    {
        try {
            // Load SMTP credentials from environment variables
            $clientId = getenv("SMTP_CLIENT_ID");
            $clientSecret = getenv("SMTP_CLIENT_SECRET");
            $email = getenv("SMTP_USER_EMAIL");
            $this->emailSender = $email;
            $this->emailSenderName = getenv("SMTP_USER_NAME") ?: "No Name";

            // Validate required credentials
            if (!$clientId || !$clientSecret || !$email) {
                throw new Exception("SMTP credentials are missing in environment variables.");
            }

            // Load refresh token from file
            if (!file_exists($this->refreshTokenPath) || !is_readable($this->refreshTokenPath)) {
                throw new Exception("Refresh token file not found or unreadable: {$this->refreshTokenPath}");
            }

            $tokenData = json_decode(file_get_contents($this->refreshTokenPath), true);
            $refreshToken = $tokenData['refresh_token'] ?? null;

            if (!$refreshToken) {
                throw new Exception("Missing refresh token in `refresh_token.json`.");
            }

            // Set up OAuth2 Provider
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
                'userName'     => $email,
            ]));

            // SMTP Configuration
            $this->mailer->isSMTP();
            $this->mailer->Host = getenv("SMTP_HOST");
            $this->mailer->SMTPAuth = true;
            $this->mailer->AuthType = 'XOAUTH2';
            $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $this->mailer->Port = (int) getenv("SMTP_TLS_PORT");

            // Validate and set sender email
            if (!filter_var($this->emailSender, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Invalid sender email: {$this->emailSender}");
            }

            $this->mailer->setFrom($this->emailSender, $this->emailSenderName);
        } catch (Exception $e) {
            error_log("❌ Mailer Configuration Error: " . $e->getMessage());
        }
    }
 
    /**
     * Send an email
     * @param array $recipients Array of recipients (['email' => ..., 'name' => ...] or string)
     * @param string $subject Email subject
     * @param string $message HTML email body
     * @param string|null $replyTo Optional reply-to email
     * @param array $bccRecipients Optional array of BCC recipients
     * @return array Result status
     */
    public function sendEmail(array $recipients, string $subject, string $message, ?string $replyTo = null, array $bccRecipients = []): array
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
                if (filter_var($bccEmail, FILTER_VALIDATE_EMAIL)) {
                    $this->mailer->addBCC($bccEmail);
                } else {
                    throw new Exception("Invalid BCC email: $bccEmail");
                }
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
            return ["success" => true, "message" => "✅ Message sent successfully"];
        } catch (Exception $e) {
            error_log("❌ Mailer Error: " . $e->getMessage());
            return ["success" => false, "message" => "❌ Failed to send message. " . $this->mailer->ErrorInfo];
        }
    }
}
