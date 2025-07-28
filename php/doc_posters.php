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

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage()); 
}

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
$headers = ["Session", "Presenter", "Title", "Authors", "Abstract", "Confirmed", "TO PRINT BY LOC"];

// Write headers
$sheet->fromArray([$headers], NULL, 'A1');

$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

// Apply header styling
$sheet->getStyle('A1:G1')->applyFromArray($headerStyle);

// Insert poster data
$row = 2;
foreach ($posters as $session => $posterList) {
    foreach ($posterList as $poster) {
        $presenter = trim("{$poster['first_name']} {$poster['last_name']}");
        $confirmed = isset($poster["confirmation_sent"]) && $poster["confirmation_sent"] == "1" ? "YES" : "NO";
        $printFlag = isset($poster['print']) && (int)$poster['print'] === 1 ? 'YES' : 'NO';

        // Truncate fields
        $title = isset($poster["title"]) ? mb_strimwidth($poster["title"], 0, 300, '…') : "Untitled";
        $authors = isset($poster["authors"]) ? mb_strimwidth($poster["authors"], 0, 300, '…') : "No author available";
        $abstract = isset($poster["abstract"]) ? mb_strimwidth($poster["abstract"], 0, 1000, '…') : "No abstract available";

        $sheet->fromArray([
            $session,
            $presenter,
            $title,
            $authors,
            $abstract,
            $confirmed,
            $printFlag
        ], NULL, "A$row");

        // Enable wrap and dynamic row height
        foreach (['D', 'E'] as $col) {
            $sheet->getStyle("{$col}{$row}")->getAlignment()->setWrapText(true);
        }

        $numLines = substr_count($abstract, "\n") + ceil(strlen($abstract) / 50);
        $rowHeight = max(20, min(200, $numLines * 15));
        $sheet->getRowDimension($row)->setRowHeight($rowHeight);

        $row++;
    }
}

// Auto-size all columns except Abstract (E)
foreach (range('A', 'G') as $col) {
    if ($col !== 'E') {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}
$sheet->getColumnDimension('E')->setWidth(35);

// Align everything vertically center
$sheet->getStyle("A1:G$row")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);
 

// ✅ **Generate and send file**
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
