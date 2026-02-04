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
                r.type AS registration_type,

                -- aggregated food restrictions, one string per participant
                COALESCE(
                    GROUP_CONCAT(
                        DISTINCT
                        CASE
                            WHEN pfr.restriction = 'vegetarian' THEN 'Vegetarian'
                            WHEN pfr.restriction = 'vegan' THEN 'Vegan'
                            WHEN pfr.restriction = 'coeliac' THEN 'Coeliac (gluten-free)'
                            WHEN pfr.restriction = 'lactose_intolerant' THEN 'Lactose intolerant'
                            WHEN pfr.restriction = 'other' THEN CONCAT('Other: ', pfr.other_text)
                            ELSE pfr.restriction
                        END
                        ORDER BY
                            CASE pfr.restriction
                                WHEN 'vegetarian' THEN 1
                                WHEN 'vegan' THEN 2
                                WHEN 'coeliac' THEN 3
                                WHEN 'lactose_intolerant' THEN 4
                                WHEN 'other' THEN 5
                                ELSE 99
                            END
                        SEPARATOR ', '
                    ),
                    ''
                ) AS food_restrictions

            FROM participants p
            JOIN accommodation a ON p.id = a.participant_id
            JOIN registration_types r ON a.registration_type_id = r.id
            LEFT JOIN participant_food_restrictions pfr ON pfr.participant_id = p.id
            WHERE 1
        ";

        if ($typeFilter === 'no') {
            $sql .= " AND r.type = 'no'";
        } else {
            $sql .= " AND r.type != 'no'";
        }

        // Group by participant ID so we keep 1 row per participant and can aggregate restrictions
        $sql .= " GROUP BY p.id";

        // Order
        $sql .= " ORDER BY r.type ASC, p.confirmation_sent DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();

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
