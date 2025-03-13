import { retry } from "utils/retry.js";
import { useState, useEffect } from "react";
import axios from "axios";

export const useApiWorkshopsParticipants = (workshopId) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workshopId) {
      setLoading(false);
      setError("Workshop ID is required.");
      return;
    }

    const fetchParticipants = async () => {
      try {
        const response = await retry(() =>
          axios.get(
            `${process.env.REACT_APP_API_URL}/api/get_workshops_participants.php`,
            { params: { workshop_id: workshopId } },
          ),
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
          err.message ||
            "Failed to fetch participants. Please refresh the page.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [workshopId]); // Re-fetch when workshopId changes

  return { participants, loading, error, setParticipants };
};
