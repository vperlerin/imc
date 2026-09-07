<?php

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;

final class ImcMailer
{
    private static function headerText($value)
    {
        return trim(str_replace(["\r", "\n"], '', (string) $value));
    }

    public static function send(
        $subject,
        $htmlMessage,
        $to,
        $toName,
        $replyTo,
        $replyName,
        array $bcc = []
    ) {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST') ?: 'smtp-relay.gmail.com';
        $mail->Port = (int) (getenv('SMTP_PORT') ?: 587);
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPAuth = false;
        $mail->CharSet = PHPMailer::CHARSET_UTF8;

        $fromEmail = getenv('MAIL_FROM_ADDRESS') ?: 'notifications@imo.net';
        $fromName = getenv('MAIL_FROM_NAME') ?: 'IMC 2026';
        $mail->setFrom($fromEmail, self::headerText($fromName));
        $mail->addAddress($to, self::headerText($toName));

        if ($replyTo !== '') {
            $mail->addReplyTo($replyTo, self::headerText($replyName));
        }

        foreach ($bcc as $recipient) {
            if (!empty($recipient['email'])) {
                $mail->addBCC(
                    $recipient['email'],
                    self::headerText($recipient['name'] ?? '')
                );
            }
        }

        $mail->isHTML(true);
        $mail->Subject = self::headerText($subject);
        $mail->Body = $htmlMessage;
        $mail->AltBody = trim(html_entity_decode(
            strip_tags(preg_replace('~<br\s*/?>~i', "\n", $htmlMessage)),
            ENT_QUOTES | ENT_HTML5,
            'UTF-8'
        ));

        return $mail->send();
    }
}
