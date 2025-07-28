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
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

// Connect to DB
try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage());
}

// Fetch confirmed participants with t-shirt size
$stmt = $pdo->prepare("
    SELECT 
        eo.tshirt_size,
        CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS full_name,
        p.email
    FROM participants p
    LEFT JOIN extra_options eo ON eo.participant_id = p.id
    WHERE p.confirmation_sent = 1
    ORDER BY eo.tshirt_size ASC, p.last_name ASC
");
$stmt->execute();
$rows = $stmt->fetchAll();

// Group by t-shirt size
$grouped = [];
foreach ($rows as $row) {
    $size = $row['tshirt_size'] ?: 'N/A';
    if (!isset($grouped[$size])) {
        $grouped[$size] = [];
    }
    $grouped[$size][] = [
        'Full Name' => $row['full_name'],
        'Email' => $row['email']
    ];
}

// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");
$fileName = "IMC{$currentYear}-Tshirts-{$currentDate}.xlsx";

// Create Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("IMC T-shirt Sizes {$currentYear}")
    ->setSubject("T-shirt Size List")
    ->setDescription("Excel export for confirmed participants grouped by t-shirt size.")
    ->setKeywords("conference t-shirt export")
    ->setCategory("T-shirt Data");

$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("T-shirt Sizes");

// Define and style header
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

// Write grouped data
$currentRow = 1;
foreach ($grouped as $size => $participants) {
    // Section header
    $sheet->mergeCells("A{$currentRow}:C{$currentRow}");
    $sheet->setCellValue("A{$currentRow}", "T-shirt size: $size");
    $sheet->getStyle("A{$currentRow}")->getFont()->setBold(true)->setSize(14);
    $sheet->getStyle("A{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
    $currentRow++;

    // Column headers
    $sheet->setCellValue("A{$currentRow}", "Full Name");
    $sheet->setCellValue("B{$currentRow}", "Email");
    $sheet->getStyle("A{$currentRow}:B{$currentRow}")->applyFromArray($headerStyle);
    $currentRow++;

    // Participant rows
    foreach ($participants as $p) {
        $sheet->setCellValue("A{$currentRow}", $p['Full Name']);
        $sheet->setCellValue("B{$currentRow}", $p['Email']);
        $sheet->getStyle("A{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $sheet->getStyle("B{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $currentRow++;
    }

    $currentRow++; // Space between groups
}

// Auto-size columns
foreach (['A', 'B'] as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Align all vertically centered
$sheet->getStyle("A1:B{$currentRow}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

// ✅ Send file
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
