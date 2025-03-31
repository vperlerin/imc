<?php

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
require_once __DIR__ . "/../vendor/autoload.php";

// TCPDF
use TCPDF;

// Validate participant ID
$participantId = $_GET['id'] ?? null;
if (!$participantId || !is_numeric($participantId)) {
    echo json_encode(["success" => false, "message" => "Invalid participant ID"]);
    exit;
}

try {
  $pdo = Connect::getPDO();
} catch (Exception $e) {
  die($e->getMessage());
}

try {
  $participantManager = new ParticipantManager($pdo);
  $participant = $participantManager->getParticipantDetails($participantId);

  echo json_encode(["success" => true, "data" => $participant]);
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

print_r($participant);
return;

// Replace these with real data from your database
$participant = []; // fetched from ParticipantManager
$conferenceData = []; // fetched from config or DB
$isOnline = false; // set appropriately

// Start output buffering
ob_clean();
ob_start();

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

// --- Calculate Invoice ---
$totalRoomCost = 0;
$registrationDescription = "";

if (!$isOnline) {
  $registrationTypeId = $participant['accommodation']['registration_type_id'];
  $registrationTypes = $conferenceData['registration_types'];
  $regInfo = array_filter($registrationTypes, fn($r) => $r['id'] == $registrationTypeId);
  $regInfo = reset($regInfo);

  if ($regInfo) {
    $isLast = end($registrationTypes)['id'] == $registrationTypeId;
    $registrationDescription = $isLast ? "(no accommodation)" : "+ " . $regInfo['description'];
    $price = floatval($regInfo['price']);
    $lateFee = $participant['is_early_bird'] === "0" ? floatval($conferenceData['costs']['after_early_birds']) : 0;
    $totalRoomCost = $price + $lateFee;
  }
}

$workshopCost = 0;
$selectedWorkshops = [];
foreach ($participant['workshops'] ?? [] as $workshop) {
  $price = $isOnline ? floatval($workshop['price_online']) : floatval($workshop['price']);
  $workshopCost += $price;
  $selectedWorkshops[] = [
    'title' => $workshop['title'],
    'price' => $price
  ];
}

$tshirtCost = 0;
$tshirtSize = '';
if (!empty($participant['extra_options']['buy_tshirt'])) {
  $tshirtCost = floatval($conferenceData['costs']['tshirts']['price']);
  $tshirtSize = $participant['extra_options']['tshirt_size'] ?? '';
}

$printedPosters = array_filter($participant['contributions'] ?? [], fn($c) => $c['print'] === "1" || $c['print'] === true);
$printedPosterCount = count($printedPosters);
$printedPosterCost = $printedPosterCount * floatval($conferenceData['poster_print']['price']);

$totalCost = $totalRoomCost + $workshopCost + $tshirtCost + $printedPosterCost;
$paymentMethod = strtolower($participant['payment_method_name'] ?? 'unknown');
$isPaypal = $paymentMethod === 'paypal';

$paypalAdjustedTotal = $isPaypal ? round(($totalCost + (0.034 * $totalCost + 0.35) / 0.966) * 100) / 100 : $totalCost;
$paypalFee = $paypalAdjustedTotal - $totalCost;
$grandTotal = $totalCost + $paypalFee;

// HTML starts here
$html = <<<EOD
<style>
  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
    color: #333;
  }
  h1 {
    text-align: center;
    margin-bottom: 35px;
  }
  .address {
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

<div class="address"><strong>International Meteor Organization</strong><br/>
  Jozef Mattheessensstraat 60, 2540 Hove, Belgium<br />
  Email: treasurer@imo.net
</div>

<div class="address">
  <strong>Object:</strong> International Meteor Organization $currentYear - 
  <a href="https://imc$currentYear.imo.net">IMC $currentYear</a>
</div>

<table>
<thead>
  <tr>
    <th>Description</th>
    <th style="text-align:right;">Price</th>
  </tr>
</thead>
<tbody>
EOD;

// Add rows dynamically
if (!$isOnline) {
  $html .= "<tr><td>Conference Registration {$registrationDescription}</td><td style='text-align:right;'>" . number_format($totalRoomCost, 2) . "€</td></tr>";
} else {
  $onlineCost = floatval($conferenceData['costs']['online']);
  $html .= "<tr><td>Online Conference Registration</td><td style='text-align:right;'>" . number_format($onlineCost, 2) . "€</td></tr>";
}

foreach ($selectedWorkshops as $workshop) {
  $html .= "<tr><td>{$workshop['title']}</td><td style='text-align:right;'>" . number_format($workshop['price'], 2) . "€</td></tr>";
}

if ($printedPosterCount > 0) {
  $html .= "<tr><td>Printed Poster" . ($printedPosterCount > 1 ? "s" : "") . " x {$printedPosterCount}</td><td style='text-align:right;'>" . number_format($printedPosterCost, 2) . "€</td></tr>";
}

if ($tshirtCost > 0 && $tshirtSize) {
  $html .= "<tr><td>T-Shirt ({$tshirtSize})</td><td style='text-align:right;'>" . number_format($tshirtCost, 2) . "€</td></tr>";
}

if ($isPaypal) {
  $html .= "<tr><td>PayPal Fee (3.4% + 0.35€)</td><td style='text-align:right;'>" . number_format($paypalFee, 2) . "€</td></tr>";
}

$html .= "<tr><td><strong>TOTAL</strong></td><td style='text-align:right;'><strong>" . number_format($grandTotal, 2) . "€</strong></td></tr>";
$html .= "</tbody></table>";

$html .= <<<EOD
<div class="footer">
  Thank you for your registration!<br>
  International Meteor Organization
</div>
EOD;

// Output PDF
$pdf->Ln(50);
$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output('payment_receipt.pdf', 'I');

ob_end_flush();
exit;
