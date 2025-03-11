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
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, created_at, updated_at)
                VALUES (?, 'talk', ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            $stmt->execute([
                $participantId,
                $talk['title'],
                $talk['authors'],
                $talk['abstract'],
                $talk['session'],
                $talk['duration']
            ]);
        }

        foreach ($posters as $poster) {
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, print, created_at, updated_at)
                VALUES (?, 'poster', ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            $stmt->execute([
                $participantId,
                $poster['title'],
                $poster['authors'],
                $poster['abstract'],
                $poster['session'],
                isset($poster['print']) ? (filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0
            ]);
        }
    }

    public function updateContributions($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();
 
            $stmtCheck = $this->pdo->prepare("SELECT COUNT(*) FROM contributions WHERE participant_id = ?");
            $stmtCheck->execute([$participantId]);
            if ($stmtCheck->fetchColumn() > 0) {
                $stmtDelete = $this->pdo->prepare("DELETE FROM contributions WHERE participant_id = ?");
                $stmtDelete->execute([$participantId]);
            }
 
            if (!empty($data['talks']) && is_array($data['talks'])) {
                $stmtTalk = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                    VALUES (?, 'talk', ?, ?, ?, ?, ?, 0, NOW(), NOW())
                ");

                foreach ($data['talks'] as $talk) {
                    $stmtTalk->execute([
                        $participantId,
                        $talk['title'],
                        $talk['authors'],
                        $talk['abstract'],
                        isset($talk['session_id']) ? (int) $talk['session_id'] : NULL,
                        isset($talk['duration']) ? $talk['duration'] : NULL
                    ]);
                }
            }
 
            if (!empty($data['posters']) && is_array($data['posters'])) {
                $stmtPoster = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, print, created_at, updated_at)
                    VALUES (?, 'poster', ?, ?, ?, ?, ?, NOW(), NOW())
                ");

                foreach ($data['posters'] as $poster) {
                    $stmtPoster->execute([
                        $participantId,
                        $poster['title'],
                        $poster['authors'],
                        $poster['abstract'],
                        isset($poster['session_id']) ? (int) $poster['session_id'] : NULL,
                        isset($poster['print']) ? (filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0
                    ]);
                }
            }

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Failed to update contributions: " . $e->getMessage());
        }
    }

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
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, created_at, updated_at)
                VALUES (?, 'talk', ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            $stmt->execute([
                $participantId,
                $talk['title'],
                $talk['authors'],
                $talk['abstract'],
                $talk['session'],
                $talk['duration']
            ]);
        }

        foreach ($posters as $poster) {
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, print, created_at, updated_at)
                VALUES (?, 'poster', ?, ?, ?, ?, ?, NOW(), NOW())
            ");
            $stmt->execute([
                $participantId,
                $poster['title'],
                $poster['authors'],
                $poster['abstract'],
                $poster['session'],
                isset($poster['print']) ? (filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0
            ]);
        }
    }

    public function updateContributions($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();

            $stmtCheck = $this->pdo->prepare("SELECT COUNT(*) FROM contributions WHERE participant_id = ?");
            $stmtCheck->execute([$participantId]);
            if ($stmtCheck->fetchColumn() > 0) {
                $stmtDelete = $this->pdo->prepare("DELETE FROM contributions WHERE participant_id = ?");
                $stmtDelete->execute([$participantId]);
            }

            if (!empty($data['talks']) && is_array($data['talks'])) {
                $stmtTalk = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                    VALUES (?, 'talk', ?, ?, ?, ?, ?, 0, NOW(), NOW())
                ");

                foreach ($data['talks'] as $talk) {
                    $stmtTalk->execute([
                        $participantId,
                        $talk['title'],
                        $talk['authors'],
                        $talk['abstract'],
                        isset($talk['session_id']) ? (int) $talk['session_id'] : NULL,
                        isset($talk['duration']) ? $talk['duration'] : NULL
                    ]);
                }
            }

            if (!empty($data['posters']) && is_array($data['posters'])) {
                $stmtPoster = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, print, created_at, updated_at)
                    VALUES (?, 'poster', ?, ?, ?, ?, ?, NOW(), NOW())
                ");

                foreach ($data['posters'] as $poster) {
                    $stmtPoster->execute([
                        $participantId,
                        $poster['title'],
                        $poster['authors'],
                        $poster['abstract'],
                        isset($poster['session_id']) ? (int) $poster['session_id'] : NULL,
                        isset($poster['print']) ? (filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 0
                    ]);
                }
            }

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Failed to update contributions: " . $e->getMessage());
        }
    }

    public function getAllTalks()
    {
        try {
            $stmt = $this->pdo->prepare("
                SELECT 
                    s.name AS session_name,
                    c.title AS talk_title,
                    p.id AS participant_id,
                    p.first_name,
                    p.last_name,
                    p.confirmation_sent
                FROM contributions c
                JOIN participants p ON c.participant_id = p.id
                JOIN imc_sessions s ON c.session_id = s.id
                WHERE c.type = 'talk'
                ORDER BY s.name, c.title;
            ");

            $stmt->execute();
            $talks = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Group talks by session
            $groupedTalks = [];
            foreach ($talks as $talk) {
                $session = $talk['session_name'];
                unset($talk['session_name']);

                if (!isset($groupedTalks[$session])) {
                    $groupedTalks[$session] = [];
                }
                $groupedTalks[$session][] = $talk;
            }

            return $groupedTalks;
        } catch (Exception $e) {
            throw new Exception("Failed to fetch talks: " . $e->getMessage());
        }
    }


    public function getAllPosters()
    {
        try {
            $stmt = $this->pdo->prepare("
                SELECT 
                    s.name AS session_name,
                    c.title AS talk_title,
                    p.id AS participant_id,
                    p.first_name,
                    p.last_name,
                    p.confirmation_sent
                FROM contributions c
                JOIN participants p ON c.participant_id = p.id
                JOIN imc_sessions s ON c.session_id = s.id
                WHERE c.type = 'poster'
                ORDER BY s.name, c.title;
            ");

            $stmt->execute();
            $talks = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Group talks by session
            $groupedTalks = [];
            foreach ($talks as $talk) {
                $session = $talk['session_name'];
                unset($talk['session_name']);

                if (!isset($groupedTalks[$session])) {
                    $groupedTalks[$session] = [];
                }
                $groupedTalks[$session][] = $talk;
            }

            return $groupedTalks;
        } catch (Exception $e) {
            throw new Exception("Failed to fetch talks: " . $e->getMessage());
        }
    }
}

}
