<?php
/**
 * doc_online_confirmed.php
 * Exports an Excel file titled "IMC{YYYY}-Online-Confirmed-{YYYY-MM-DD}.xlsx"
 * Columns: Title | First name | Last name | Email | Organization | Email (for copy-paste)
 *
 * Rules:
 * - ONLY ONLINE participants: p.is_online = 1
 * - ONLY CONFIRMED participants: p.confirmation_sent = 1
 * - Sort by Last name, then First name (A→Z)
 */

// --- CORS ---
$allowed_origins = [
    "https://imc2026.imo.net",
    "http://localhost:3000",
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

// --- Includes ---
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/class/Connect.class.php";
require_once __DIR__ . "/class/Participant.class.php";
require __DIR__ . "/../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

// --- DB ---
try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage());
}

// --- Fetch rows ---
$sql = "
    SELECT
        p.title,
        p.first_name,
        p.last_name,
        p.email,
        p.organization
    FROM participants p
    WHERE p.is_online = 1
      AND p.confirmation_sent = 1
    ORDER BY p.last_name ASC, p.first_name ASC
";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// --- Spreadsheet metadata ---
$currentYear = date('Y');
$currentDate = date('Y-m-d');
$fileName = "IMC{$currentYear}-Online-Confirmed-{$currentDate}.xlsx";

$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("Online Confirmed Participants")
    ->setSubject("Online Participants")
    ->setDescription("Confirmed online participants export.")
    ->setCategory("Registration");

$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("Online Confirmed");

// --- Headers ---
$headers = [
    "Title",
    "First name",
    "Last name",
    "Email",
    "Organization",
    "Email (copy-paste)",
];
$sheet->fromArray([$headers], null, 'A2');

// Header style
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]],
];
$sheet->getStyle('A2:F2')->applyFromArray($headerStyle);

// --- Data rows ---
$data = [];
$allEmails = [];
foreach ($rows as $r) {
    $email = $r['email'] ?? '';
    if ($email !== '') {
        $allEmails[] = $email;
    }

    $data[] = [
        $r['title'] ?? '',
        $r['first_name'] ?? '',
        $r['last_name'] ?? '',
        $email,
        $r['organization'] ?? '',
        $email,
    ];
}
if (!empty($data)) {
    $sheet->fromArray($data, null, 'A3');
}

// --- Master email list in first row ---
if (!empty($allEmails)) {
    $sheet->setCellValue('A1', 'All emails (copy-paste)');
    $sheet->mergeCells('B1:F1');
    $sheet->setCellValue('B1', implode(', ', $allEmails));
    $sheet->getStyle('A1:B1')->getFont()->setBold(true);
}

// --- Auto-size columns ---
foreach (range('A', 'F') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// --- Output ---
if (function_exists('ob_get_level') && ob_get_level() > 0) {
    ob_end_clean();
}
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
