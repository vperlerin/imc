<?php

// Enable CORS
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

// Load dependencies
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

// Fetch participants grouped by t-shirt size
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
$results = $stmt->fetchAll();

// Group by t-shirt size
$grouped = [];
foreach ($results as $row) {
    $size = $row['tshirt_size'] ?: 'N/A';
    if (!isset($grouped[$size])) {
        $grouped[$size] = [];
    }
    $grouped[$size][] = [
        'Full Name' => $row['full_name'],
        'Email' => $row['email']
    ];
}

// Spreadsheet setup
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC")
    ->setTitle("Confirmed Participants by T-shirt Size")
    ->setDescription("Export of confirmed participants grouped by T-shirt size.");

$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("T-shirt Sizes");

// Header style
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];

// General cell alignment
$sheet->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

// Write data
$currentRow = 1;

foreach ($grouped as $size => $participants) {
    // Section title (merged)
    $sheet->mergeCells("A{$currentRow}:C{$currentRow}");
    $sheet->setCellValue("A{$currentRow}", "T-shirt size: $size");
    $sheet->getStyle("A{$currentRow}")->getFont()->setBold(true)->setSize(14);
    $sheet->getStyle("A{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
    $currentRow += 1;

    // Table header
    $sheet->setCellValue("A{$currentRow}", "Full Name");
    $sheet->setCellValue("B{$currentRow}", "Email");
    $sheet->getStyle("A{$currentRow}:B{$currentRow}")->applyFromArray($headerStyle);
    $currentRow += 1;

    // Participant rows
    foreach ($participants as $p) {
        $sheet->setCellValue("A{$currentRow}", $p['Full Name']);
        $sheet->setCellValue("B{$currentRow}", $p['Email']);
        $sheet->getStyle("A{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $sheet->getStyle("B{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $currentRow += 1;
    }

    // Add spacing row between groups
    $currentRow += 1;
}

// Auto-size columns
foreach (['A', 'B'] as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Generate and download file
ob_end_clean();
$today = date("Y-m-d");
$filename = "IMC-Confirmed-Participants-Tshirt-Grouped-{$today}.xlsx";

header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
