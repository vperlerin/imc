<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// CORS setup
$allowed_origins = [
  "https://imc2026.imo.net",
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
require_once __DIR__ . "/class/Registrationtype.class.php";
require_once __DIR__ . "/../vendor/autoload.php";

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
  $registrationtypeManager = new RegistrationtypeManager($pdo);
  $registrationTypes = $registrationtypeManager->getRegistrationTypes();
} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => $e->getMessage()]);
  exit;
}

$conferenceJsonPath = __DIR__ . '/../imc/src/data/conference-data.json';
if (!file_exists($conferenceJsonPath)) {
  die("Conference data not found.");
}

$conferenceDataRaw = file_get_contents($conferenceJsonPath);
$conferenceData = json_decode($conferenceDataRaw, true);
if (!$conferenceData) {
  die("Invalid JSON in conference-data.json");
}

$isOnline = false;

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

$totalRoomCost = 0;
$registrationDescription = "";

if (!$isOnline) {
  $registrationTypeId = $participant['accommodation']['registration_type_id'] ?? null;
  foreach ($registrationTypes as $reg) {
    if ($reg['id'] == $registrationTypeId) {
      $registrationDescription = $reg['description'];
      $price = floatval($reg['price']);
      break;
    }
  }
  $lateFee = ($participant['is_early_bird'] ?? "1") === "0" ? floatval($conferenceData['costs']['after_early_birds']) : 0;
  $totalRoomCost = isset($price) ? $price + $lateFee : $lateFee;
}

$workshopCost = 0;
$selectedWorkshops = [];

foreach ($participant['workshops'] ?? [] as $workshop) {
  $price = $isOnline ? floatval($workshop['price_online']) : floatval($workshop['price']);
  $workshopCost += $price;
  $selectedWorkshops[] = ['title' => $workshop['title'], 'price' => $price];
}

$tshirtCost = 0;
$tshirtSize = '';
if (!empty($participant['extra_options']['buy_tshirt'])) {
  $tshirtCost = floatval($conferenceData['costs']['tshirts']['price']);
  $tshirtSize = $participant['extra_options']['tshirt_size'] ?? '';
}

$printedPosterCount = 0;
$printedPosterCost = 0;
foreach ($participant['contributions'] ?? [] as $contribution) {
  if ($contribution['print'] === "1" || $contribution['print'] === true) {
    $printedPosterCount++;
  }
}
$printedPosterCost = $printedPosterCount * floatval($conferenceData['poster_print']['price']);

$totalCost = $totalRoomCost + $workshopCost + $tshirtCost + $printedPosterCost;
$paymentMethod = strtolower($participant['payment_method_name'] ?? 'unknown');
print_r('PAYMENT METHO \n');
print_r($paymentMethod);
exit;
$isPaypal = $paymentMethod === 'paypal';

$paypalAdjustedTotal = $isPaypal ? round(($totalCost + (0.034 * $totalCost + 0.35) / 0.966) * 100) / 100 : $totalCost;
$paypalFee = $paypalAdjustedTotal - $totalCost;
$grandTotal = $totalCost + $paypalFee;

$startDate = date("F j", strtotime($conferenceData['dates']['start']));
$endDate = date("F j, Y", strtotime($conferenceData['dates']['end']));
$conferenceDates = "$startDate - $endDate, {$conferenceData['location']}";

// --- HTML ---
$html = <<<EOD
<style>
  body { font-family: Helvetica, Arial, sans-serif; font-size: 12px; color: #333; }
  h1 { text-align: center; margin-bottom: 35px; }
  .address { margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th, td { border: 1px solid #aaa; padding: 8px; text-align: left; }
  th { background-color: #f0f0f0; }
  .total { text-align: right; font-weight: bold; }
  .footer { margin-top: 40px; font-style: italic; text-align: center; }
</style>

<h1>International Meteor Organization</h1>

<h1>Payment Receipt</h1>
 
<div class="address"><strong>{$conferenceData['name_display']}</strong><br/>
  Jozef Mattheessensstraat 60, 2540 Hove, Belgium<br />
  Email: treasurer@imo.net
</div>

<div class="address">
  <strong>Object:</strong> {$conferenceData['name_display']} {$conferenceData['year']} - 
  <a href="https://imc{$conferenceData['year']}.imo.net">IMC {$conferenceData['year']}</a><br/>
  {$conferenceData['hotel']}, {$conferenceData['location']}<br/>
  {$conferenceDates}
</div>

<div class="address"><strong>International Meteor Organization</strong><br/> 
  Email: treasurer@imo.net
</div>

<div class="address">
  <strong>Object:</strong> International Meteor Organization {$conferenceData['year']} - 
  <a href="https://imc{$conferenceData['year']}.imo.net">IMC {$conferenceData['year']}</a>
</div>

<table>
  <thead>
    <tr><th>Description</th><th style="text-align:right;">Price</th></tr>
  </thead>
  <tbody>
EOD;

// --- DYNAMIC TABLE ROWS ---
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

// --- OUTPUT ---
$pdf->Ln(50);
$pdf->writeHTML($html, true, false, true, false, '');
$pdf->Output('payment_receipt.pdf', 'I');

ob_end_flush();
exit;
