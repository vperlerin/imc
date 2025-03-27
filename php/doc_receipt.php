<?php
ob_clean(); // Clear previous output
ob_start(); // Start output buffering

// CORS setup
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

// Required files
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require __DIR__ . "/../vendor/autoload.php";

try {
  $pdo = Connect::getPDO();
} catch (Exception $e) {
  die($e->getMessage()); 
}

// TCPDF logic
use TCPDF;

$currentYear = date("Y");

$pdf = new TCPDF();
$pdf->SetCreator("IMC $currentYear Registration");
$pdf->SetAuthor('International Meteor Organization');
$pdf->SetTitle('Payment Receipt');
$pdf->SetSubject('Payment Confirmation');

$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->SetMargins(20, 20, 20);
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 12);

$participantName = "Joost Hartman";
$amountPaid = "€265.00";
$paymentMethod = "PayPal";
$transactionDate = date("F j, Y");

$html = <<<EOD
<h1 style="text-align: center;">Payment Receipt</h1>
<p><strong>Participant:</strong> {$participantName}</p>
<p><strong>Amount Paid:</strong> {$amountPaid}</p>
<p><strong>Payment Method:</strong> {$paymentMethod}</p>
<p><strong>Date:</strong> {$transactionDate}</p>
<br>
<p>We confirm that we have received the above payment for your participation in the International Meteor Conference 2025.</p>
<p>Thank you for your registration!</p>
<br><br>
<p><em>International Meteor Organization</em></p>
EOD;

$pdf->writeHTML($html, true, false, true, false, '');

// Output PDF to browser
$pdf->Output('payment_receipt.pdf', 'I');

ob_end_flush();
exit;
