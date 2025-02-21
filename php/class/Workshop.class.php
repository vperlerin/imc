<?php


class WorkshopManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function saveWorkshops($participantId, $data) {
        if ($data['Spectroscopy Workshop'] === "true") {
            $this->pdo->prepare("INSERT INTO participant_workshops (participant_id, workshop_id, attending) VALUES (?, 1, TRUE)")
                ->execute([$participantId]);
        }
        if ($data['Radio Workshop'] === "true") {
            $this->pdo->prepare("INSERT INTO participant_workshops (participant_id, workshop_id, attending) VALUES (?, 2, TRUE)")
                ->execute([$participantId]);
        }
    }
}
