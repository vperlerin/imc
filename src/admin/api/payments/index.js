import { retry } from "utils/retry.js";
import { useState, useEffect, useCallback } from "react";
import axios from "axios"; 

export const useApiPayments = (participantId, fetchTrigger = 0) => {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayments= useCallback(async () => {
    if (!participantId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await retry(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/admin/api/get_payments.php?id=${participantId}`)
      ); 

      if (response.data.success && response.data.data) {
        setPayments(response.data.data);
      } else {
        throw new Error(response.data.message || "Payments not found.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch payments data.");
    } finally {
      setLoading(false);
    }
  }, [participantId]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments, fetchTrigger]);  

  return { payments, loading, error, setPayments, refetchPayments: fetchPayments };
};
