<?php

class DashboardManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getDashboardData() {
        $query = "
            -- Fetch unconfirmed online participants
            SELECT id, first_name, last_name, title, confirmation_sent, confirmation_date
            FROM participants
            WHERE is_online = TRUE AND (confirmation_sent = FALSE OR confirmation_date IS NULL)
            ORDER BY COALESCE(updated_at, created_at) DESC;
            
            -- Fetch unconfirmed onsite participants
            SELECT id, first_name, last_name, title, confirmation_sent, confirmation_date
            FROM participants
            WHERE is_online = FALSE AND (confirmation_sent = FALSE OR confirmation_date IS NULL)
            ORDER BY COALESCE(updated_at, created_at) DESC;

            -- Count confirmed online participants
            SELECT 
                COUNT(*) AS confirmed_online
            FROM participants
            WHERE is_online = TRUE AND confirmation_sent = TRUE AND confirmation_date IS NOT NULL;

            -- Count unconfirmed online participants
            SELECT 
                COUNT(*) AS unconfirmed_online
            FROM participants
            WHERE is_online = TRUE AND confirmation_sent = FALSE;

            -- Count confirmed onsite participants
            SELECT 
                COUNT(*) AS confirmed_onsite
            FROM participants
            WHERE is_online = FALSE AND confirmation_sent = TRUE AND confirmation_date IS NOT NULL;

            -- Count unconfirmed onsite participants
            SELECT 
                COUNT(*) AS unconfirmed_onsite
            FROM participants
            WHERE is_online = FALSE AND confirmation_sent = FALSE;

            -- Count workshop attendees (confirmed and unconfirmed)
            SELECT 
                w.title AS workshop_title,
                SUM(CASE WHEN p.confirmation_sent = TRUE THEN 1 ELSE 0 END) AS confirmed_participants,
                SUM(CASE WHEN p.confirmation_sent = FALSE THEN 1 ELSE 0 END) AS unconfirmed_participants
            FROM workshops w
            LEFT JOIN participant_workshops pw ON w.id = pw.workshop_id
            LEFT JOIN participants p ON pw.participant_id = p.id AND p.is_online = TRUE
            GROUP BY w.title;
        ";

        $this->pdo->beginTransaction();

        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute();

            // Fetch results
            $onlineUnconfirmed = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->nextRowset();
            $onsiteUnconfirmed = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->nextRowset();
            $confirmedOnline = $stmt->fetch(PDO::FETCH_ASSOC)['confirmed_online'] ?? 0;
            $stmt->nextRowset();
            $unconfirmedOnline = $stmt->fetch(PDO::FETCH_ASSOC)['unconfirmed_online'] ?? 0;
            $stmt->nextRowset();
            $confirmedOnsite = $stmt->fetch(PDO::FETCH_ASSOC)['confirmed_onsite'] ?? 0;
            $stmt->nextRowset();
            $unconfirmedOnsite = $stmt->fetch(PDO::FETCH_ASSOC)['unconfirmed_onsite'] ?? 0;
            $stmt->nextRowset();
            $workshopStats = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $this->pdo->commit();

            return [
                "online_unconfirmed" => $onlineUnconfirmed,
                "onsite_unconfirmed" => $onsiteUnconfirmed,
                "confirmed_online" => $confirmedOnline,
                "unconfirmed_online" => $unconfirmedOnline,
                "confirmed_onsite" => $confirmedOnsite,
                "unconfirmed_onsite" => $unconfirmedOnsite,
                "workshop_stats" => $workshopStats
            ];
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error fetching dashboard data: " . $e->getMessage());
        }
    }
}
