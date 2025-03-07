<?php

class ArrivalManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function saveArrivalDetails($participantId, $data) { 
        $travellingDetails = isset($data['travelling_details']) && trim($data['travelling_details']) !== '' 
            ? $data['travelling_details'] 
            : null;

        $stmt = $this->pdo->prepare("
            INSERT INTO arrival (
                participant_id, arrival_date, arrival_hour, arrival_minute, 
                departure_date, departure_hour, departure_minute, 
                travelling, travelling_details, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ");

        $stmt->execute([
            $participantId, 
            $data['arrival_date'], $data['arrival_hour'], $data['arrival_minute'],
            $data['departure_date'], $data['departure_hour'], $data['departure_minute'],
            $data['travelling'], $travellingDetails
        ]);
    }

    public function updateArrival($participantId, $data) {
        $travellingDetails = isset($data['travelling_details']) && trim($data['travelling_details']) !== '' 
            ? $data['travelling_details'] 
            : null;

        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM arrival WHERE participant_id = ?");
        $stmt->execute([$participantId]);
        $exists = $stmt->fetchColumn();

        if ($exists) { 
            $stmt = $this->pdo->prepare("
                UPDATE arrival 
                SET arrival_date = ?, arrival_hour = ?, arrival_minute = ?, 
                    departure_date = ?, departure_hour = ?, departure_minute = ?, 
                    travelling = ?, travelling_details = ?, updated_at = NOW()
                WHERE participant_id = ?
            ");
            $stmt->execute([
                $data['arrival_date'], $data['arrival_hour'], $data['arrival_minute'],
                $data['departure_date'], $data['departure_hour'], $data['departure_minute'],
                $data['travelling'], $travellingDetails,
                $participantId
            ]);
        } else { 
            $this->saveArrivalDetails($participantId, $data);
        }
    }
}
