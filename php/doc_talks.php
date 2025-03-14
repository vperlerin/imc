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
$headers = ["Session", "Duration", "Presenter", "Title", "Authors", "Abstract", "Online", "Confirmed"];

// Write headers
$sheet->fromArray([$headers], NULL, 'A1');

// ✅ **Apply header styling**
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

$sheet->getStyle('A1:H1')->applyFromArray($headerStyle);

// Insert talk data
$row = 2;
foreach ($talks as $session => $talkList) {
    foreach ($talkList as $talk) {
        $presenter = trim("{$talk['first_name']} {$talk['last_name']}");
        $isOnline = isset($talk['is_online']) && $talk['is_online'] == "1" ? "true" : "false";
        $confirmed = isset($talk["confirmation_sent"]) && $talk["confirmation_sent"] == "1" ? "YES" : "NO";
        $abstract = isset($talk["abstract"]) ? $talk["abstract"] : "No abstract available";
        $authors = isset($talk["authors"]) ? $talk["authors"] : "No author available";

        $sheet->fromArray([
            $session,
            isset($talk["duration"]) ? $talk["duration"] : "n/a",
            $presenter,
            isset($talk["title"]) ? $talk["title"] : "Untitled",
            $authors,
            $abstract,
            $isOnline,
            $confirmed
        ], NULL, "A$row");

        // ✅ **Enable text wrapping for Abstract & Authors columns (F & E)**
        $sheet->getStyle("F$row")->getAlignment()->setWrapText(true);
        $sheet->getStyle("E$row")->getAlignment()->setWrapText(true);

        // ✅ **Adjust row height dynamically based on content**
        $rowHeight = max(15, min(100, strlen($abstract) / 5)); // Adjust dynamically
        $sheet->getRowDimension($row)->setRowHeight($rowHeight);

        $row++;
    }
}

// ✅ **Auto-size all columns except Abstract**
foreach (range('A', 'H') as $col) {
    if ($col !== 'F') { // Skip Abstract column
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}

// ✅ **Set Abstract column width to max 250px (~35 Excel width units)**
$sheet->getColumnDimension('F')->setWidth(35);

// Set alignment for all columns
$sheet->getStyle("A1:H$row")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

// ✅ **Generate and send file**
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
