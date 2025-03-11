<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . "/../../config.php";
require_once __DIR__ . "/../../class/Connect.class.php";
require_once __DIR__ . "/../../class/Dashboard.class.php";
require '/../../../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if (!isset($_GET['workshop_id']) || !is_numeric($_GET['workshop_id'])) {
    die(json_encode(["success" => false, "message" => "Invalid workshop ID."]));
}

$workshopId = intval($_GET['workshop_id']);

$dashboardManager = new DashboardManager($pdo);
$participants = $dashboardManager->getParticipantsByWorkshop($pdo, $workshopId);

// Separate Online and Onsite participants
$onlineParticipants = array_filter($participants, fn($p) => $p["is_online"] == "1");
$onsiteParticipants = array_filter($participants, fn($p) => $p["is_online"] == "0");

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();

// Function to create a sheet
function createSheet($spreadsheet, $sheetName, $participants)
{
    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($sheetName);

    // Headers
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
}

// Create "Online Participants" sheet
$spreadsheet->setActiveSheetIndex(0);
$spreadsheet->getActiveSheet()->setTitle("Online Participants");
createSheet($spreadsheet, "Online Participants", $onlineParticipants);

// Create "Onsite Participants" sheet
createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants);

// Send as downloadable Excel file
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=workshop_{$workshopId}.xlsx");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
