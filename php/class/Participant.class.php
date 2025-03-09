<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


class ParticipantManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function confirm($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();

            $query = "UPDATE participants SET ";
            $params = [];

            if (isset($data['confirmation_sent'])) {
                $query .= "confirmation_sent = :confirmation_sent, ";
                $params[':confirmation_sent'] = (int) $data['confirmation_sent'];
            }

            if (isset($data['confirmation_date']) || (isset($data['confirmation_sent']) && $data['confirmation_sent'])) {
                $query .= "confirmation_date = NOW(), ";
            }

            $query = rtrim($query, ', ') . " WHERE id = :participant_id";
            $params[':participant_id'] = $participantId;

            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);

            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            error_log("Error updating confirmation status: " . $e->getMessage());
            return false;
        }
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
            // 1. Handle boolean fields: convert "true"/"false" (or any truthy/falsy string) to 1 or 0.
            $booleanFields = ['excursion', 'buy_tshirt', 'is_online', 'is_early_bird', 'confirmation_sent'];
            foreach ($booleanFields as $field) {
                if (!isset($data[$field])) {
                    $data[$field] = 0;
                } else {
                    $flag = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                    $data[$field] = ($flag === null ? 0 : ($flag ? 1 : 0));
                }
            }

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
                    password_hash, paypal_fee, total_due, total_paid, total_reimbursed, status, deleted_at, 
                    comments, guardian_name, guardian_contact, guardian_email, payment_method_id, created_at, updated_at
                ) VALUES (
                    :title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, 
                    :organization, NULL, :is_online, :is_early_bird, FALSE, NULL, 
                    :password_hash, :paypal_fee, :total_due, 0.00, 0.00, 'active', NULL, 
                    :comments, :guardian_name, :guardian_contact, :guardian_email, :payment_method_id, NOW(), NOW()
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
                ':paypal_fee' => $data['paypal_fee' ?? 0],
                ':total_due' => $data['total_due'],
                ':comments' => $data['comments'] ?? null,
                ':guardian_name' => $data['guardian_name'] ?? null,
                ':guardian_contact' => $data['guardian_contact'] ?? null,
                ':guardian_email' => $data['guardian_email'] ?? null,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0),
            ]);

            $participantId = $this->pdo->lastInsertId();

            // Insert workshops participation
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                $stmt = $this->pdo->prepare("
                INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                VALUES (:participant_id, :workshop_id, TRUE)
            ");

                foreach ($data['workshops'] as $workshopId) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':workshop_id' => (int) $workshopId
                    ]);
                }
            }

            // **Insert payment details**
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, payment_date, amount, payment_method_id, created_at, updated_at)
                VALUES (:participant_id, NULL, :amount, :payment_method_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => 0,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0)
            ]);

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
                VALUES (:participant_id, :registration_type_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':registration_type_id' => (int) $data['registration_type_id']
            ]);

            // Insert extra options
            $stmt = $this->pdo->prepare("
                INSERT INTO extra_options (participant_id, excursion, buy_tshirt, tshirt_size, created_at, updated_at)
                VALUES (:participant_id, :excursion, :buy_tshirt, :tshirt_size, NOW(), NOW())
            ");

            // Normalize boolean values (ensure only "1" or "0" is stored)
            $excursionValue = !empty($data['excursion']) && ($data['excursion'] === "1" || $data['excursion'] === "true") ? 1 : 0;
            $buytshirtValue = !empty($data['buy_tshirt']) && ($data['buy_tshirt'] === "1" || $data['buy_tshirt'] === "true") ? 1 : 0;

            // Execute the prepared statement
            $stmt->execute([
                ':participant_id' => $participantId,
                ':excursion' => $excursionValue,
                ':buy_tshirt' => $buytshirtValue,
                ':tshirt_size' => !empty($data['tshirt_size']) ? $data['tshirt_size'] : null, // Avoid inserting empty strings
            ]);

            // Insert contributions (talks & posters)
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                VALUES (:participant_id, :type, :title, :authors, :abstract, :session_id, :duration, :print, NOW(), NOW())
            ");

            // Insert talks
            if (!empty($data['talks']) && is_array($data['talks'])) {
                foreach ($data['talks'] as $talk) {
                    $sessionId = isset($talk['session_id']) ? (int) $talk['session_id'] : NULL;
                    $duration = isset($talk['duration']) ? $talk['duration'] : NULL;

                    $stmt->bindValue(':participant_id', $participantId, PDO::PARAM_INT);
                    $stmt->bindValue(':type', 'talk', PDO::PARAM_STR);
                    $stmt->bindValue(':title', $talk['title'], PDO::PARAM_STR);
                    $stmt->bindValue(':authors', $talk['authors'], PDO::PARAM_STR);
                    $stmt->bindValue(':abstract', $talk['abstract'], PDO::PARAM_STR);
                    $stmt->bindValue(':session_id', $sessionId, $sessionId !== NULL ? PDO::PARAM_INT : PDO::PARAM_NULL);
                    $stmt->bindValue(':duration', $duration, $duration !== NULL ? PDO::PARAM_STR : PDO::PARAM_NULL);
                    $stmt->bindValue(':print', 0, PDO::PARAM_BOOL);
                    $stmt->execute();
                }
            }

            if (!empty($data['posters']) && is_array($data['posters'])) {
                foreach ($data['posters'] as $poster) {
                    $printValue = isset($poster['print']) ? filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) : FALSE;

                    $sessionId = isset($poster['session_id']) ? (int) $poster['session_id'] : NULL;
                    $duration = isset($poster['duration']) ? $poster['duration'] : NULL;

                    $stmt->bindValue(':participant_id', $participantId, PDO::PARAM_INT);
                    $stmt->bindValue(':type', 'poster', PDO::PARAM_STR);
                    $stmt->bindValue(':title', $poster['title'], PDO::PARAM_STR);
                    $stmt->bindValue(':authors', $poster['authors'], PDO::PARAM_STR);
                    $stmt->bindValue(':abstract', $poster['abstract'], PDO::PARAM_STR);
                    $stmt->bindValue(':session_id', $sessionId, $sessionId !== NULL ? PDO::PARAM_INT : PDO::PARAM_NULL);
                    $stmt->bindValue(':duration', $duration, $duration !== NULL ? PDO::PARAM_STR : PDO::PARAM_NULL);
                    $stmt->bindValue(':print', $printValue ? 1 : 0, PDO::PARAM_INT);
                    $stmt->execute();
                }
            }


            $this->pdo->commit();
            return $participantId;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error saving participant: " . $e->getMessage());
        }
    }

    public function saveOnlineParticipant($data, $passwordHash)
    {
        try {
            $this->pdo->beginTransaction();

            // 1. Handle boolean fields: convert "true"/"false" (or any truthy/falsy string) to 1 or 0.
            $booleanFields = ['is_online', 'confirmation_sent'];
            foreach ($booleanFields as $field) {
                if (!isset($data[$field])) {
                    $data[$field] = 0;
                } else {
                    $flag = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                    $data[$field] = ($flag === null ? 0 : ($flag ? 1 : 0));
                }
            }

            // Check if email exists
            if ($this->emailExists($data['email'])) {
                throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
            }

            // Insert participant
            $stmt = $this->pdo->prepare("
            INSERT INTO participants (
                title, first_name, last_name, gender, dob, email, country, 
                organization, is_online, is_early_bird, confirmation_sent, confirmation_date, 
                password_hash, paypal_fee, total_due, total_paid, total_reimbursed, status, deleted_at, 
                comments, payment_method_id, created_at, updated_at
            ) VALUES (
                :title, :first_name, :last_name, :gender, :dob, :email, :country, 
                :organization, :is_online, :is_early_bird, FALSE, NULL, 
                :password_hash, :paypal_fee, :total_due, 0.00, 0.00, 'active', NULL, 
                :comments, :payment_method_id, NOW(), NOW()
            )
        ");

            $stmt->execute([
                ':title' => $data['title'],
                ':first_name' => $data['first_name'],
                ':last_name' => $data['last_name'],
                ':gender' => $data['gender'],
                ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
                ':email' => $data['email'],
                ':country' => $data['country'],
                ':organization' => $data['organization'] ?? null,
                ':is_online' => filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN),
                ':is_early_bird' => filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN),
                ':password_hash' => $passwordHash,
                ':paypal_fee' => $data['paypal_fee'] ?? 0,
                ':total_due' => $data['total_due'],
                ':comments' => $data['comments'] ?? null,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0),
            ]);

            $participantId = $this->pdo->lastInsertId();

            // Insert only workshops where price_online > 0
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                $stmt = $this->pdo->prepare("
                INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                SELECT :participant_id, id, TRUE FROM workshops WHERE id = :workshop_id AND price_online > 0
            ");

                foreach ($data['workshops'] as $workshopId) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':workshop_id' => (int) $workshopId
                    ]);
                }
            }

            // **Insert payment details**
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, payment_date, amount, payment_method_id, created_at, updated_at)
                VALUES (:participant_id, NULL, :amount, :payment_method_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => 0,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0)
            ]);

            // Insert **only online contributions (talks)**
            if (!empty($data['talks']) && is_array($data['talks'])) {
                $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                VALUES (:participant_id, 'talk', :title, :authors, :abstract, :session_id, :duration, 0, NOW(), NOW())
            ");

                foreach ($data['talks'] as $talk) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':title' => $talk['title'],
                        ':authors' => $talk['authors'],
                        ':abstract' => $talk['abstract'],
                        ':session_id' => (int) $talk['session_id'],
                        ':duration' => $talk['duration']
                    ]);
                }
            }

            $this->pdo->commit();
            return $participantId;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error saving online participant: " . $e->getMessage());
        }
    }

    public function updateParticipant($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();
    
            // Handle boolean fields (convert "true"/"false" to 1 or 0)
            $booleanFields = ['excursion', 'buy_tshirt', 'is_online', 'is_early_bird', 'confirmation_sent'];
            foreach ($booleanFields as $field) {
                if (!isset($data[$field])) {
                    $data[$field] = 0;
                } else {
                    $flag = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                    $data[$field] = ($flag === null ? 0 : ($flag ? 1 : 0));
                }
            }
    
            // Check if participant exists
            $stmt = $this->pdo->prepare("SELECT id FROM participants WHERE id = :participant_id");
            $stmt->execute([':participant_id' => $participantId]);
    
            if ($stmt->rowCount() === 0) {
                throw new Exception("Participant with ID {$participantId} does not exist.");
            }
    
            // Prepare fields for update
            $fields = [
                'title = :title',
                'first_name = :first_name',
                'last_name = :last_name',
                'gender = :gender',
                'dob = :dob',
                'email = :email',
                'phone = :phone',
                'address = :address',
                'postal_code = :postal_code',
                'city = :city',
                'country = :country',
                'organization = :organization',
                'is_online = :is_online',
                'paypal_fee = :paypal_fee',
                'comments = :comments',
                'payment_method_id = :payment_method_id',
                'updated_at = NOW()'
            ];
    
            // Exclude `total_due` if it's not set or zero
            if (isset($data['total_due']) && floatval($data['total_due']) > 0) {
                $fields[] = 'total_due = :total_due';
            }
    
            if (isset($data['admin_notes'])) {
                $fields[] = 'admin_notes = :admin_notes';
            }
    
            $sql = "UPDATE participants SET " . implode(', ', $fields) . " WHERE id = :participant_id";
            $stmt = $this->pdo->prepare($sql);
    
            // Bind parameters
            $params = [
                ':participant_id' => $participantId,
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
                ':paypal_fee' => $data['paypal_fee'],
                ':comments' => $data['comments'] ?? null,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0),
            ];
    
            // Bind `total_due` only if it was included
            if (isset($data['total_due']) && floatval($data['total_due']) > 0) {
                $params[':total_due'] = $data['total_due'];
            }
    
            if (isset($data['admin_notes'])) {
                $params[':admin_notes'] = $data['admin_notes'];
            }
    
            $stmt->execute($params);
    
            // Delete existing workshop selections for the participant
            $stmt = $this->pdo->prepare("DELETE FROM participant_workshops WHERE participant_id = :participant_id");
            $stmt->execute([':participant_id' => $participantId]);
    
            // Insert new workshop selections
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                    VALUES (:participant_id, :workshop_id, TRUE)
                ");
    
                foreach ($data['workshops'] as $workshopId) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':workshop_id' => (int) $workshopId
                    ]);
                }
            }
    
            // Update Arrival Details
            $stmt = $this->pdo->prepare("
                UPDATE arrival
                SET arrival_date = :arrival_date, arrival_hour = :arrival_hour, arrival_minute = :arrival_minute, 
                    departure_date = :departure_date, departure_hour = :departure_hour, departure_minute = :departure_minute, 
                    travelling = :travelling, travelling_details = :travelling_details, updated_at = NOW()
                WHERE participant_id = :participant_id
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
    
            // Update Accommodation
            $stmt = $this->pdo->prepare("
                UPDATE accommodation
                SET registration_type_id = :registration_type_id, updated_at = NOW()
                WHERE participant_id = :participant_id
            ");
    
            $stmt->execute([
                ':participant_id' => $participantId,
                ':registration_type_id' => (int) $data['registration_type_id']
            ]);
    
            // Update Extra Options
            $stmt = $this->pdo->prepare("
                UPDATE extra_options 
                SET 
                    excursion = :excursion, 
                    buy_tshirt = :buy_tshirt, 
                    tshirt_size = :tshirt_size, 
                    updated_at = NOW()
                WHERE participant_id = :participant_id
            ");
    
            // Ensure tshirt_size is NULL if buy_tshirt is 0
            $tshirtSize = ($data['buy_tshirt'] === 1 && !empty($data['tshirt_size'])) ? $data['tshirt_size'] : null;
    
            $stmt->execute([
                ':participant_id' => $participantId,
                ':excursion' => $data['excursion'],
                ':buy_tshirt' => $data['buy_tshirt'],
                ':tshirt_size' => $tshirtSize,
            ]);
    
            // Delete existing contributions
            $stmtDelete = $this->pdo->prepare("DELETE FROM contributions WHERE participant_id = :participant_id");
            $stmtDelete->execute([':participant_id' => $participantId]);
    
            // Insert contributions (talks & posters)
            $stmtInsert = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                VALUES (:participant_id, :type, :title, :authors, :abstract, :session_id, :duration, :print, NOW(), NOW())
            ");
    
            // Insert talks
            if (!empty($data['talks']) && is_array($data['talks'])) {
                foreach ($data['talks'] as $talk) {
                    $stmtInsert->execute([
                        ':participant_id' => $participantId,
                        ':type' => 'talk',
                        ':title' => $talk['title'],
                        ':authors' => $talk['authors'],
                        ':abstract' => $talk['abstract'],
                        ':session_id' => (int) $talk['session_id'],
                        ':duration' => $talk['duration'],
                        ':print' => 0
                    ]);
                }
            }
    
            // Insert posters
            if (!empty($data['posters']) && is_array($data['posters'])) {
                foreach ($data['posters'] as $poster) {
                    $stmtInsert->execute([
                        ':participant_id' => $participantId,
                        ':type' => 'poster',
                        ':title' => $poster['title'],
                        ':authors' => $poster['authors'],
                        ':abstract' => $poster['abstract'],
                        ':session_id' => (int) $poster['session_id'],
                        ':duration' => $poster['duration'],
                        ':print' => filter_var($poster['print'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0
                    ]);
                }
            }
    
            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error updating participant: " . $e->getMessage());
        }
    }
    

    public function updateOnlineParticipant($participantId, $data)
    {
        try {
            $this->pdo->beginTransaction();
    
            // Handle boolean fields (convert "true"/"false" to 1 or 0)
            $booleanFields = ['is_online', 'is_early_bird', 'confirmation_sent'];
            foreach ($booleanFields as $field) {
                if (!isset($data[$field])) {
                    $data[$field] = 0;
                } else {
                    $flag = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                    $data[$field] = ($flag === null ? 0 : ($flag ? 1 : 0));
                }
            }
    
            // Check if participant exists
            $stmt = $this->pdo->prepare("SELECT id FROM participants WHERE id = :participant_id");
            $stmt->execute([':participant_id' => $participantId]);
    
            if ($stmt->rowCount() === 0) {
                throw new Exception("Online participant with ID {$participantId} does not exist.");
            }
    
            // Prepare fields for update
            $fields = [
                'title = :title',
                'first_name = :first_name',
                'last_name = :last_name',
                'gender = :gender',
                'dob = :dob',
                'email = :email',
                'country = :country',
                'organization = :organization',
                'is_online = :is_online',
                'is_early_bird = :is_early_bird',
                'paypal_fee = :paypal_fee',
                'comments = :comments',
                'payment_method_id = :payment_method_id',
                'updated_at = NOW()'
            ];
    
            // Exclude `total_due` if it's not set or zero
            if (isset($data['total_due']) && floatval($data['total_due']) > 0) {
                $fields[] = 'total_due = :total_due';
            }
    
            if (isset($data['admin_notes'])) {
                $fields[] = 'admin_notes = :admin_notes';
            }
    
            $sql = "UPDATE participants SET " . implode(', ', $fields) . " WHERE id = :participant_id";
            $stmt = $this->pdo->prepare($sql);
    
            // Bind parameters
            $params = [
                ':participant_id' => $participantId,
                ':title' => $data['title'],
                ':first_name' => $data['first_name'],
                ':last_name' => $data['last_name'],
                ':gender' => $data['gender'],
                ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
                ':email' => $data['email'],
                ':country' => $data['country'],
                ':organization' => $data['organization'] ?? null,
                ':is_online' => filter_var($data['is_online'], FILTER_VALIDATE_BOOLEAN),
                ':is_early_bird' => filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN),
                ':paypal_fee' => $data['paypal_fee'],
                ':comments' => $data['comments'] ?? null,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0),
            ];
    
            // Bind `total_due` only if it was included
            if (isset($data['total_due']) && floatval($data['total_due']) > 0) {
                $params[':total_due'] = $data['total_due'];
            }
    
            if (isset($data['admin_notes'])) {
                $params[':admin_notes'] = $data['admin_notes'];
            }
    
            $stmt->execute($params);
    
            // Delete existing workshop selections for the participant
            $stmt = $this->pdo->prepare("DELETE FROM participant_workshops WHERE participant_id = :participant_id");
            $stmt->execute([':participant_id' => $participantId]);
    
            // Insert new online workshop selections (only if price_online > 0)
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                    SELECT :participant_id, id, TRUE FROM workshops WHERE id = :workshop_id AND price_online > 0
                ");
    
                foreach ($data['workshops'] as $workshopId) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':workshop_id' => (int) $workshopId
                    ]);
                }
            }
    
            // Update **Payments** (set to 0 if no payment method is selected)
            $stmt = $this->pdo->prepare("
                UPDATE payments 
                SET amount = :amount, payment_method_id = :payment_method_id, updated_at = NOW()
                WHERE participant_id = :participant_id
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => 0, // Online participants don't have an initial payment
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0)
            ]);
    
            // Delete existing contributions (talks)
            $stmtDelete = $this->pdo->prepare("DELETE FROM contributions WHERE participant_id = :participant_id");
            $stmtDelete->execute([':participant_id' => $participantId]);
    
            // Insert **only online contributions (talks)**
            if (!empty($data['talks']) && is_array($data['talks'])) {
                $stmtInsert = $this->pdo->prepare("
                    INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                    VALUES (:participant_id, 'talk', :title, :authors, :abstract, :session_id, :duration, 0, NOW(), NOW())
                ");
    
                foreach ($data['talks'] as $talk) {
                    $stmtInsert->execute([
                        ':participant_id' => $participantId,
                        ':title' => $talk['title'],
                        ':authors' => $talk['authors'],
                        ':abstract' => $talk['abstract'],
                        ':session_id' => (int) $talk['session_id'],
                        ':duration' => $talk['duration']
                    ]);
                }
            }
    
            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw new Exception("Error updating online participant: " . $e->getMessage());
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
                p.confirmation_date,
                p.total_due, 
                p.total_paid,
                p.paypal_fee,
                (SELECT pm.method 
                 FROM payments pay 
                 LEFT JOIN payment_methods pm ON pay.payment_method_id = pm.id
                 WHERE pay.participant_id = p.id
                 ORDER BY pay.created_at DESC 
                 LIMIT 1) AS payment_method
            FROM participants p
            WHERE p.is_online = FALSE AND p.status = 'active'
            GROUP BY p.id
            ORDER BY p.created_at DESC;
        ");

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function getOnlineParticipants()
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
            p.confirmation_date,
            p.total_due, 
            p.total_paid,
            p.paypal_fee, 
            (SELECT pm.method 
             FROM payments pay 
             LEFT JOIN payment_methods pm ON pay.payment_method_id = pm.id
             WHERE pay.participant_id = p.id
             ORDER BY pay.created_at DESC 
             LIMIT 1) AS payment_method
        FROM participants p
        WHERE p.is_online = TRUE AND p.status = 'active'
        GROUP BY p.id
        ORDER BY p.created_at DESC;
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
     * Get participant INFO
     */
    public function getParticipantDetails($participantId, $withAdminNotes = false)
    {
        $columns = $withAdminNotes ? 'p.*, pm.method AS payment_method_name' :
            'p.id,
        p.title,
        p.first_name,
        p.last_name,
        p.gender,
        p.phone,
        p.email,
        p.address,
        p.postal_code,
        p.city,
        p.country,
        p.organization,
        p.dob,
        p.is_online,
        p.is_early_bird,
        p.confirmation_sent,
        p.confirmation_date,
        p.password_hash,
        p.paypal_fee,
        p.payment_method_id,
        pm.method AS payment_method_name,
        p.total_due,
        p.total_paid,
        p.total_reimbursed,
        p.status,
        p.deleted_at,
        p.comments,
        p.guardian_name,
        p.guardian_contact,
        p.guardian_email,
        p.created_at,
        p.updated_at';

        // 1. Fetch participant’s primary details with payment method name
        $stmt = $this->pdo->prepare("  
            SELECT {$columns}
            FROM participants p
            LEFT JOIN payment_methods pm ON p.payment_method_id = pm.id
            WHERE p.id = :participant_id
        ");

        $stmt->execute([':participant_id' => $participantId]);
        $participant = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$participant) {
            return null;
        }

        // 2. Fetch workshops the participant is registered for
        $stmt = $this->pdo->prepare("  
            SELECT *
            FROM participant_workshops pw
            INNER JOIN workshops w ON pw.workshop_id = w.id
            WHERE pw.participant_id = :participant_id
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // 3. Fetch payments by this participant
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
        $stmt = $this->pdo->prepare("  
            SELECT pa.*, rt.type AS registration_type, rt.price AS registration_price
            FROM accommodation pa
            INNER JOIN registration_types rt ON pa.registration_type_id = rt.id
            WHERE pa.participant_id = :participant_id
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $accommodation = $stmt->fetch(PDO::FETCH_ASSOC);

        // Add payment_method_id and payment_method_name to accommodation
        $accommodation['payment_method_id'] = $participant['payment_method_id'];
        $accommodation['payment_method_name'] = $participant['payment_method_name'];

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
        $stmt = $this->pdo->prepare("  
            SELECT c.*, s.name AS session_name
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


    /**
     * Get details of an online participant
     */
    public function getOnlineParticipantDetails($participantId)
    {
        $stmt = $this->pdo->prepare("  
            SELECT 
                p.id,
                p.title,
                p.first_name,
                p.last_name,
                p.gender,
                p.email,
                p.country,
                p.organization,
                p.is_online,
                p.is_early_bird,
                p.confirmation_sent,
                p.confirmation_date,
                p.total_due,
                p.total_paid,
                p.total_reimbursed,
                p.status,
                p.comments,
                p.payment_method_id,
                pm.method AS payment_method_name,
                p.created_at,
                p.updated_at
            FROM participants p
            LEFT JOIN payment_methods pm ON p.payment_method_id = pm.id
            WHERE p.id = :participant_id AND p.is_online = 1
        ");

        $stmt->execute([':participant_id' => $participantId]);
        $participant = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$participant) {
            return null;
        }

        // Fetch only workshops where price_online > 0
        $stmt = $this->pdo->prepare("  
            SELECT w.*
            FROM participant_workshops pw
            INNER JOIN workshops w ON pw.workshop_id = w.id
            WHERE pw.participant_id = :participant_id AND w.price_online > 0
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $workshops = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch payments
        $stmt = $this->pdo->prepare("  
            SELECT pay.*, pm.method AS payment_method
            FROM payments pay
            INNER JOIN payment_methods pm ON pay.payment_method_id = pm.id
            WHERE pay.participant_id = :participant_id
            ORDER BY pay.payment_date DESC
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch only online contributions (talks)
        $stmt = $this->pdo->prepare("  
            SELECT c.*, s.name AS session_name
            FROM contributions c
            INNER JOIN imc_sessions s ON c.session_id = s.id
            WHERE c.participant_id = :participant_id AND c.type = 'talk'
        ");
        $stmt->execute([':participant_id' => $participantId]);
        $contributions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Combine everything into a structured array
        $details = [
            'participant'    => $participant,
            'workshops'      => $workshops,
            'payments'       => $payments,
            'contributions'  => $contributions,
        ];

        return $details;
    }


    public function getParticipantsByWorkshop($pdo, $workshopId) {
        $sql = "
            SELECT 
                p.*, 
                a.registration_type_id
            FROM participants p
            JOIN participant_workshops pw ON p.id = pw.participant_id
            LEFT JOIN accommodation a ON p.id = a.participant_id
            WHERE pw.workshop_id = :workshop_id
            AND p.is_online = 0
        ";
    
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':workshop_id', $workshopId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
