import { retry } from "utils/retry.js";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetch online participants.
 * @param {boolean} confirmedOnly - If true, only confirmed participants are returned.
 * @param {boolean} includeCancelled - If true, includes cancelled participants.
 */
export const useApiOnlineParticipants = (confirmedOnly = false, includeCancelled = false) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const params = new URLSearchParams();
        if (confirmedOnly) params.append("confirmed_only", "1");
        if (includeCancelled) params.append("include_cancelled", "1");

        const response = await retry(() =>
          axios.get(`${process.env.REACT_APP_API_URL}/admin/api/online_participants.php?${params.toString()}`),
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          setParticipants(response.data.data);
        } else {
          throw new Error(
            response.data.message || "Database access error, please try again.",
          );
        }
      } catch (err) {
        setError(
          err.message || "Failed to fetch participants. Please refresh the page.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [confirmedOnly, includeCancelled]); // Re-fetch on changes

  return { participants, loading, error, setParticipants };
};
