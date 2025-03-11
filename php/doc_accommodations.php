<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Enable CORS for local development & production
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
require_once __DIR__ . "/class/Accommodation.class.php";
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

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

// Define column headers
$headers = ["Registered On", "Name", "Registration Type"];

/**
 * Populates an Excel sheet with participant data.
 * @param \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet $sheet
 * @param string $title
 * @param array $data
 * @param array $headers
 */
function populateSheet($sheet, $title, $data, $headers) {
    $sheet->setTitle($title);
    $sheet->fromArray([$headers], NULL, 'A1');

    $row = 2;
    foreach ($data as $participant) {
        $fullName = trim(
            (isset($participant['title']) ? $participant['title'] . ' ' : '') .
            (isset($participant['first_name']) ? $participant['first_name'] . ' ' : '') .
            (isset($participant['last_name']) ? $participant['last_name'] : '')
        );

        $sheet->fromArray([
            isset($participant["created_at"]) ? $participant["created_at"] : "N/A",
            $fullName,
            isset($participant["description"]) ? $participant["description"] : "N/A"
        ], NULL, "A$row");

        $row++;
    }

    // Auto-size columns
    foreach (range('A', 'C') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Set styles for headers
    $headerStyle = [
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
    ];

    $sheet->getStyle('A1:C1')->applyFromArray($headerStyle);
}

// Create and populate first sheet for "Staying at the hostel"
$sheet1 = $spreadsheet->getActiveSheet();
populateSheet($sheet1, "Staying at the hostel", $stayingAtHostel, $headers);

// Create and populate second sheet for "No Accommodation"
$sheet2 = $spreadsheet->createSheet();
$spreadsheet->addSheet($sheet2, 1);
populateSheet($sheet2, "No Accommodation", $noAccommodation, $headers);

// Generate and send file
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
