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
        try {
            $this->pdo->beginTransaction();
    
            // Check if email exists
            if ($this->emailExists($data['email'])) {
                throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
            }
    
            // Insert participant
            $stmt = $this->pdo->prepare("
                INSERT INTO participants (
                    title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, 
                    organization, admin_notes, is_online, is_early_bird, confirmation_sent, confirmation_date, 
                    password_hash, paypal_fee, total_due, total_paid, status, deleted_at, comments, created_at, updated_at
                ) VALUES (
                    :title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, 
                    :organization, NULL, :is_online, :is_early_bird, FALSE, NULL, 
                    :password_hash, :paypal_fee, :total_due, 0.00, 'active', NULL, :comments, NOW(), NOW()
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
                ':is_online' => filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN),
                ':is_early_bird' => filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN),
                ':password_hash' => $passwordHash,
                ':paypal_fee' => $data['paypal_fee'],
                ':total_due' => $data['total_due'],
                ':comments' => $data['comments'] ?? null
            ]);

            
            $participantId = $this->pdo->lastInsertId();

            // Fetch all available workshops from the database
            $stmt = $this->pdo->query("SELECT id FROM workshops");
            $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Check if workshops exist in form data
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                foreach ($workshops as $workshop) {
                    $workshopId = $workshop['id'];

                    // Check if the workshop is selected ("true")
                    if (!empty($data['workshops'][$workshopId]) && $data['workshops'][$workshopId] === "true") {
                        $stmt = $this->pdo->prepare("
                            INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                            VALUES (:participant_id, :workshop_id, TRUE)
                        ");
                        $stmt->execute([
                            ':participant_id' => $participantId,
                            ':workshop_id' => $workshopId
                        ]);
                    }
                }
            }

            // Insert arrival details
            $stmt = $this->pdo->prepare("
                INSERT INTO arrival (participant_id, arrival_date, arrival_hour, arrival_minute, 
                    departure_date, departure_hour, departure_minute, travelling, travelling_details, created_at, updated_at)
                VALUES (:participant_id, :arrival_date, :arrival_hour, :arrival_minute, 
                    :departure_date, :departure_hour, :departure_minute, :travelling, :travelling_details, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':arrival_date' => $data['arrival_date'],
                ':arrival_hour' => $data['arrival_hour'],
                ':arrival_minute' => $data['arrival_minute'],
                ':departure_date' => $data['departure_date'],
                ':departure_hour' => $data['departure_hour'],
                ':departure_minute' => $data['departure_minute'],
                ':travelling' => $data['travelling'],
                ':travelling_details' => $data['travelling_details'] ?? null
            ]);


            // Insert accommodation details
            $stmt = $this->pdo->prepare("
                INSERT INTO accommodation (participant_id, registration_type_id, created_at, updated_at)
                VALUES (:participant_id, (SELECT id FROM registration_types WHERE type = :registration_type), NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':registration_type' => $data['registration_type']
            ]);

            // Insert payment details
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, payment_date, amount, payment_method_id, created_at, updated_at)
                VALUES (:participant_id, NOW(), :amount, (SELECT id FROM payment_methods WHERE method = :payment_method), NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => $data['total_due'],
                ':payment_method' => $data['payment_method']
            ]);

            // Insert extra options
            $stmt = $this->pdo->prepare("
                INSERT INTO extra_options (participant_id, excursion, buy_tshirt, tshirt_size, proceedings, created_at, updated_at)
                VALUES (:participant_id, :excursion, :buy_tshirt, :tshirt_size, :proceedings, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':excursion' => filter_var($data['excursion'], FILTER_VALIDATE_BOOLEAN),
                ':buy_tshirt' => filter_var($data['buy_tshirt'], FILTER_VALIDATE_BOOLEAN),
                ':tshirt_size' => $data['tshirt_size'] ?? null,
                ':proceedings' => $data['posters'][0]['printOnSite'] === "true" ? "pdf_printed" : "pdf"
            ]);

    

    
            // Insert talks and posters with print flag
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, paper_submission, print, created_at, updated_at)
                VALUES (:participant_id, :type, :title, :authors, :abstract, (SELECT id FROM imc_sessions WHERE name = :session), :duration, :paper_submission, :print, NOW(), NOW())
            ");
    
            // Insert talks
            foreach ($data['talks'] as $talk) {
                $stmt->execute([
                    ':participant_id' => $participantId,
                    ':type' => 'talk',
                    ':title' => $talk['title'],
                    ':authors' => $talk['authors'],
                    ':abstract' => $talk['abstract'],
                    ':session' => $talk['session'],
                    ':duration' => $talk['duration'],
                    ':paper_submission' => $talk['paperDate'],
                    ':print' => FALSE  
                ]);
            }
    
            // Insert posters with print option
            foreach ($data['posters'] as $poster) {
                $stmt->execute([
                    ':participant_id' => $participantId,
                    ':type' => 'poster',
                    ':title' => $poster['title'],
                    ':authors' => $poster['authors'],
                    ':abstract' => $poster['abstract'],
                    ':session' => $poster['session'],
                    ':duration' => null,
                    ':paper_submission' => $poster['paperDate'],
                    ':print' => filter_var($poster['printOnSite'], FILTER_VALIDATE_BOOLEAN)  
                ]);
            }
    
            $this->pdo->commit();
            return $participantId;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error saving participant: " . $e->getMessage());
        }
    }
    
 
    /**
     * Retrieve participant statistics for a given workshop or all workshops.
     */
    public function getWorkshopParticipants($workshopTitle = null)
    {
        // Base SQL query
        $query = "
        SELECT 
            w.id AS workshop_id,
            w.title AS workshop_title,
            COUNT(pw.participant_id) AS total_registered,
            SUM(CASE WHEN p.confirmation_sent = 1 THEN 1 ELSE 0 END) AS confirmed_participants,
            SUM(CASE WHEN p.confirmation_sent = 0 THEN 1 ELSE 0 END) AS unconfirmed_participants,
            SUM(CASE WHEN p.is_online = 1 THEN 1 ELSE 0 END) AS online_participants,
            SUM(CASE WHEN p.is_online = 0 THEN 1 ELSE 0 END) AS onsite_participants
        FROM workshops w
        LEFT JOIN participant_workshops pw ON w.id = pw.workshop_id
        LEFT JOIN participants p ON pw.participant_id = p.id
    ";

        // Filter by specific workshop title if provided
        if ($workshopTitle) {
            $query .= " WHERE w.title = :workshopTitle";
        }

        $query .= " GROUP BY w.id";

        $stmt = $this->pdo->prepare($query);

        // Bind parameter if filtering by specific workshop
        if ($workshopTitle) {
            $stmt->bindParam(':workshopTitle', $workshopTitle, PDO::PARAM_STR);
        }

        $stmt->execute();

        // If fetching stats for a single workshop, return a single row
        if ($workshopTitle) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Otherwise, return all workshops' statistics
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
            SELECT 
                w.id, 
                w.title, 
                w.date, 
                w.period, 
                w.price, 
                w.price_online
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
        //    (combining both accommodation and registration_types)
        $stmt = $this->pdo->prepare("
            SELECT pa.*, rt.type AS registration_type, rt.price AS registration_price
            FROM accommodation pa
            INNER JOIN registration_types rt ON pa.registration_type_id = rt.id
            WHERE pa.participant_id = :participant_id
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $accommodation = $stmt->fetch(PDO::FETCH_ASSOC);

        // 5. Fetch arrival/departure info
        $stmt = $this->pdo->prepare("
            SELECT *
            FROM arrival
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
