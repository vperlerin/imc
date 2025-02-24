<?php

class PaymentManager {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function savePayment($participantId, $data) {
        $stmt = $this->pdo->prepare("
            INSERT INTO payments (participant_id, amount, payment_method_id, admin_note, created_at, updated_at)
            VALUES (?, ?, (SELECT id FROM payment_methods WHERE method = ? LIMIT 1), ?, NOW(), NOW())
        ");
        $stmt->execute([
            $participantId,
            0.00,   
            $data['payment_method'],
            null
        ]);
    }

    public function getPaymentMethod($method) {
        $stmt = $this->pdo->prepare("SELECT id FROM payment_methods WHERE method = ? LIMIT 1");
        $stmt->execute([$method]);
        return $stmt->fetchColumn();
    } 
}
