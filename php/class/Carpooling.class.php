<?php

class CarpoolingManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getOffers($filters = []) {
        $where = ["co.status = 'open'"];
        $params = [];

        if (!empty($filters['departure_date'])) {
            $where[] = "co.departure_date = ?";
            $params[] = $filters['departure_date'];
        }

        if (!empty($filters['departure_location_key'])) {
            $where[] = "co.departure_location_key = ?";
            $params[] = $filters['departure_location_key'];
        }

        if (!empty($filters['include_all_statuses'])) {
            array_shift($where);
        }

        $whereClause = count($where) > 0 ? "WHERE " . implode(" AND ", $where) : "";

        $sql = "
            SELECT
                co.id,
                co.participant_id,
                co.departure_location_key,
                co.departure_location_custom,
                co.departure_date,
                co.departure_hour,
                co.departure_minute,
                co.destination,
                co.total_seats,
                co.luggage_capacity,
                co.possible_detour,
                co.languages,
                co.comments,
                co.status,
                co.created_at,
                co.updated_at,
                p.first_name AS driver_first_name,
                p.last_name AS driver_last_name
            FROM carpooling_offers co
            JOIN participants p ON co.participant_id = p.id
            $whereClause
            ORDER BY co.departure_date ASC, co.departure_location_key ASC, co.departure_hour ASC, co.departure_minute ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOfferById($id) {
        $stmt = $this->pdo->prepare("
            SELECT
                co.*,
                p.first_name AS driver_first_name,
                p.last_name AS driver_last_name,
                p.email AS driver_email
            FROM carpooling_offers co
            JOIN participants p ON co.participant_id = p.id
            WHERE co.id = ?
        ");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createOffer($participantId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO carpooling_offers (
                participant_id, departure_location_key, departure_location_custom,
                departure_date, departure_hour, departure_minute,
                destination, total_seats, luggage_capacity,
                possible_detour, languages, comments, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $participantId,
            $data['departure_location_key'],
            $data['departure_location_custom'] ?? null,
            $data['departure_date'],
            $data['departure_hour'] ?? null,
            $data['departure_minute'] ?? null,
            $data['destination'] ?? 'Conference venue',
            intval($data['total_seats']),
            $data['luggage_capacity'] ?? 'unknown',
            !empty($data['possible_detour']) ? 1 : 0,
            $data['languages'] ?? null,
            $data['comments'] ?? null,
            $data['status'] ?? 'open',
        ]);

        return $this->pdo->lastInsertId();
    }

    public function updateOffer($id, $participantId, $data, $isAdmin = false) {
        $offer = $this->getOfferById($id);
        if (!$offer) {
            throw new Exception("Offer not found");
        }

        if (!$isAdmin && intval($offer['participant_id']) !== intval($participantId)) {
            throw new Exception("You can only edit your own offers");
        }

        $stmt = $this->pdo->prepare("
            UPDATE carpooling_offers SET
                departure_location_key = ?,
                departure_location_custom = ?,
                departure_date = ?,
                departure_hour = ?,
                departure_minute = ?,
                destination = ?,
                total_seats = ?,
                luggage_capacity = ?,
                possible_detour = ?,
                languages = ?,
                comments = ?,
                status = ?,
                updated_at = NOW()
            WHERE id = ?
        ");

        $stmt->execute([
            $data['departure_location_key'],
            $data['departure_location_custom'] ?? null,
            $data['departure_date'],
            $data['departure_hour'] ?? null,
            $data['departure_minute'] ?? null,
            $data['destination'] ?? 'Conference venue',
            intval($data['total_seats']),
            $data['luggage_capacity'] ?? 'unknown',
            !empty($data['possible_detour']) ? 1 : 0,
            $data['languages'] ?? null,
            $data['comments'] ?? null,
            $data['status'] ?? 'open',
            $id,
        ]);
    }

    public function deleteOffer($id, $participantId, $isAdmin = false) {
        $offer = $this->getOfferById($id);
        if (!$offer) {
            throw new Exception("Offer not found");
        }

        if (!$isAdmin && intval($offer['participant_id']) !== intval($participantId)) {
            throw new Exception("You can only delete your own offers");
        }

        $stmt = $this->pdo->prepare("DELETE FROM carpooling_offers WHERE id = ?");
        $stmt->execute([$id]);
    }
}
