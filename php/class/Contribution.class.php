<?php

class ContributionManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function saveContributions($participantId, $talks, $posters)
    {
        foreach ($talks as $talk) {
            $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration,  created_at, updated_at)
                VALUES (?, 'talk', ?, ?, ?, (SELECT id FROM imc_sessions WHERE name = ? LIMIT 1), ?, ?, NOW(), NOW())
            ")->execute([
                $participantId,
                $talk['title'],
                $talk['authors'],
                $talk['abstract'],
                $talk['session'],
                $talk['duration']
            ]);
        }

        foreach ($posters as $poster) {
            $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration,  created_at, updated_at)
                VALUES (?, 'poster', ?, ?, ?, (SELECT id FROM imc_sessions WHERE name = ? LIMIT 1), NULL, ?, NOW(), NOW())
            ")->execute([
                $participantId,
                $poster['title'],
                $poster['authors'],
                $poster['abstract'],
                $poster['session']
            ]);
        }
    }


    public function updateContributions($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();

            $stmt = $this->pdo->prepare("DELETE FROM contributions WHERE participant_id = ?");
            $stmt->execute([$participantId]);

            if (!empty($data['talks']) && is_array($data['talks'])) {
                $stmtTalk = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                    VALUES (?, 'talk', ?, ?, ?, ?, ?, 0, NOW(), NOW())
                ");

                foreach ($data['talks'] as $talk) {
                    $sessionId = isset($talk['session']) ? (int) $talk['session'] : NULL;
                    $duration = isset($talk['duration']) ? $talk['duration'] : NULL;

                    $stmtTalk->execute([
                        $participantId,
                        $talk['title'],
                        $talk['authors'],
                        $talk['abstract'],
                        $sessionId,
                        $duration
                    ]);
                }
            }

            if (!empty($data['posters']) && is_array($data['posters'])) {
                $stmtPoster = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                    VALUES (?, 'poster', ?, ?, ?, ?, NULL, ?, NOW(), NOW())
                ");

                foreach ($data['posters'] as $poster) {
                    $printValue = isset($poster['print']) ? (filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ? 1 : 0) : 0;
                    $sessionId = isset($poster['session']) ? (int) $poster['session'] : NULL;

                    $stmtPoster->execute([
                        $participantId,
                        $poster['title'],
                        $poster['authors'],
                        $poster['abstract'],
                        $sessionId,
                        $printValue
                    ]);
                }
            }

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Failed to update contributions: " . $e->getMessage());
        }
    }
}
