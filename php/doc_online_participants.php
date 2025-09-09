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
require __DIR__ . "/class/Participant.class.php";
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Fetch confirmed ONLINE participants
$sql = "
    SELECT 
        p.title,
        p.first_name,
        p.last_name,
        p.organization
    FROM participants p
    WHERE p.is_online = 1
      AND p.status = 'confirmed'
    ORDER BY p.last_name, p.first_name
";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Create spreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle('Confirmed Online');

// Header row
$headers = ['Title', 'First name', 'Last name', 'Organization'];
$col = 1;
foreach ($headers as $header) {
    $cell = $sheet->getCellByColumnAndRow($col, 1);
    $cell->setValue($header);
    $sheet->getStyleByColumnAndRow($col, 1)->applyFromArray([
        'font' => ['bold' => true],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
    ]);
    $col++;
}

// Fill data
$rowNum = 2;
foreach ($rows as $r) {
    $sheet->setCellValueByColumnAndRow(1, $rowNum, $r['title'] ?? '');
    $sheet->setCellValueByColumnAndRow(2, $rowNum, $r['first_name'] ?? '');
    $sheet->setCellValueByColumnAndRow(3, $rowNum, $r['last_name'] ?? '');
    $sheet->setCellValueByColumnAndRow(4, $rowNum, $r['organization'] ?? '');
    $rowNum++;
}

// Auto-size columns
foreach (range('A', 'D') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// Output file
$filename = "Confirmed_Online_Participants.xlsx";
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header("Content-Disposition: attachment;filename=\"$filename\"");
header('Cache-Control: max-age=0');

$writer = new Xlsx($spreadsheet);
$writer->save('php://output');
exit;
