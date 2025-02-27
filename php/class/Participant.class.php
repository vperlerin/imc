<?php

class ParticipantManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function emailExists($email)
    {
        $stmt = $this->pdo->prepare("SELECT COUNT(*) FROM participants WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetchColumn() > 0;
    }

    public function saveParticipant($data, $passwordHash)
    {
        if ($this->emailExists($data['email'])) {
            throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
        }

        $stmt = $this->pdo->prepare("
            INSERT INTO participants (
                title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, 
                organization, admin_notes, is_online, is_early_bird, confirmation_sent, confirmation_date, 
                password_hash, paypal_fee, total_due, total_paid, status, deleted_at, comments, guardian_name, 
                guardian_contact, guardian_email, created_at, updated_at
            ) VALUES (
                :title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, 
                :organization, :admin_notes, :is_online, :is_early_bird, FALSE, NULL, 
                :password_hash, :paypal_fee, :total_due, 0.00, 'active', NULL, :comments, :guardian_name, 
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
            ':paypal_fee' => $data['paypal_fee'],
            ':total_due' => $data['total_due'],
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
     * Retrieve the number of participants registered for a given workshop 
     * and their payment confirmation status.
     */
    public function getWorkshopParticipants($workshopTitle)
    {
        $stmt = $this->pdo->prepare("
        SELECT 
            w.title AS workshop_title,
            COUNT(pw.participant_id) AS total_registered,
            SUM(CASE 
                    WHEN p.confirmation_sent = 1 THEN 1 
                    ELSE 0 
                END) AS confirmed_participants,
            SUM(CASE 
                    WHEN p.confirmation_sent = 0 THEN 1 
                    ELSE 0 
                END) AS unconfirmed_participants
        FROM workshops w
        LEFT JOIN participant_workshops pw ON w.id = pw.workshop_id
        LEFT JOIN participants p ON pw.participant_id = p.id
        WHERE w.title = :workshopTitle
        GROUP BY w.id;
    ");
    

        $stmt->bindParam(':workshopTitle', $workshopTitle, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
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

    /**
     * Retrieve all on-site active participants with payment method.
     */
    public function getOnsiteParticipants()
    {
        $stmt = $this->pdo->prepare("
           SELECT 
            p.id,
            p.created_at,
            p.title, 
            p.first_name, 
            p.last_name, 
            p.email,
            p.confirmation_sent, 
            p.total_due, 
            p.total_paid,
            p.paypal_fee,
            pm.method AS payment_method
            FROM participants p
            LEFT JOIN payments pay ON p.id = pay.participant_id  
            LEFT JOIN payment_methods pm ON pay.payment_method_id = pm.id  
            WHERE p.is_online = FALSE AND p.status = 'active'
            ORDER BY p.last_name, p.first_name;
        ");

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Hard delete a participant
     */
    public function deleteParticipant($participantId)
    {
        $stmt = $this->pdo->prepare("DELETE FROM participants WHERE id = ?");
        $stmt->execute([$participantId]);

        return $stmt->rowCount() > 0;
    }

    /**
     * Soft delete a participant
     */
    public function softDeleteParticipant($participantId)
    {
        $stmt = $this->pdo->prepare("UPDATE participants SET status = 'deleted', deleted_at = NOW() WHERE id = ?");
        $stmt->execute([$participantId]);

        return $stmt->rowCount() > 0;
    }
}
