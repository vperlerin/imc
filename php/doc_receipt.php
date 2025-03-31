<?php

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

ob_clean();
ob_start();

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

// Receipt data (in a real app, you'd retrieve this from DB)
$participantName = "Joost Hartman";
$receiptNumber = "2025-00123";
$amountPaid = "€265.00";
$paymentMethod = "PayPal";
$transactionDate = date("F j, Y");

$html = <<<EOD
<style>
  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
    color: #333;
  }  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  .details {
    margin-bottom: 30px;
  }
  .details p {
    margin: 0 0 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  th, td {
    border: 1px solid #aaa;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f0f0f0;
  }
  .total {
    text-align: right;
    font-weight: bold;
  }
  .footer {
    margin-top: 40px;
    font-style: italic;
    text-align: center;
  }
</style>

<h1>Payment Receipt</h1>

<div classs="address">
   <strong>International Meteor Organization,<strong>
   Jozef Mattheessensstraat 60, 2540 Hove, Belgium<br />
   Bank account at BNP Paribas Fortis Bank Belgium<br />
   BIC bank code: GEBABEBB<br />
   IBAN account number: BE30 0014 7327 5911<br />
   e-mail: treasurer@imo.net
</div>

<div class="details">
  <p><strong>Participant:</strong> {$participantName}</p>
  <p><strong>Payment Method:</strong> {$paymentMethod}</p>
  <p><strong>Date:</strong> {$transactionDate}</p>
  <p><strong>Receipt #:</strong> {$receiptNumber}</p>
</div>

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Description</th>
      <th style="text-align:right;">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Registration</td>
      <td>Full conference access</td>
      <td style="text-align:right;">€200.00</td>
    </tr>
    <tr>
      <td>Workshop</td>
      <td>Spectroscopy workshop</td>
      <td style="text-align:right;">€50.00</td>
    </tr>
    <tr>
      <td>T-Shirt</td>
      <td>Size L</td>
      <td style="text-align:right;">€15.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2" class="total">Total Paid</td>
      <td style="text-align:right;"><strong>{$amountPaid}</strong></td>
    </tr>
  </tfoot>
</table>

<div class="footer">
  Thank you for your registration!<br>
  International Meteor Organization
</div>
EOD;

// Move cursor down to avoid overlap with content
$pdf->Ln(50);

$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output('payment_receipt.pdf', 'I');

ob_end_flush();
exit;
