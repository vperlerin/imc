<?php

class PaymentManager
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Add a new payment for a participant.
     */
    public function addPayment($participantId, $amount, $paymentMethodId, $paymentDate, $adminNote = null)
    {
        try {
            // Start transaction only if not already started
            if (!$this->pdo->inTransaction()) {
                $this->pdo->beginTransaction();
            }
    
            // Insert payment record
            $stmt = $this->pdo->prepare("
                INSERT INTO payments (participant_id, amount, payment_method_id, payment_date, admin_note, created_at, updated_at)
                VALUES (:participant_id, :amount, :payment_method_id, :payment_date, :admin_note, NOW(), NOW())
            ");
            $stmt->execute([
                ':participant_id' => $participantId,
                ':amount' => $amount,
                ':payment_method_id' => $paymentMethodId,
                ':payment_date' => $paymentDate,
                ':admin_note' => $adminNote
            ]);
    
            // Update participant financials
            if ($amount > 0) {
                $updateStmt = $this->pdo->prepare("
                    UPDATE participants 
                    SET total_paid = total_paid + :amount, 
                        total_due = total_due - :amount 
                    WHERE id = :participant_id
                ");
            } else {
                $updateStmt = $this->pdo->prepare("
                    UPDATE participants 
                    SET total_paid = total_paid - :amount, 
                        total_due = total_due + :amount, 
                        total_reimbursed = total_reimbursed + ABS(:amount) 
                    WHERE id = :participant_id
                ");
            }
    
            $updateStmt->execute([
                ':amount' => abs($amount),
                ':participant_id' => $participantId
            ]);
    
            // Commit transaction
            $this->pdo->commit();
            return true;
        } catch (PDOException $e) {
            // Check if a transaction is active before rolling back
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            echo("Database Error in addPayment: " . $e->getMessage());
            return false;
        } catch (Exception $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            echo("General Error in addPayment: " . $e->getMessage());
            return false;
        }
    }
    

    /**
     * Get a list of payments made by a participant.
     */
    public function getPaymentsByParticipant($participantId)
    {
        $stmt = $this->pdo->prepare("
            SELECT p.id, p.payment_date, p.amount, p.payment_method_id, pm.method AS payment_method, p.admin_note, p.created_at 
            FROM payments p
            JOIN payment_methods pm ON p.payment_method_id = pm.id
            WHERE p.participant_id = ?
            ORDER BY p.payment_date DESC, p.created_at DESC
        ");
        $stmt->execute([$participantId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Update an existing payment.
     */
    public function updatePayment($paymentId, $amount, $paymentMethodId, $adminNote = null)
    {
        $stmt = $this->pdo->prepare("
            UPDATE payments 
            SET amount = :amount, payment_method_id = :payment_method_id, admin_note = :admin_note, updated_at = NOW()
            WHERE id = :payment_id
        ");
        return $stmt->execute([
            ':payment_id' => $paymentId,
            ':amount' => $amount,
            ':payment_method_id' => $paymentMethodId,
            ':admin_note' => $adminNote
        ]);
    }

    /**
     * Delete a payment record.
     */
    public function deletePayment($paymentId)
    {
        $stmt = $this->pdo->prepare("DELETE FROM payments WHERE id = ?");
        return $stmt->execute([$paymentId]);
    }

    public function getPaymentMethod($method)
    {
        $stmt = $this->pdo->prepare("SELECT id FROM payment_methods WHERE method = ? LIMIT 1");
        $stmt->execute([$method]);
        return $stmt->fetchColumn();
    }

    public function getPaymentMethods()
    {
        $stmt = $this->pdo->query("SELECT id, method FROM payment_methods");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
