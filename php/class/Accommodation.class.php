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

    public function getParticipantsWithRegistrationDetails($typeFilter) {
        $sql = "
            SELECT 
                p.id, 
                p.title, 
                p.first_name, 
                p.last_name, 
                r.*   
            FROM participants p
            JOIN accommodation a ON p.id = a.participant_id
            JOIN registration_types r ON a.registration_type_id = r.id
            WHERE r.type " . ($typeFilter === 'no' ? "= 'no'" : "!= 'no'");

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

 
}
