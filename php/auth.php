<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class imc_mailer_api_controller extends Template_Controller {

    private $allowed_origins = [
        'https://imc2025.imo.net',
        'http://localhost'
    ];

    function __construct($cont, $func) {
        parent::__construct($cont, $func);
    }

    // Function to handle JSON email requests
    public function send_email() {
        // Get the request origin
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        // Check if origin is allowed
        if (!in_array($origin, $this->allowed_origins)) {
            http_response_code(403);
            echo json_encode(["error" => "Access denied."]);
            exit;
        }

        // Get raw JSON input
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        // Validate input
        if (
            !isset($data['subject'], $data['message'], $data['to'], $data['to_name'], 
                    $data['from_name'], $data['reply_to'], $data['reply_name'])
        ) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
            exit;
        }

        // Extract optional BCC if provided
        $bcc = isset($data['bcc']) && is_array($data['bcc']) ? $data['bcc'] : [];

        // Call send_imc_email function
        $success = Mail_Pages::send_imc_email(
            $data['subject'],
            $data['message'],
            $data['to'],
            $data['to_name'],
            $data['from_name'],
            $data['reply_to'],
            $data['reply_name'],
            $bcc
        );

        // Return response
        if ($success) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to send email"]);
        }
    }

    // Test function
    public function send_email_test() {
        Mail_Pages::send_imc_email(
            'Subject TEST',
            'This is my message',
            'vperlerin@gmail.com',
            'V. Perlerin',
            'IMC 2025',
            'noreply@imc2025.imo.net',
            'IMC 2025',
            [
                ['email' => 'lenep@lenep.com', 'name' => 'LENEP'], 
            ]
        );
    }
}
