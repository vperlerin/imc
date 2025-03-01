<?php

class AccommodationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function saveAccommodation($participantId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO accommodation (participant_id, registration_type_id, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())
        ");
        $stmt->execute([$participantId, $data['registration_type']]);
    }
 
}
