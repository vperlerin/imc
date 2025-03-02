<?php

class ContributionManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function saveContributions($participantId, $talks, $posters) {
        foreach ($talks as $talk) {
            $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration,  created_at, updated_at)
                VALUES (?, 'talk', ?, ?, ?, (SELECT id FROM imc_sessions WHERE name = ? LIMIT 1), ?, ?, NOW(), NOW())
            ")->execute([
                $participantId, $talk['title'], $talk['authors'], $talk['abstract'], $talk['session'], $talk['duration']
            ]);
        }

        foreach ($posters as $poster) {
            $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration,  created_at, updated_at)
                VALUES (?, 'poster', ?, ?, ?, (SELECT id FROM imc_sessions WHERE name = ? LIMIT 1), NULL, ?, NOW(), NOW())
            ")->execute([
                $participantId, $poster['title'], $poster['authors'], $poster['abstract'], $poster['session']
            ]);
        }
    }
}
