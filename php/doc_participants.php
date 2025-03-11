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

// Separate Online and Onsite participants
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

// Remove the default empty sheet before adding new ones
$spreadsheet->removeSheetByIndex(0);

// Function to create a sheet
function createSheet($spreadsheet, $sheetName, $participants, $includeAccommodation = false)
{
    if (empty($participants)) {
        return; // Skip creating an empty sheet if there are no participants
    }

    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($sheetName);
    $spreadsheet->setActiveSheetIndex($spreadsheet->getSheetCount() - 1); // Make it the active sheet

    // Set column headers
    $headers = ["Full Name", "Email", "Country", "Confirmed"];
    if ($includeAccommodation) {
        $headers[] = "Accommodation"; // Add accommodation column for onsite participants
    }
    $sheet->fromArray($headers, NULL, 'A1');

    // Insert participant data
    $row = 2;
    foreach ($participants as $p) {
        $fullName = "{$p['title']} {$p['last_name']} {$p['first_name']}";
        $confirmedStatus = $p["confirmation_sent"] ? "confirmed" : "not confirmed";
        $dataRow = [$fullName, $p["email"], $p["country"], $confirmedStatus];

        if ($includeAccommodation) {
            $dataRow[] = $p["accommodation"] ?? "Not Assigned"; // Include accommodation for onsite
        }

        $sheet->fromArray($dataRow, NULL, "A$row");
        $row++;
    }

    // Set auto column width for better readability
    foreach (range('A', count($headers)) as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}

// Create "Online Participants" sheet
createSheet($spreadsheet, "Online Participants", $onlineParticipants);

// Create "Onsite Participants" sheet
createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants, true);

// Ensure at least one sheet exists
if ($spreadsheet->getSheetCount() == 0) {
    $spreadsheet->createSheet()->setTitle("No Participants");
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
