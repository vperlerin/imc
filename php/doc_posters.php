<?php

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
require_once __DIR__ . "/class/Contribution.class.php";
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

// Initialize contribution manager
$contributionManager = new ContributionManager($pdo);
$posters = $contributionManager->getAllPosters();

// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");

// Generate filename
$fileName = "IMC{$currentYear}-Posters-{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("IMC Posters {$currentYear}")
    ->setSubject("Posters List")
    ->setDescription("Excel export for all posters.")
    ->setKeywords("conference posters export")
    ->setCategory("Poster Data");

// Create a single sheet
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("All Posters");

// Define column headers
$headers = ["Session",  "Presenter", "Title", "Authors", "Abstract"];

// Write headers
$sheet->fromArray([$headers], NULL, 'A1');

// Insert poster data
$row = 2;
foreach ($posters as $session => $posterList) {
    foreach ($posterList as $poster) {
        $presenter = trim("{$poster['first_name']} {$poster['last_name']}"); 

        $sheet->fromArray([
            $session,
            $presenter,
            isset($poster["title"]) ? $poster["title"] : "Untitled",
            isset($poster["authors"]) ? $poster["authors"] : "No author available",
            isset($poster["abstract"]) ? $poster["abstract"] : "No abstract available", 
        ], NULL, "A$row");

        // Wrap text for the abstract column (column F)
        $sheet->getStyle("F$row")->getAlignment()->setWrapText(true);

        $row++;
    }
}

// Auto-size columns for better readability
foreach (range('A', 'F') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Set styles for headers
$headerStyle = [
  'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
  'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
  'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
  'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

$sheet->getStyle('A1:E1')->applyFromArray($headerStyle);

// Set alignment for all columns
$sheet->getStyle("A1:E$row")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

// Prevent excessive cell height in Abstract column
$sheet->getRowDimension(1)->setRowHeight(25);

// Generate and send file
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
