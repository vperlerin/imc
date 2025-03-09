import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { retry } from "utils/retry.js";

export const useApiPayments = (participantId) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    if (!participantId) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await retry(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/admin/api/get_payments.php?id=${participantId}`)
      );

      if(!response.data.success) {
        setError(response.data.message || "Error fetching payments.");
      } else {
        setPayments(response.data.data || []);
      }
    } catch (err) {
      setError(err.message || "Error fetching payments.");
    } finally {
      setLoading(false);
    }
  }, [participantId]);

  // Fetch payments on mount
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetchPayments: fetchPayments };
};
