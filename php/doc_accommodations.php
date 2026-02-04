<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Enable CORS for local development & production
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

// Include dependencies
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Accommodation.class.php";
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

// Initialize accommodation manager
$accommodationManager = new AccommodationManager($pdo);
$stayingAtHostel = $accommodationManager->getParticipantsWithRegistrationDetails('not_no'); // type != 'no'
$noAccommodation = $accommodationManager->getParticipantsWithRegistrationDetails('no'); // type == 'no'

// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");

// Generate filename
$fileName = "IMC{$currentYear}-Accommodations-{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("IMC Accommodations {$currentYear}")
    ->setSubject("Accommodations List")
    ->setDescription("Excel export for accommodations.")
    ->setKeywords("conference accommodations export")
    ->setCategory("Accommodation Data");

// 🚀 **Remove default sheet (fixes duplicate sheet error)**
$spreadsheet->removeSheetByIndex(0);

// Define column headers
$headers = ["Registered On", "Name", "Country", "Organization", "Registration Type", "Comments", "Confirmed"];

/**
 * Populates an Excel sheet with participant data.
 * @param Spreadsheet $spreadsheet
 * @param string $title
 * @param array $data
 * @param array $headers
 */
function populateSheet($spreadsheet, $title, $data, $headers)
{
    // Create a new sheet
    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($title);
    $spreadsheet->setActiveSheetIndex($spreadsheet->getIndex($sheet));

    // Write headers
    $sheet->fromArray([$headers], NULL, 'A1');

    $row = 2;
    foreach ($data as $participant) {
        $fullName = trim(
            (isset($participant['title']) ? $participant['title'] . ' ' : '') .
                (isset($participant['first_name']) ? $participant['first_name'] . ' ' : '') .
                (isset($participant['last_name']) ? $participant['last_name'] : '')
        );

        $country = isset($participant["country"]) ? $participant["country"] : "N/A";
        $organization = isset($participant["organization"]) && !empty($participant["organization"])
            ? $participant["organization"]
            : " - ";

        // Get comments (handle empty)
        $comments = isset($participant["comments"]) && !empty($participant["comments"])
            ? $participant["comments"]
            : " - ";

        // Get confirmed status
        $confirmedStatus = isset($participant["confirmation_sent"]) && $participant["confirmation_sent"] == "1"
            ? "YES"
            : "NO";

        // Insert row data
        $sheet->fromArray([
            isset($participant["created_at"]) ? $participant["created_at"] : "n/a",
            $fullName,
            $country,
            $organization,
            isset($participant["registration_type"]) ? $participant["registration_type"] : "n/a",
            $comments,
            $confirmedStatus
        ], NULL, "A$row");

        $row++;
    }

    // Auto-size columns
    foreach (range('A', 'G') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Set styles for headers
    $headerStyle = [
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
    ];

    $sheet->getStyle('A1:G1')->applyFromArray($headerStyle);
}

$createdSheets = 0;

// Populate "Staying at the hostel"
if (!empty($stayingAtHostel)) {
    populateSheet($spreadsheet, "Staying at the hostel", $stayingAtHostel, $headers);
    $createdSheets++;
}

// Populate "No Accommodation"
if (!empty($noAccommodation)) {
    populateSheet($spreadsheet, "No Accommodation", $noAccommodation, $headers);
    $createdSheets++;
}

// If we created at least one real sheet, remove the default empty sheet
if ($createdSheets > 0) {
    $spreadsheet->removeSheetByIndex(0);
    $spreadsheet->setActiveSheetIndex(0);
} else {
    // No data: use default sheet and show a message
    $sheet = $spreadsheet->getSheet(0);
    $sheet->setTitle('No data');
    $sheet->setCellValue('A1', 'No accommodation records found for this export.');
    $spreadsheet->setActiveSheetIndex(0);
}

// Ensure output buffer is clean
if (ob_get_length()) ob_end_clean();

header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
