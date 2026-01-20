<?php
// Enable CORS
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
            eo.tshirt_size,
            CONCAT(p.title, ' ', p.first_name, ' ', p.last_name) AS full_name,
            p.email
        FROM participants p
        LEFT JOIN extra_options eo ON eo.participant_id = p.id
        WHERE p.confirmation_sent = 1 AND eo.buy_tshirt = 1 AND eo.tshirt_size IS NOT NULL
        ORDER BY eo.tshirt_size ASC, p.last_name ASC
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll();

    // Group rows by t-shirt size
    $grouped = [];
    foreach ($rows as $row) {
        $size = $row['tshirt_size'] ?: 'N/A';
        if (!isset($grouped[$size])) {
            $grouped[$size] = [];
        }
        $grouped[$size][] = [
            'full_name' => $row['full_name'],
            'email' => $row['email']
        ];
    }

    $spreadsheet = new Spreadsheet();
    $spreadsheet->getProperties()
        ->setCreator("IMC")
        ->setTitle("Confirmed Participants with T-shirt")
        ->setDescription("Confirmed participants who requested a T-shirt, grouped by size.");

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle('T-shirt Sizes');

    // Header style
    $headerStyle = [
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
    ];

    $currentRow = 1;
    foreach ($grouped as $size => $participants) {
        // Group title
        $tshirtCount = count($participants);
        $sheet->mergeCells("A{$currentRow}:C{$currentRow}");
        $sheet->setCellValue("A{$currentRow}", "{$size} ({$tshirtCount})");
        $sheet->getStyle("A{$currentRow}")->getFont()->setBold(true)->setSize(14);
        $sheet->getStyle("A{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $currentRow++;

        // Table header
        $sheet->setCellValue("A{$currentRow}", "Full Name");
        $sheet->setCellValue("B{$currentRow}", "Email");
        $sheet->getStyle("A{$currentRow}:B{$currentRow}")->applyFromArray($headerStyle);
        $currentRow++;

        // Participants
        foreach ($participants as $p) {
            $sheet->setCellValue("A{$currentRow}", $p['full_name']);
            $sheet->setCellValue("B{$currentRow}", $p['email']);
            $sheet->getStyle("A{$currentRow}:B{$currentRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $currentRow++;
        }

        $currentRow++; // spacing
    }

    // Auto-size columns
    foreach (['A', 'B'] as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Align vertically
    $sheet->getStyle("A1:B{$currentRow}")->getAlignment()->setVertical(Alignment::VERTICAL_CENTER);

    // Filename
    $currentYear = date("Y");
    $currentDate = date("d-m-Y");
    $filename = "IMC{$currentYear}-Tshirts-{$currentDate}.xlsx";

    // Output XLSX
    if (ob_get_length()) {
        ob_end_clean();
    }
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
