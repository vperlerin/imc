<?php

class FoodRestrictions
{
    /** @var PDO */
    private $pdo;

    /** @var string */
    private $table = 'participant_food_restrictions';

     const RESTRICTIONS = [
        'vegetarian',
        'vegan',
        'coeliac',
        'lactose_intolerant',
        'other',
    ];

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Returns restrictions for a participant.
     * Output example:
     * [
     *   ['restriction' => 'vegan', 'other_text' => null],
     *   ['restriction' => 'other', 'other_text' => 'no garlic']
     * ]
     */
    public function getByParticipantId($participantId)
    {
        $participantId = (int) $participantId;

        $sql = "
            SELECT restriction, other_text
            FROM {$this->table}
            WHERE participant_id = :participant_id
            ORDER BY created_at ASC, id ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([ ':participant_id' => $participantId ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Replace all restrictions for a participant (delete then insert).
     *
     * $items format:
     * [
     *   ['restriction' => 'vegan'],
     *   ['restriction' => 'other', 'other_text' => 'no garlic']
     * ]
     */
    public function setForParticipant($participantId, array $items)
    {
        $participantId = (int) $participantId;

        // Normalize + validate + remove duplicates by restriction
        $normalized = [];
        foreach ($items as $row) {
            $restriction = isset($row['restriction']) ? (string) $row['restriction'] : '';
            $restriction = trim($restriction);

            if ($restriction === '' || !in_array($restriction, self::RESTRICTIONS, true)) {
                throw new Exception("Invalid food restriction: " . $restriction);
            }

            $otherText = null;
            if ($restriction === 'other') {
                $otherText = isset($row['other_text']) ? trim((string) $row['other_text']) : '';
                if ($otherText === '') {
                    throw new Exception("other_text is required when restriction is 'other'.");
                }

                if (mb_strlen($otherText) > 255) {
                    $otherText = mb_substr($otherText, 0, 255);
                }
            }

             $normalized[$restriction] = [
                'restriction' => $restriction,
                'other_text'  => $otherText,
            ];
        }

        try {
            $this->pdo->beginTransaction();

            // 1) Delete existing
            $stmt = $this->pdo->prepare("
                DELETE FROM {$this->table}
                WHERE participant_id = :participant_id
            ");
            $stmt->execute([ ':participant_id' => $participantId ]);

            // 2) Insert new
            if (!empty($normalized)) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO {$this->table}
                        (participant_id, restriction, other_text, created_at)
                    VALUES
                        (:participant_id, :restriction, :other_text, NOW())
                ");

                foreach ($normalized as $row) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':restriction'    => $row['restriction'],
                        ':other_text'     => $row['other_text'],
                    ]);
                }
            }

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error saving participant food restrictions: " . $e->getMessage());
        }
    }

    /**
     * Deletes all restrictions for a participant.
     */
    public function clearForParticipant($participantId)
    {
        $participantId = (int) $participantId;

        $stmt = $this->pdo->prepare("
            DELETE FROM {$this->table}
            WHERE participant_id = :participant_id
        ");
        $stmt->execute([ ':participant_id' => $participantId ]);

        return true;
    }

    /**
     * Helper for UI/API: returns allowed restriction values.
     */
    public static function getAllowedRestrictions()
    {
        return self::RESTRICTIONS;
    }
}
