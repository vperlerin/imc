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

// Separate Online and Onsite participants (ensure indexed arrays)
$onlineParticipants = array_values(array_filter($participants, function ($p) {
  return isset($p["is_online"]) && $p["is_online"] == "1";
}));
$onsiteParticipants = array_values(array_filter($participants, function ($p) {
  return isset($p["is_online"]) && $p["is_online"] == "0";
}));

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

// Remove the default empty sheet
$spreadsheet->removeSheetByIndex(0);

function createSheet($spreadsheet, $sheetName, $participants, $includeAccommodation = false)
{
    if (empty($participants)) {
        return; // ❌ Skip creating an empty sheet
    }

    // Create a new sheet
    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($sheetName);
    $spreadsheet->setActiveSheetIndex($spreadsheet->getIndex($sheet)); // Ensure it's active

    // Define column headers
    $headers = ["Full Name", "Email", "Country", "Confirmed"];
    if ($includeAccommodation) {
        $headers[] = "Accommodation"; // Add accommodation column for onsite participants
    }

    // Ensure headers exist before writing
    if (!empty($headers)) {
        $sheet->fromArray([$headers], NULL, 'A1');
    }

    // Insert participant data safely
    $dataRows = [];
    foreach ($participants as $p) {
        if (!isset($p["first_name"], $p["last_name"], $p["email"], $p["country"])) {
            continue; // Skip if required fields are missing
        }

        $fullName = trim("{$p['title']} {$p['last_name']} {$p['first_name']}");
        $confirmedStatus = isset($p["confirmation_sent"]) && $p["confirmation_sent"] == "1" ? "confirmed" : "not confirmed";
        $dataRow = [$fullName, $p["email"], $p["country"], $confirmedStatus];

        if ($includeAccommodation) {
            $dataRow[] = $p["accommodation"] ?? "Not Assigned"; // Handle missing accommodation
        }

        $dataRows[] = $dataRow;
    }

    // Ensure dataRows is structured correctly before calling `fromArray()`
    if (!empty($dataRows)) {
        $sheet->fromArray($dataRows, NULL, 'A2'); // Start data from row 2
    }

    // Ensure auto column width is correctly calculated
    $columnCount = count($headers);
    for ($i = 1; $i <= $columnCount; $i++) {
        $col = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}


// Only create "Online Participants" sheet if they exist
if (!empty($onlineParticipants)) {
    createSheet($spreadsheet, "Online Participants", $onlineParticipants);
}

// Only create "Onsite Participants" sheet if they exist
if (!empty($onsiteParticipants)) {
    createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants, true);
}

// Ensure at least one sheet exists
if ($spreadsheet->getSheetCount() == 0) {
    $spreadsheet->createSheet()->setTitle("No Participants");
    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getActiveSheet()->setCellValue('A1', 'No participants found.');
}

// Set the first sheet as active
$spreadsheet->setActiveSheetIndex(0);
 
ob_end_clean(); 
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
