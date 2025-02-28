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


    /**
     * Get participants INFO
     */
    public function getParticipantDetails($participantId)
    {
        // 1. Fetch participant’s primary details
        $stmt = $this->pdo->prepare("
            SELECT *
            FROM participants
            WHERE id = :participant_id
        ");

        $stmt->execute([':participant_id' => $participantId]);
        $participant = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$participant) {
            return null; 
        }

        // 2. Fetch workshops the participant is registered for
        $stmt = $this->pdo->prepare("
        SELECT w.*
        FROM participant_workshops pw
        INNER JOIN workshops w ON pw.workshop_id = w.id
        WHERE pw.participant_id = :participant_id
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 3. Fetch payments by this participant
        //    (including payment method name via JOIN)
        $stmt = $this->pdo->prepare("
        SELECT pay.*, pm.method AS payment_method
        FROM payments pay
        INNER JOIN payment_methods pm ON pay.payment_method_id = pm.id
        WHERE pay.participant_id = :participant_id
        ORDER BY pay.payment_date DESC
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 4. Fetch accommodation info
        //    (combining both participant_accommodation and registration_types)
        $stmt = $this->pdo->prepare("
        SELECT pa.*, rt.type AS registration_type, rt.price AS registration_price
        FROM participant_accommodation pa
        INNER JOIN registration_types rt ON pa.registration_type_id = rt.id
        WHERE pa.participant_id = :participant_id
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $accommodation = $stmt->fetch(PDO::FETCH_ASSOC);

        // 5. Fetch arrival/departure info
        $stmt = $this->pdo->prepare("
        SELECT *
        FROM participant_arrival
        WHERE participant_id = :participant_id
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $arrivalInfo = $stmt->fetch(PDO::FETCH_ASSOC);

        // 6. Fetch extra options (excursion, T-shirt, proceedings, etc.)
        $stmt = $this->pdo->prepare("
        SELECT *
        FROM extra_options
        WHERE participant_id = :participant_id
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $extraOptions = $stmt->fetch(PDO::FETCH_ASSOC);

        // 7. Fetch contributions
        //    (including the IMC session name, if you want to join that table)
        $stmt = $this->pdo->prepare("
        SELECT c.*,
               s.name AS session_name
        FROM contributions c
        INNER JOIN imc_sessions s ON c.session_id = s.id
        WHERE c.participant_id = :participant_id
    ");
        $stmt->execute([':participant_id' => $participantId]);
        $contributions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Combine everything into a structured array
        $details = [
            'participant'    => $participant,
            'workshops'      => $workshops,
            'payments'       => $payments,
            'accommodation'  => $accommodation,
            'arrival'        => $arrivalInfo,
            'extra_options'  => $extraOptions,
            'contributions'  => $contributions,
        ];

        return $details;
    }
}
