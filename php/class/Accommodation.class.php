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
                p.country,
                p.organization,
                p.comments,
                p.confirmation_sent,
                r.id AS registration_type_id,
                r.type AS registration_type
            FROM participants p
            JOIN accommodation a ON p.id = a.participant_id
            JOIN registration_types r ON a.registration_type_id = r.id
            WHERE 1
            ";

        // Modify the WHERE clause based on $typeFilter
        if ($typeFilter === 'no') {
            $sql .= " AND r.type = 'no'"; // Only participants with 'no' accommodation
        } else {
            $sql .= " AND r.type != 'no'"; // Only participants with valid registration types (not 'no')
        }

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


    public function gatAvailableRooms() {
        // SQL query to calculate available rooms per registration type
        $sql = "
            SELECT 
                r.id AS registration_type_id,
                r.type AS registration_type,
                r.total AS total_rooms,
                IFNULL(r.total, 0) - 
                    CASE 
                        WHEN r.type = 'single' THEN IFNULL(COUNT(a.id), 0)
                        WHEN r.type = 'double' THEN IFNULL(COUNT(a.id), 0) / 2
                        WHEN r.type = 'quadruple' THEN IFNULL(COUNT(a.id), 0) / 4
                        ELSE 0
                    END AS available_rooms
            FROM registration_types r
            LEFT JOIN accommodation a ON r.id = a.registration_type_id
            GROUP BY r.id
            ORDER BY r.type;
        ";
    
        // Prepare and execute the query
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
    
        // Return the fetched results as an associative array
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
