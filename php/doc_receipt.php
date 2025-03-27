<?php

// Enable CORS for local development & production
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

// Include dependencies
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require __DIR__ . "/../vendor/autoload.php";

$currentYear = date("Y");
$currentDate = date("d-m-Y");

use TCPDF;
$pdf = new TCPDF();

// Set document information
$pdf->SetCreator('IMC $currentYear Registration');
$pdf->SetAuthor('International Meteor Organization');
$pdf->SetTitle('Payment Receipt');
$pdf->SetSubject('Payment Confirmation');

$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// Set margins
$pdf->SetMargins(20, 20, 20);

// Add a page
$pdf->AddPage();

// Set font
$pdf->SetFont('helvetica', '', 12);

// Sample receipt content (you can use variables here)
$participantName = "Joost Hartman";
$amountPaid = "€265.00";
$paymentMethod = "PayPal";
$transactionDate = date("F j, Y");

// Compose HTML content
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

// Output HTML content
$pdf->writeHTML($html, true, false, true, false, '');

// Output PDF to browser
$pdf->Output('payment_receipt.pdf', 'I');

exit;