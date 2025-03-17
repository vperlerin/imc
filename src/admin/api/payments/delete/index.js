import { retry } from "utils/retry.js";
import { useState, useCallback } from "react";
import axios from "axios";
import { useApiPayments } from "@/admin/api/payments";

export const useApiDeletePayment = (participantId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refetchPayments } = useApiPayments(participantId); 

  const deletePayment = useCallback(
    async (paymentId) => {
      if (!participantId || !paymentId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await retry(() =>
          axios.delete(
            `${process.env.REACT_APP_API_URL}/admin/api/delete_payment.php`,
            {
              data: { paymentId },
              headers: { "Content-Type": "application/json" },
            }
          )
        );

        if (response.data.success) {
          await refetchPayments();
          return { success: true, message: "Payment deleted successfully!" };
        } else {
          throw new Error(response.data.message || "Failed to delete payment.");
        }
      } catch (err) {
        setError(err.message || "Error deleting payment.");
        return { success: false, message: err.message };
      } finally {
        setLoading(false);
      }
    },
    [participantId, refetchPayments]
  );

  return { deletePayment, loading, error };
};
