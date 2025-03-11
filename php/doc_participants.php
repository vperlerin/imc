<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_clean(); // Clears any previous output

// Allow CORS for local development & production
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

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Initialize participant manager
$participantManager = new ParticipantManager($pdo);
$participants = $participantManager->getAllParticipants($pdo);

// Separate Online and Onsite participants (PHP 7.4 compatible)
$onlineParticipants = array_filter($participants, function ($p) {
  return $p["is_online"] == "1";
});
$onsiteParticipants = array_filter($participants, function ($p) {
  return $p["is_online"] == "0";
});


// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");

// Generate filename
$fileName = "IMC{$currentYear}-Participant-{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
  ->setCreator("IMC {$currentYear}")
  ->setLastModifiedBy("IMC {$currentYear}")
  ->setTitle("IMC Participants {$currentYear}")
  ->setSubject("Participants List")
  ->setDescription("Excel 2007 export for OpenOffice compatibility.")
  ->setKeywords("openoffice excel export {$currentYear}")
  ->setCategory("Participant Data");

function createSheet($spreadsheet, $sheetName, $participants, $includeAccommodation = false)
{
  // Reindex array to ensure sequential keys (0,1,2...) for PhpSpreadsheet
  $participants = array_values($participants);

  if (empty($participants)) {
    return;  
  }

  // Create a new sheet
  $sheet = $spreadsheet->createSheet();
  $sheet->setTitle($sheetName);
  $spreadsheet->setActiveSheetIndex($spreadsheet->getSheetCount() - 1); // Make it the active sheet

  // Define column headers
  $headers = ["Full Name", "Email", "Country", "Confirmed"];
  if ($includeAccommodation) {
    $headers[] = "Accommodation"; // Add accommodation column for onsite participants
  }

  // Write headers
  $sheet->fromArray([$headers], NULL, 'A1');

  // Insert participant data
  $dataRows = [];
  foreach ($participants as $p) {
    $fullName = "{$p['title']} {$p['last_name']} {$p['first_name']}";
    $confirmedStatus = ($p["confirmation_sent"] == "1") ? "confirmed" : "not confirmed";
    $dataRow = [$fullName, $p["email"], $p["country"], $confirmedStatus];

    if ($includeAccommodation) {
      $dataRow[] = $p["accommodation"] ?? "Not Assigned"; // Handle missing accommodation
    }

    $dataRows[] = $dataRow;
  }

  // Ensure the data array is not empty before calling fromArray()
  if (!empty($dataRows)) {
    $sheet->fromArray($dataRows, NULL, 'A2'); // Start data from row 2 (below headers)
  }

  // Set auto column width for better readability
  foreach (range('A', count($headers)) as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
  }
}


// Create "Onsite Participants" sheet
createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants, true);

// Create "Online Participants" sheet
createSheet($spreadsheet, "Online Participants", $onlineParticipants);

// Ensure at least one sheet exists
if ($spreadsheet->getSheetCount() == 1 && empty($onlineParticipants) && empty($onsiteParticipants)) {
  $sheet = $spreadsheet->setActiveSheetIndex(0);
  $sheet->setTitle("No Participants");
  $sheet->setCellValue('A1', 'No participants found.');
}

// Set the first sheet as active
$spreadsheet->setActiveSheetIndex(0);

// Send as downloadable Excel file
ob_end_clean(); // Clear previous output before headers
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
