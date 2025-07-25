<?php



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
            $hasUpdates = false; // Track if any updates are made

            // Update confirmation_sent if provided
            if (isset($data['confirmation_sent'])) {
                $confirmationSent = filter_var($data['confirmation_sent'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                $query .= "confirmation_sent = :confirmation_sent, ";
                $params[':confirmation_sent'] = $confirmationSent ? 1 : 0;
                $hasUpdates = true;
            }

            // Update confirmation_date if provided  
            if (isset($data['confirmation_date'])) {
                $query .= "confirmation_date = NOW(), ";
                $hasUpdates = true;
            }

            // Prevent executing an empty update query
            if (!$hasUpdates) {
                $this->pdo->rollBack();
                //error_log("No valid fields provided for update.");
                return false;
            }

            // Remove trailing comma and add WHERE clause
            $query = rtrim($query, ', ') . " WHERE id = :participant_id";
            $params[':participant_id'] = (int) $participantId;

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
            // 1. Handle boolean fields (without can_be_public)
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

            // 2. Check if email exists
            if ($this->emailExists($data['email'])) {
                throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
            }

            // 3. Prepare dynamic columns and values
            $columns = [
                'title',
                'first_name',
                'last_name',
                'gender',
                'dob',
                'email',
                'phone',
                'address',
                'postal_code',
                'city',
                'country',
                'organization',
                'admin_notes',
                'is_online',
                'is_early_bird',
                'confirmation_sent',
                'confirmation_date',
                'password_hash',
                'paypal_fee',
                'total_due',
                'total_paid',
                'total_reimbursed',
                'status',
                'deleted_at',
                'comments',
                'guardian_name',
                'guardian_contact',
                'guardian_email',
                'payment_method_id',
                'created_at',
                'updated_at'
            ];

            $values = [
                ':title',
                ':first_name',
                ':last_name',
                ':gender',
                ':dob',
                ':email',
                ':phone',
                ':address',
                ':postal_code',
                ':city',
                ':country',
                ':organization',
                'NULL',
                ':is_online',
                ':is_early_bird',
                ':confirmation_sent',
                'NULL',
                ':password_hash',
                ':paypal_fee',
                ':total_due',
                '0.00',
                '0.00',
                "'active'",
                'NULL',
                ':comments',
                ':guardian_name',
                ':guardian_contact',
                ':guardian_email',
                ':payment_method_id',
                'NOW()',
                'NOW()'
            ];

            $params = [
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
                ':is_online' => $data['is_online'],
                ':is_early_bird' => $data['is_early_bird'],
                ':confirmation_sent' => $data['confirmation_sent'],
                ':password_hash' => $passwordHash,
                ':paypal_fee' => $data['paypal_fee'] ?? 0,
                ':total_due' => $data['total_due'],
                ':comments' => $data['comments'] ?? null,
                ':guardian_name' => $data['guardian_name'] ?? null,
                ':guardian_contact' => $data['guardian_contact'] ?? null,
                ':guardian_email' => $data['guardian_email'] ?? null,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0),
            ];

            // 4. Ensure can_be_public is set (default to true if not provided)
            $flag = filter_var($data['can_be_public'] ?? true, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            $data['can_be_public'] = ($flag === null ? 0 : ($flag ? 1 : 0));

            // Always insert can_be_public
            $columns[] = 'can_be_public';
            $values[] = ':can_be_public';
            $params[':can_be_public'] = $data['can_be_public'];

            // 5. Insert participant
            $stmt = $this->pdo->prepare("
                INSERT INTO participants (" . implode(", ", $columns) . ")
                VALUES (" . implode(", ", $values) . ")
            ");

            $stmt->execute($params);

            $participantId = $this->pdo->lastInsertId();

            // 6. Insert workshops participation
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

            // 7. Insert payment details
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, payment_date, amount, payment_method_id, created_at, updated_at)
                VALUES (:participant_id, NULL, :amount, :payment_method_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => 0,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0)
            ]);

            // 8. Insert arrival details
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

            // 9. Insert accommodation details
            $stmt = $this->pdo->prepare("
                INSERT INTO accommodation (participant_id, registration_type_id, created_at, updated_at)
                VALUES (:participant_id, :registration_type_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':registration_type_id' => (int) $data['registration_type_id']
            ]);

            // 10. Insert extra options
            $stmt = $this->pdo->prepare("
                INSERT INTO extra_options (participant_id, excursion, buy_tshirt, tshirt_size, created_at, updated_at)
                VALUES (:participant_id, :excursion, :buy_tshirt, :tshirt_size, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':excursion' => $data['excursion'],
                ':buy_tshirt' => $data['buy_tshirt'],
                ':tshirt_size' => !empty($data['tshirt_size']) ? $data['tshirt_size'] : null,
            ]);

            // 11. Insert contributions (talks & posters)
            $stmt = $this->pdo->prepare("
                INSERT INTO contributions (participant_id, type, title, authors, abstract, session_id, duration, print, created_at, updated_at)
                VALUES (:participant_id, :type, :title, :authors, :abstract, :session_id, :duration, :print, NOW(), NOW())
            ");

            if (!empty($data['talks']) && is_array($data['talks'])) {
                foreach ($data['talks'] as $talk) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':type' => 'talk',
                        ':title' => $talk['title'],
                        ':authors' => $talk['authors'],
                        ':abstract' => $talk['abstract'],
                        ':session_id' => $talk['session_id'] ?? null,
                        ':duration' => $talk['duration'] ?? null,
                        ':print' => 0
                    ]);
                }
            }

            if (!empty($data['posters']) && is_array($data['posters'])) {
                foreach ($data['posters'] as $poster) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':type' => 'poster',
                        ':title' => $poster['title'],
                        ':authors' => $poster['authors'],
                        ':abstract' => $poster['abstract'],
                        ':session_id' => $poster['session_id'] ?? null,
                        ':duration' => $poster['duration'] ?? null,
                        ':print' => !empty($poster['print']) ? 1 : 0
                    ]);
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

            // 1. Handle boolean fields (without can_be_public)
            $booleanFields = ['is_online', 'confirmation_sent'];
            foreach ($booleanFields as $field) {
                if (!isset($data[$field])) {
                    $data[$field] = 0;
                } else {
                    $flag = filter_var($data[$field], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                    $data[$field] = ($flag === null ? 0 : ($flag ? 1 : 0));
                }
            }

            // 2. Prepare dynamic columns and values
            $columns = [
                'title',
                'first_name',
                'last_name',
                'gender',
                'dob',
                'email',
                'country',
                'organization',
                'is_online',
                'is_early_bird',
                'confirmation_sent',
                'confirmation_date',
                'password_hash',
                'paypal_fee',
                'total_due',
                'total_paid',
                'total_reimbursed',
                'status',
                'deleted_at',
                'comments',
                'payment_method_id',
                'created_at',
                'updated_at'
            ];

            $values = [
                ':title',
                ':first_name',
                ':last_name',
                ':gender',
                ':dob',
                ':email',
                ':country',
                ':organization',
                ':is_online',
                ':is_early_bird',
                ':confirmation_sent',
                'NULL',
                ':password_hash',
                ':paypal_fee',
                ':total_due',
                '0.00',
                '0.00',
                "'active'",
                'NULL',
                ':comments',
                ':payment_method_id',
                'NOW()',
                'NOW()'
            ];

            $params = [
                ':title' => $data['title'],
                ':first_name' => $data['first_name'],
                ':last_name' => $data['last_name'],
                ':gender' => $data['gender'],
                ':dob' => "{$data['dobYear']}-{$data['dobMonth']}-{$data['dobDay']}",
                ':email' => $data['email'],
                ':country' => $data['country'],
                ':organization' => $data['organization'] ?? null,
                ':is_online' => $data['is_online'],
                ':is_early_bird' => filter_var($data['is_early_bird'], FILTER_VALIDATE_BOOLEAN),
                ':confirmation_sent' => $data['confirmation_sent'],
                ':password_hash' => $passwordHash,
                ':paypal_fee' => $data['paypal_fee'] ?? 0,
                ':total_due' => $data['total_due'],
                ':comments' => $data['comments'] ?? null,
                ':payment_method_id' => (int)($data['payment_method_id'] ?? 0),
            ];

            // 3. If can_be_public exists in $data, add it
            if (array_key_exists('can_be_public', $data)) {
                $columns[] = 'can_be_public';
                $values[] = ':can_be_public';
                $flag = filter_var($data['can_be_public'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
                $params[':can_be_public'] = ($flag === null ? 0 : ($flag ? 1 : 0));
            }

            // 4. Check if email exists
            if ($this->emailExists($data['email'])) {
                throw new Exception("The email address '{$data['email']}' is already registered. Please use a different email or log in.");
            }

            // 5. Insert participant
            $stmt = $this->pdo->prepare("
                INSERT INTO participants (" . implode(", ", $columns) . ")
                VALUES (" . implode(", ", $values) . ")
            ");

            $stmt->execute($params);

            $participantId = $this->pdo->lastInsertId();

            // 6. Insert only workshops where price_online > 0
            if (!empty($data['workshops']) && is_array($data['workshops'])) {
                $stmt = $this->pdo->prepare("
                    INSERT INTO participant_workshops (participant_id, workshop_id, attending) 
                    SELECT :participant_id, id, TRUE FROM workshops WHERE id = :workshop_id AND price_online > 0
                ");

                foreach ($data['workshops'] as $workshopId) {
                    $stmt->execute([
                        ':participant_id' => $participantId,
                        ':workshop_id' => (int)$workshopId
                    ]);
                }
            }

            // 7. Insert payment details
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, payment_date, amount, payment_method_id, created_at, updated_at)
                VALUES (:participant_id, NULL, :amount, :payment_method_id, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => 0,
                ':payment_method_id' => (int)($data['payment_method_id'] ?? 0)
            ]);

            // 8. Insert online contributions (talks)
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
                        ':session_id' => (int)$talk['session_id'],
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
            $booleanFields = ['excursion', 'buy_tshirt', 'is_online', 'is_early_bird', 'confirmation_sent', 'can_be_public'];
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
                'can_be_public = :can_be_public',
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
                ':can_be_public' => $data['can_be_public'],
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
                ':is_online' => 'FALSE',
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

            // Update **Payments** (set to 0 if no payment method is selected)
            $stmt = $this->pdo->prepare("
                UPDATE payments 
                SET amount = 0, payment_method_id = :payment_method_id, updated_at = NOW()
                WHERE participant_id = :participant_id AND amount =  0
            ");

            $stmt->execute([
                ':participant_id' => $participantId,
                ':payment_method_id' => (int) ($data['payment_method_id'] ?? 0)
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
                SET amount = 0, payment_method_id = :payment_method_id, updated_at = NOW()
                WHERE participant_id = :participant_id AND amount =  0
            ");

            $stmt->execute([
                ':participant_id' => $participantId,
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
     * If `$confirmedOnly` is true, only return confirmed participants.
     */
    /**
     * Retrieve all on-site participants.
     * If `$confirmedOnly` is true, only return confirmed participants.
     * If `$includeCancelled` is true, include both 'active' and 'cancelled' participants.
     */
    public function getOnsiteParticipants($confirmedOnly = false, $includeCancelled = false)
    {
        // Select fields based on $confirmedOnly
        if ($confirmedOnly) {
            $selectFields = "p.id, p.title, p.first_name, p.last_name, p.organization, p.country";
        } else {
            $selectFields = "
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
            p.status,
            COALESCE(pm.method, 'Unknown') AS payment_method_name
        ";
        }

        // Status condition
        $statusCondition = $includeCancelled
            ? "p.status IN ('active', 'cancelled')"
            : "p.status = 'active'";

        // Base query
        $query = "
        SELECT $selectFields
        FROM participants p
        LEFT JOIN (
            SELECT pay.participant_id, pm.method
            FROM payments pay
            JOIN payment_methods pm ON pay.payment_method_id = pm.id
            WHERE pay.id = (
                SELECT MAX(sub_pay.id) FROM payments sub_pay 
                WHERE sub_pay.participant_id = pay.participant_id
            )
        ) AS pm ON pm.participant_id = p.id
        WHERE p.is_online = 0 AND $statusCondition
    ";

        if ($confirmedOnly) {
            $query .= " AND p.confirmation_sent = 1 AND p.can_be_public = 1";
            $query .= " ORDER BY p.country, p.last_name, p.first_name";
        } else {
            $query .= " GROUP BY p.id ORDER BY 
                        CASE 
                            WHEN p.confirmation_sent = 1 AND p.confirmation_date IS NOT NULL THEN 1 
                            ELSE 0 
                        END ASC, 
                        p.created_at DESC";
        }

        $stmt = $this->pdo->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }




    /**
     * Retrieve all online participants with payment method.
     * If `$confirmedOnly` is true, only return confirmed participants.
     * If `$includeCancelled` is true, include both 'active' and 'cancelled' participants.
     */
    public function getOnlineParticipants($confirmedOnly = false, $includeCancelled = false)
    {
        // Select fields based on $confirmedOnly
        if ($confirmedOnly) {
            $selectFields = "p.id, p.title, p.first_name, p.last_name, p.organization, p.country";
        } else {
            $selectFields = "
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
            p.status,
            COALESCE(pm.method, 'Unknown') AS payment_method_name
        ";
        }

        // Status condition
        $statusCondition = $includeCancelled
            ? "p.status IN ('active', 'cancelled')"
            : "p.status = 'active'";

        // Base Query with JOIN to get latest payment method
        $query = "
        SELECT $selectFields
        FROM participants p
        LEFT JOIN (
            SELECT pay.participant_id, pm.method
            FROM payments pay
            JOIN payment_methods pm ON pay.payment_method_id = pm.id
            WHERE pay.id = (
                SELECT MAX(sub_pay.id) FROM payments sub_pay 
                WHERE sub_pay.participant_id = pay.participant_id
            )
        ) AS pm ON pm.participant_id = p.id
        WHERE p.is_online = 1 AND $statusCondition
    ";

        // Apply filtering for confirmed participants
        if ($confirmedOnly) {
            $query .= " AND p.confirmation_sent = 1 AND p.can_be_public = 1";
            $query .= " ORDER BY p.country, p.last_name, p.first_name";
        } else {
            $query .= " GROUP BY p.id ORDER BY 
                        CASE 
                            WHEN p.confirmation_sent = 1 AND p.confirmation_date IS NOT NULL THEN 1 
                            ELSE 0 
                        END ASC, 
                        p.created_at DESC";
        }

        $stmt = $this->pdo->prepare($query);
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
        $stmt = $this->pdo->prepare("UPDATE participants SET status = 'cancelled', deleted_at = NOW() WHERE id = ?");
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

        $participant['can_be_public'] = filter_var($participant['can_be_public'], FILTER_VALIDATE_BOOLEAN);

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
            SELECT pay.*, pm.method AS payment_method_name
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
                p.paypal_fee,
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
            SELECT pay.*, pm.method AS payment_method_name
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


    public function getParticipantsByWorkshop($workshopId)
    {
        $sql = "
            SELECT DISTINCT 
                p.*, 
                a.registration_type_id, 
                rt.description AS registration_type_description
            FROM participants p
            JOIN participant_workshops pw ON p.id = pw.participant_id
            LEFT JOIN accommodation a ON p.id = a.participant_id
            LEFT JOIN registration_types rt ON a.registration_type_id = rt.id
            WHERE pw.workshop_id = :workshop_id
            AND p.status = 'active'
            ORDER BY p.confirmation_sent DESC, p.id ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':workshop_id', (int) $workshopId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    /**
     * Get all participants (both onsite and online)
     * Includes accommodation details for onsite participants.
     * 
     * @return array List of participants
     */
    public function getAllParticipants()
    {
        $sql = "
          SELECT 
                p.*, 
                IFNULL(rt.description, 'Not Assigned') AS accommodation,
                (
                    SELECT pm.method 
                    FROM payments pay 
                    LEFT JOIN payment_methods pm ON pay.payment_method_id = pm.id
                    WHERE pay.participant_id = p.id
                    ORDER BY pay.created_at DESC 
                    LIMIT 1
                ) AS payment_method_name
            FROM participants p
            LEFT JOIN accommodation a ON p.id = a.participant_id
            LEFT JOIN registration_types rt ON a.registration_type_id = rt.id
            ORDER BY p.created_at DESC;
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
