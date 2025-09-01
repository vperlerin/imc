<?php
/**
 * doc_arrival.php
 * Exports an Excel file titled "Arrival..." with columns:
 * Title | First name | Last name | Gender | Time of Arrival | Time of Departure | Accomodation
 * 
 * Uses your existing ParticipantManager. If the helper method
 * getAllParticipantsForArrivalList() is present, it will use it.
 * Otherwise, it falls back to a local query.
 */

// --- CORS (same pattern as your other scripts) ---
$allowed_origins = [
    "https://imc2025.imo.net",
    "http://localhost:3000"
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

try {
    $pdo = Connect::getPDO();
} catch (Exception $e) {
    die($e->getMessage());
}

$pm = new ParticipantManager($pdo);

// --- Helper: fetch rows (prefer class method if available) ---
function fetchArrivalRows(PDO $pdo, ParticipantManager $pm): array
{
    if (method_exists($pm, 'getAllParticipantsForArrivalList')) {
        return $pm->getAllParticipantsForArrivalList();
    }

    // Fallback query if the method is not added to ParticipantManager yet
    $sql = "
        SELECT
            p.title,
            p.first_name,
            p.last_name,
            p.gender,
            ar.arrival_date,
            ar.arrival_hour,
            ar.arrival_minute,
            ar.departure_date,
            ar.departure_hour,
            ar.departure_minute,
            CASE
                WHEN rt.description IS NULL OR rt.description = '' THEN 'NO'
                ELSE rt.description
            END AS accomodation
        FROM participants p
        LEFT JOIN arrival ar ON ar.participant_id = p.id
        LEFT JOIN accommodation acc ON acc.participant_id = p.id
        LEFT JOIN registration_types rt ON acc.registration_type_id = rt.id
        WHERE p.status = 'active'
        ORDER BY p.last_name, p.first_name
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// --- Helper: format "YYYY-MM-DD HH:MM" from separate parts ---
function formatDateTimeParts($date, $hour, $minute): string
{
    if (empty($date)) return '';
    $h = ($hour === null || $hour === '') ? '' : str_pad((string)$hour, 2, '0', STR_PAD_LEFT);
    $m = ($minute === null || $minute === '') ? '00' : str_pad((string)$minute, 2, '0', STR_PAD_LEFT);
    return $h === '' ? $date : ($date . ' ' . $h . ':' . $m);
}

$rows = fetchArrivalRows($pdo, $pm);

// --- Spreadsheet ---
$currentYear = date("Y");
$currentDate = date("Y-m-d");
$fileName = "IMC{$currentYear}-Arrival-{$currentDate}.xlsx";

$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("Arrival...")
    ->setSubject("Arrivals / Departures")
    ->setDescription("Arrival list export.")
    ->setCategory("Logistics");

// Use default first sheet
$sheet = $spreadsheet->getActiveSheet();
$sheet->setTitle("Arrivals");

// Headers (exact labels & order requested)
$headers = [
    "Title",
    "First name",
    "Last name",
    "Gender",
    "Time of Arrival",
    "Time of Departure",
    "Accomodation" // (spelled as requested)
];
$sheet->fromArray([$headers], null, 'A1');

// Header style
$headerStyle = [
    'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
    'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
    'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
    'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
];
$sheet->getStyle('A1:G1')->applyFromArray($headerStyle);

// Data rows
$data = [];
foreach ($rows as $r) {
    $arrival = formatDateTimeParts($r['arrival_date'] ?? '', $r['arrival_hour'] ?? '', $r['arrival_minute'] ?? '');
    $depart  = formatDateTimeParts($r['departure_date'] ?? '', $r['departure_hour'] ?? '', $r['departure_minute'] ?? '');

    $data[] = [
        $r['title'] ?? '',
        $r['first_name'] ?? '',
        $r['last_name'] ?? '',
        $r['gender'] ?? '',
        $arrival,
        $depart,
        $r['accomodation'] ?? 'NO',
    ];
}
if (!empty($data)) {
    $sheet->fromArray($data, null, 'A2');
}

// Auto-size columns
foreach (range('A', 'G') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}

// --- Output ---
ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
