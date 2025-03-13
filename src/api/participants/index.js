import { retry } from "utils/retry.js";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useApiParticipant = (
  participantId,
  isOnline = false,
  fetchTrigger = 0,
  withAdminNotes = false,
) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchParticipant = useCallback(async () => {
    if (!participantId) return;

    setLoading(true);
    setError(null);

    try {
      const endpoint = isOnline
        ? "get_online_participant"
        : "get_onsite_participant";
      const response = await retry(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}.php`, {
          params: {
            id: participantId,
            admin_notes: withAdminNotes,
          },
        }),
      );

      setError(null);
      if (response.data.success && response.data.data) {
        setParticipant(response.data.data);
      } else {
        setError(response.data.message || "Participant not found.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch participant data.");
    } finally {
      setLoading(false);
    }
  }, [participantId, isOnline, withAdminNotes]);

  useEffect(() => {
    setError(null);
    fetchParticipant();
  }, [fetchParticipant, fetchTrigger]);

  return {
    participant,
    loading,
    error,
    setParticipant,
    refetchParticipant: fetchParticipant,
  };
};
