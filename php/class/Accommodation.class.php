<?php

class AccommodationManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function saveAccommodation($participantId, $data)
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO accommodation (participant_id, registration_type_id, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())
        ");
        $stmt->execute([$participantId, $data['registration_type']]);
    }

 
    public function getParticipantsWithRegistrationDetails($typeFilter)
    {
        // Define the query with the correct conditions
        $sql = "
        SELECT DISTINCT
            p.id AS participant_id,
            p.first_name,
            p.last_name,
            p.email,
            p.created_at,
            r.id AS registration_type_id,
            r.type AS registration_type
        FROM participants p
        JOIN accommodation a ON p.id = a.participant_id
        JOIN registration_types r ON a.registration_type_id = r.id
        WHERE 1
        ";
    
        // Modify the WHERE clause based on the typeFilter
        if ($typeFilter === 'no') {
            $sql .= " AND r.type = 'no'"; // Filter for 'no' registration type
        } else {
            $sql .= " AND r.type != 'no'"; // Filter for non-'no' registration types
        }
    
        // Add ordering by registration type
        $sql .= " ORDER BY r.type ASC";
    
        // Prepare and execute the query
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
    
        // Return the fetched results
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
