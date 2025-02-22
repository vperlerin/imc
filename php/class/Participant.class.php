<?php

class ParticipantManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }


    public function emailExists($email) {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM participants WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetchColumn() > 0;
    }

    public function saveParticipant($data, $passwordHash)
    {
        // Check if email is already in use
        if ($this->emailExists($data['email'])) {
            throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
        }

        $stmt = $this->pdo->prepare("
            INSERT INTO participants (
                title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, 
                organization, admin_notes, is_online, is_early_bird, confirmation_sent, confirmation_date, 
                password_hash, total_due, total_paid, status, deleted_at, comments, guardian_name, 
                guardian_contact, guardian_email, created_at, updated_at
            ) VALUES (
                :title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, 
                :organization, :admin_notes, :is_online, :is_early_bird, FALSE, NULL, 
                :password_hash, 0.00, 0.00, 'active', NULL, :comments, :guardian_name, 
                :guardian_contact, :guardian_email, NOW(), NOW()
            )
        ");

        $stmt->execute([
            ':title' => $data['title'],
            ':first_name' => $data['first_name'],
            ':last_name' => $data['last_name'],
            ':gender' => $data['gender'],
            ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
            ':email' => $data['email'],
            ':phone' => $data['phone'],
            ':address' => $data['address'],
            ':postal_code' => $data['postal_code'],
            ':city' => $data['city'],
            ':country' => $data['country'],
            ':organization' => $data['organization'] ?? null,
            ':admin_notes' => null,
            ':is_online' => filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN),
            ':is_early_bird' => filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN),
            ':password_hash' => $passwordHash,
            ':comments' => $data['comments'] ?? null,
            ':guardian_name' => $data['guardian_name'] ?? null,
            ':guardian_contact' => $data['guardian_contact'] ?? null,
            ':guardian_email' => $data['guardian_email'] ?? null
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Marks confirmation_sent as TRUE and sets confirmation_date to current timestamp.
     */
    public function markConfirmationSent($participantId)
    {
        $stmt = $this->pdo->prepare("
            UPDATE participants
            SET confirmation_sent = TRUE, confirmation_date = NOW(), updated_at = NOW()
            WHERE id = :id AND status = 'active'
        ");

        $stmt->execute([':id' => $participantId]);

        return $stmt->rowCount() > 0;
    }
}
