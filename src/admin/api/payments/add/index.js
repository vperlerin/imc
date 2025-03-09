import { retry } from "utils/retry.js";
import { useState, useCallback } from "react";
import axios from "axios"; 
import { useApiPayments } from "@/admin/api/payments";

export const useApiAddPayment = (participantId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refetchPayments } = useApiPayments(participantId); // Get refetch function

  const addPayment = useCallback(async (paymentData) => {
    if (!participantId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await retry(() =>
        axios.post(`${process.env.REACT_APP_API_URL}/admin/api/add_payment.php`, {
          participant_id: participantId,
          amount: parseFloat(paymentData.amount),
          payment_method_id: paymentData.paymentMethodId,
          payment_date: paymentData.paymentDate,
          admin_note: paymentData.adminNote || null,
        }, {
          headers: { "Content-Type": "application/json" }
        })
      );

      if (response.data.success) {
        await refetchPayments(); // Refresh payments list after success
        return { success: true, message: "Payment added successfully!" };
      } else {
        throw new Error(response.data.message || "Failed to add payment.");
      }
    } catch (err) {
      setError(err.message || "Error adding payment.");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [participantId, refetchPayments]);

  return { addPayment, loading, error };
};
