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
require_once __DIR__ . "/class/Workshop.class.php"; 
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if (!isset($_GET['workshop_id']) || !is_numeric($_GET['workshop_id'])) {
  die(json_encode(["success" => false, "message" => "Invalid workshop ID."]));
}

$workshopId = intval($_GET['workshop_id']);

echo "$workshopId " . $workshopId;


$workshopManager = new WorkshopManager($pdo);
$workshop = $workshopManager->getWorkshopById($pdo, $workshopId);

var_dump($workshop);

if (!$workshop) {
    die(json_encode(["success" => false, "message" => "Workshop not found."]));
}

$participantManager = new ParticipantManager($pdo);
$participants = $participantManager->getParticipantsByWorkshop($pdo, $workshopId);

// Separate Online and Onsite participants
$onlineParticipants = array_filter($participants, function ($p) {
    return $p["is_online"] == "1";
});
$onsiteParticipants = array_filter($participants, function ($p) {
    return $p["is_online"] == "0";
});

// Get current date in "DD-MM-YYYY" format
$currentDate = date("d-m-Y");

// Generate a sanitized workshop name for the filename
$workshopName = preg_replace('/[^A-Za-z0-9_ -]/', '', $workshop['title']); // Remove special characters
$fileName = "{$workshopName}_{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC 2025")
    ->setLastModifiedBy("IMC 2025")
    ->setTitle("Workshop Participants")
    ->setSubject("Participants List")
    ->setDescription("Excel 2007 export for OpenOffice compatibility.")
    ->setKeywords("openoffice excel export")
    ->setCategory("Workshop Data");

// Function to create a sheet
function createSheet($spreadsheet, $sheetName, $participants)
{
    $spreadsheet->createSheet();
    $sheet = $spreadsheet->setActiveSheetIndex($spreadsheet->getSheetCount() - 1);
    $sheet->setTitle($sheetName);

    // Set column headers
    $headers = ["Full Name", "Email", "Country", "Confirmed"];
    $sheet->fromArray($headers, NULL, 'A1');

    // Insert Data
    $row = 2;
    foreach ($participants as $p) {
        $fullName = "{$p['title']} {$p['last_name']} {$p['first_name']}";
        $confirmedStatus = $p["confirmation_sent"] ? "confirmed" : "not confirmed";

        $sheet->fromArray([
            $fullName,
            $p["email"],
            $p["country"],
            $confirmedStatus
        ], NULL, "A$row");

        $row++;
    }

    // Set auto column width for better readability
    foreach (range('A', 'D') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}

// Create "Online Participants" sheet
createSheet($spreadsheet, "Online Participants", $onlineParticipants);

// Create "Onsite Participants" sheet
createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants);

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
