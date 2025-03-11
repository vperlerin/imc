<?php

require_once __DIR__ . "/../config.php";

class WorkshopManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Get All Existing workshops
     */
    public function getWorkshops()
    {
        $stmt = $this->pdo->query("SELECT * FROM workshops");
        $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC); 
        return $workshops;
    }

    /**
     * Save participant workshops based on submitted data
     */
    public function saveWorkshops($participantId, $data)
    {
        // Get all available workshops
        $stmt = $this->pdo->query("SELECT id, title FROM workshops");
        $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Remove existing workshops for the participant to prevent duplicates
        $this->pdo->prepare("DELETE FROM participant_workshops WHERE participant_id = ?")
            ->execute([$participantId]);

        // Insert selected workshops
        $insertStmt = $this->pdo->prepare("
            INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
            VALUES (?, ?, TRUE)
        ");

        foreach ($workshops as $workshop) {
            if (!empty($data[$workshop['title']]) && $data[$workshop['title']] === "true") {
                $insertStmt->execute([$participantId, $workshop['id']]);
            }
        }
    }

    /**
     * Get participant workshops
     */
    public function getParticipantWorkshops($participantId)
    {
        $stmt = $this->pdo->prepare("
            SELECT w.id, w.title, w.price, w.price_online
            FROM participant_workshops pw
            JOIN workshops w ON pw.workshop_id = w.id
            WHERE pw.participant_id = ?
        ");
        $stmt->execute([$participantId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    /**
     * Get workshop details by ID
     * 
     * @param int $workshopId The ID of the workshop
     * @return array|null Returns an associative array with workshop details or null if not found
     */
    public function getWorkshopById($workshopId) {
        $sql = "SELECT id, title FROM workshops WHERE id = :workshop_id LIMIT 1";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':workshop_id', $workshopId, PDO::PARAM_INT);
        $stmt->execute();
        
        $workshop = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $workshop ?: null;
    }
}
