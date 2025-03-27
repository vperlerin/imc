<?php
ob_start(); // Prevent accidental early output

// CORS setup...
// (unchanged)

require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require __DIR__ . "/../vendor/autoload.php";

// Setup
$currentYear = date("Y");
$currentDate = date("d-m-Y");

use TCPDF;
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

// Sample content
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
$pdf->Output('payment_receipt.pdf', 'I');
ob_end_flush(); // Send the output

exit;
