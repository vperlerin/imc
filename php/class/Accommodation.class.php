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
        // Define the base query with necessary joins
        $sql = "
        SELECT
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
    
        // Add condition for $typeFilter
        if ($typeFilter === 'no') {
            $sql .= " AND r.type = 'no'"; // Only participants with 'no' accommodation
        } else {
            $sql .= " AND r.type != 'no'"; // Only participants with valid registration types (not 'no')
        }
    
        // Remove any conditions implicitly filtering unconfirmed participants
        // Ensure that all participants are included, even those without confirmation
        // Do NOT filter out based on confirmation_sent
        // For now, we're not including any WHERE clause on confirmation_sent, but you can add it if needed
    
        // Remove duplicate participants based on their ID
        $sql .= " GROUP BY p.id"; // Group by participant ID to avoid duplicates
    
        // Order the results by registration type
        $sql .= " ORDER BY r.type ASC";
    
        // Prepare and execute the query
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
    
        // Return the fetched results
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    
    
}
