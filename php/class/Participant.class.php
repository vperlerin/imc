<?php
require_once __DIR__ . "/class/Connect.class.php";

class ParticipantManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Inserts a new participant into the database.
     */
    public function saveParticipant($data, $passwordHash) {
        $stmt = $this->pdo->prepare("
            INSERT INTO participants (
                title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, 
                organization, admin_notes, is_online, is_early_bird, confirmation_sent, confirmation_date, 
                password_hash, total_due, total_paid, status, deleted_at, comments, guardian_name, 
                guardian_contact, guardian_email, created_at, updated_at
            ) VALUES (
                :title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, 
                :organization, :admin_notes, :is_online, :is_early_bird, :confirmation_sent, :confirmation_date, 
                :password_hash, :total_due, :total_paid, 'active', NULL, :comments, :guardian_name, 
                :guardian_contact, :guardian_email, NOW(), NOW()
            )
        ");

        $stmt->execute([
            ':title' => $data['title'],
            ':first_name' => $data['firstName'],
            ':last_name' => $data['lastName'],
            ':gender' => $data['gender'],
            ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':address' => $data['address'],
            ':postal_code' => $data['postal_code'],
            ':city' => $data['city'],
            ':country' => $data['country'],
            ':organization' => $data['organization'] ?? null,
            ':admin_notes' => $data['admin_notes'] ?? null,
            ':is_online' => isset($data['is_online']) ? filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN) : false,
            ':is_early_bird' => isset($data['is_early_bird']) ? filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN) : false,
            ':confirmation_sent' => isset($data['confirmation_sent']) ? filter_var($data['confirmation_sent'], FILTER_VALIDATE_BOOLEAN) : false,
            ':confirmation_date' => !empty($data['confirmation_date']) ? $data['confirmation_date'] : null,
            ':password_hash' => $passwordHash,
            ':total_due' => isset($data['total_due']) ? $data['total_due'] : 0.00,
            ':total_paid' => isset($data['total_paid']) ? $data['total_paid'] : 0.00,
            ':comments' => $data['comments'] ?? null,
            ':guardian_name' => $data['guardian_name'] ?? null,
            ':guardian_contact' => $data['guardian_contact'] ?? null,
            ':guardian_email' => $data['guardian_email'] ?? null
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Updates participant details.
     */
    public function updateParticipant($participantId, $data) {
        $stmt = $this->pdo->prepare("
            UPDATE participants
            SET title = :title,
                first_name = :first_name,
                last_name = :last_name,
                gender = :gender,
                dob = :dob,
                email = :email,
                phone = :phone,
                address = :address,
                postal_code = :postal_code,
                city = :city,
                country = :country,
                organization = :organization,
                admin_notes = :admin_notes,
                is_online = :is_online,
                is_early_bird = :is_early_bird,
                confirmation_sent = :confirmation_sent,
                confirmation_date = :confirmation_date,
                total_due = :total_due,
                total_paid = :total_paid,
                comments = :comments,
                guardian_name = :guardian_name,
                guardian_contact = :guardian_contact,
                guardian_email = :guardian_email,
                updated_at = NOW()
            WHERE id = :id AND status = 'active'
        ");

        $stmt->execute([
            ':id' => $participantId,
            ':title' => $data['title'],
            ':first_name' => $data['firstName'],
            ':last_name' => $data['lastName'],
            ':gender' => $data['gender'],
            ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':address' => $data['address'],
            ':postal_code' => $data['postal_code'],
            ':city' => $data['city'],
            ':country' => $data['country'],
            ':organization' => $data['organization'] ?? null,
            ':admin_notes' => $data['admin_notes'] ?? null,
            ':is_online' => isset($data['is_online']) ? filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN) : false,
            ':is_early_bird' => isset($data['is_early_bird']) ? filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN) : false,
            ':confirmation_sent' => isset($data['confirmation_sent']) ? filter_var($data['confirmation_sent'], FILTER_VALIDATE_BOOLEAN) : false,
            ':confirmation_date' => !empty($data['confirmation_date']) ? $data['confirmation_date'] : null,
            ':total_due' => isset($data['total_due']) ? $data['total_due'] : 0.00,
            ':total_paid' => isset($data['total_paid']) ? $data['total_paid'] : 0.00,
            ':comments' => $data['comments'] ?? null,
            ':guardian_name' => $data['guardian_name'] ?? null,
            ':guardian_contact' => $data['guardian_contact'] ?? null,
            ':guardian_email' => $data['guardian_email'] ?? null
        ]);

        return $stmt->rowCount() > 0;
    }

    /**
     * Marks confirmation_sent as TRUE and sets confirmation_date to current timestamp.
     */
    public function markConfirmationSent($participantId) {
        $stmt = $this->pdo->prepare("
            UPDATE participants
            SET confirmation_sent = TRUE, confirmation_date = NOW(), updated_at = NOW()
            WHERE id = :id AND status = 'active'
        ");

        $stmt->execute([':id' => $participantId]);

        return $stmt->rowCount() > 0;
    }
}
