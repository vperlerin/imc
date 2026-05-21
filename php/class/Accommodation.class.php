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
}
