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
$talks = $contributionManager->getAllTalks();

// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");

// Generate filename
$fileName = "IMC{$currentYear}-Talks-{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("IMC Talks {$currentYear}")
    ->setSubject("Talks List")
    ->setDescription("Excel export for all talks.")
    ->setKeywords("conference talks export")
    ->setCategory("Talk Data");

// Create a single sheet
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("All Talks");

// Define column headers
$headers = ["Session", "Duration", "Presenter", "Title", "Authors", "Abstract", "Online"];

// Write headers
$sheet->fromArray([$headers], NULL, 'A1');

// Insert talk data
$row = 2;
foreach ($talks as $session => $talkList) {
    foreach ($talkList as $talk) {
        $presenter = trim("{$talk['first_name']} {$talk['last_name']}");
        $isOnline = isset($talk['is_online']) && $talk['is_online'] == "1" ? "true" : "false";

        $sheet->fromArray([
            $session,
            isset($talk["duration"]) ? $talk["duration"] : "N/A",
            $presenter,
            isset($talk["title"]) ? $talk["title"] : "Untitled",
            isset($talk["authors"]) ? $talk["authors"] : "No author available",
            isset($talk["abstract"]) ? $talk["abstract"] : "No abstract available",
            $isOnline
        ], NULL, "A$row");

        // Wrap text for the abstract column (column E)
        $sheet->getStyle("E$row")->getAlignment()->setWrapText(true);

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

$sheet->getStyle('A1:F1')->applyFromArray($headerStyle);

// Set alignment for all columns
$sheet->getStyle("A1:F$row")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

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
