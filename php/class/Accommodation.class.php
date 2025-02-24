<?php

class AccommodationManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function saveAccommodation($participantId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO participant_accommodation (participant_id, registration_type_id, created_at, updated_at)
            VALUES (?, (SELECT id FROM registration_types WHERE type = ? LIMIT 1), NOW(), NOW())
        ");
        $stmt->execute([$participantId, $data['registration_type']]);
    }
}
