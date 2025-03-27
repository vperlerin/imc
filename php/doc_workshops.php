<?php

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
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

if (!isset($_GET['workshop_id']) || !is_numeric($_GET['workshop_id'])) {
    die(json_encode(["success" => false, "message" => "Invalid workshop ID."]));
}

$workshopId = intval($_GET['workshop_id']);

$workshopManager = new WorkshopManager($pdo);
$workshop = $workshopManager->getWorkshopById($workshopId);

if (!$workshop) {
    die(json_encode(["success" => false, "message" => "Workshop not found."]));
}

$participantManager = new ParticipantManager($pdo);
$participants = $participantManager->getParticipantsByWorkshop($workshopId);

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
$currentYear = date("Y");

$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("Workshop Participants {$currentYear}")
    ->setSubject("Participants List for {$currentYear}")
    ->setDescription("Excel 2007 export for OpenOffice compatibility - {$currentYear}")
    ->setKeywords("IMC IMO openoffice excel export {$currentYear}")
    ->setCategory("Workshop Data {$currentYear}");

// 🚀 Remove default sheet (to prevent duplicate issues)
$spreadsheet->removeSheetByIndex(0);

//**Header Styling**
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

/**
 * Creates an Excel sheet with participant data and applies header styling.
 * @param Spreadsheet $spreadsheet
 * @param string $sheetName
 * @param array $participants
 * @param array $headerStyle
 */
function createSheet($spreadsheet, $sheetName, $participants, $headerStyle)
{
    if (empty($participants)) {
        return;
    }

    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($sheetName);
    $spreadsheet->setActiveSheetIndex($spreadsheet->getSheetCount() - 1); // Make it the active sheet

    // Define column headers
    $headers = ["Full Name", "Email", "Country", "Confirmed"];
    $sheet->fromArray([$headers], NULL, 'A1');

    // Apply header styling
    $sheet->getStyle('A1:D1')->applyFromArray($headerStyle);

    // Insert Data
    $row = 2;
    foreach ($participants as $p) {
        $fullName = "{$p['title']} {$p['last_name']} {$p['first_name']}";
        $confirmedStatus = $p["confirmation_sent"] ? "YES" : "NO";

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



//**Create "Onsite Participants" Sheet**
if (!empty($onsiteParticipants)) {
    createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants, $headerStyle);
}

//**Create "Online Participants" Sheet**
if (!empty($onlineParticipants)) {
    createSheet($spreadsheet, "Online Participants", $onlineParticipants, $headerStyle);
}

// Ensure at least one sheet exists
if ($spreadsheet->getSheetCount() == 0) {
    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle("No Participants");
    $spreadsheet->setActiveSheetIndex(0);
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
