<?php
require_once 'config.php';

class ParticipantManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Inserts a new participant into the database
     */
    public function saveParticipant($data, $passwordHash) {
        $stmt = $this->pdo->prepare("
            INSERT INTO participants (title, first_name, last_name, gender, dob, email, phone, address, postal_code, city, country, organization, password_hash, created_at, updated_at)
            VALUES (:title, :first_name, :last_name, :gender, :dob, :email, :phone, :address, :postal_code, :city, :country, :organization, :password_hash, NOW(), NOW())
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
            ':password_hash' => $passwordHash
        ]);

        return $this->pdo->lastInsertId();
    }

    /**
     * Updates participant details
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
                updated_at = NOW()
            WHERE id = :id
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
            ':organization' => $data['organization'] ?? null
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
