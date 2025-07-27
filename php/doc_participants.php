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

// Initialize participant manager
$participantManager = new ParticipantManager($pdo);
$participants = $participantManager->getAllParticipants($pdo);

// Separate Online and Onsite participants (ensure indexed arrays)
$onlineParticipants = array_values(array_filter($participants, function ($p) {
    return isset($p["is_online"]) && $p["is_online"] == "1";
}));
$onsiteParticipants = array_values(array_filter($participants, function ($p) {
    return isset($p["is_online"]) && $p["is_online"] == "0";
}));

// Get current year and date
$currentYear = date("Y");
$currentDate = date("d-m-Y");

// Generate filename
$fileName = "IMC{$currentYear}-Participants-Finance-{$currentDate}.xlsx";

// Create new Spreadsheet
$spreadsheet = new Spreadsheet();
$spreadsheet->getProperties()
    ->setCreator("IMC {$currentYear}")
    ->setLastModifiedBy("IMC {$currentYear}")
    ->setTitle("IMC Participants {$currentYear}")
    ->setSubject("Participants List")
    ->setDescription("Excel export for participant data.")
    ->setKeywords("conference participants export")
    ->setCategory("Participant Data");

// Remove the default empty sheet
$spreadsheet->removeSheetByIndex(0);

/**
 * Create a sheet with participant data
 */
function createSheet($spreadsheet, $sheetName, $participants, $includeAccommodation = false)
{
    if (empty($participants)) {
        return; // Skip empty sheets
    }

    // Create a new sheet
    $sheet = $spreadsheet->createSheet();
    $sheet->setTitle($sheetName);
    $spreadsheet->setActiveSheetIndex($spreadsheet->getIndex($sheet)); // Ensure it's active

    // Define column headers
    $headers = ["Full Name", "Email", "Country", "Confirmed", "Total Due", "Total Paid", "Remaining Due", "Payment Method", "Comments"];
    if ($includeAccommodation) {
        $headers[] = "Accommodation"; // Add accommodation column for onsite participants
    }

    // Write headers
    $sheet->fromArray([$headers], NULL, 'A1');

    // Apply header styles
    $headerStyle = [
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => '4F81BD']],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['bottom' => ['borderStyle' => Border::BORDER_THIN]]
    ];
    $sheet->getStyle('A1:' . \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($headers)) . '1')
        ->applyFromArray($headerStyle);

    // Insert participant data
    $dataRows = [];
    foreach ($participants as $p) {
        if (!isset($p["first_name"], $p["last_name"], $p["email"], $p["country"])) {
            continue; // Skip if required fields are missing
        }

        // Format full name
        $fullName = trim("{$p['title']} {$p['last_name']} {$p['first_name']}");

        // Confirmation status
        $confirmedStatus = isset($p["confirmation_sent"]) && $p["confirmation_sent"] == "1" ? "YES" : "NO";

        // Compute totals
        $totalDue = isset($p["total_due"]) ? $p["total_due"] : 0;
        $totalPaid = isset($p["total_paid"]) ? $p["total_paid"] : 0;
        $remainingDue = $totalDue - $totalPaid;
        $paymentMethod = isset($p["payment_method_name"]) ? $p["payment_method_name"] : "n/a";

        // Get participant comments
        $comments = isset($p["comments"]) ? $p["comments"] : "n/a";

        // Create row data
        $dataRow = [
            $fullName,
            $p["email"],
            $p["country"],
            $confirmedStatus,
            number_format($totalDue, 2) . "€",
            number_format($totalPaid, 2) . "€",
            number_format($remainingDue, 2) . "€",
            $paymentMethod,
            $comments
        ];

        if ($includeAccommodation) {
            $dataRow[] = $p["accommodation"] ?? "Not Assigned"; // Handle missing accommodation
        }

        $dataRows[] = $dataRow;
    }

    // Write data rows
    if (!empty($dataRows)) {
        $sheet->fromArray($dataRows, NULL, 'A2'); // Start data from row 2
    }

    // Auto-size columns for better readability
    $columnCount = count($headers);
    for ($i = 1; $i <= $columnCount; $i++) {
        $col = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($i);
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }
}

// Only create "Onsite Participants" sheet if they exist
if (!empty($onsiteParticipants)) {
    createSheet($spreadsheet, "Onsite Participants", $onsiteParticipants, true);
}

// Only create "Online Participants" sheet if they exist
if (!empty($onlineParticipants)) {
    createSheet($spreadsheet, "Online Participants", $onlineParticipants);
}

// Ensure at least one sheet exists
if ($spreadsheet->getSheetCount() == 0) {
    $spreadsheet->createSheet()->setTitle("No Participants");
    $spreadsheet->setActiveSheetIndex(0);
    $spreadsheet->getActiveSheet()->setCellValue('A1', 'No participants found.');
}

// Set the first sheet as active
$spreadsheet->setActiveSheetIndex(0);

ob_end_clean();
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$fileName\"");
header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);
$writer->save("php://output");
exit;
