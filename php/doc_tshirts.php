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

// Include dependencies
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

try {
    $pdo = Connect::getPDO();

    $stmt = $pdo->prepare("
        SELECT 
            CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS full_name,
            p.email,
            eo.tshirt_size
        FROM participants p
        LEFT JOIN extra_options eo ON eo.participant_id = p.id
        WHERE p.confirmation_sent = 1
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll();

    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle('Confirmed Participants');

    // Headers
    $headers = ['Full Name', 'Email', 'T-shirt size'];
    $sheet->fromArray($headers, null, 'A1');

    // Header styling
    $headerStyle = [
        'font' => ['bold' => true],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['argb' => 'FFE0E0E0']
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => ['argb' => 'FF888888']
            ]
        ]
    ];
    $sheet->getStyle('A1:C1')->applyFromArray($headerStyle);

    // Data rows
    $rowIndex = 2;
    foreach ($rows as $r) {
        $sheet->setCellValue("A{$rowIndex}", $r['full_name']);
        $sheet->setCellValue("B{$rowIndex}", $r['email']);
        $sheet->setCellValue("C{$rowIndex}", $r['tshirt_size']);
        $rowIndex++;
    }

    // Auto-size columns
    foreach (range('A', 'C') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Align email & t-shirt columns left
    $rowCount = count($rows) + 1;
    $sheet->getStyle("B2:B{$rowCount}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
    $sheet->getStyle("C2:C{$rowCount}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

    // Get current year and date
    $currentYear = date("Y");
    $currentDate = date("d-m-Y");

    // Generate filename
    $filename = "IMC{$currentYear}-Tshirts-{$currentDate}.xlsx";

    ob_end_clean();
    header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Cache-Control: max-age=0");

    $writer = new Xlsx($spreadsheet);
    $writer->save("php://output");
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo "Error: " . $e->getMessage();
    exit;
}
