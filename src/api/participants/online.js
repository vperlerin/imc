import { retry } from "utils/retry.js";
import { useState, useEffect } from "react";
import axios from "axios";

export const useApiOnlineParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {  
    const fetchParticipants = async () => {
      try {
        const response =  await retry(() =>
          axios.get(`${process.env.REACT_APP_API_URL}/admin/api/onsite_participants.php`) 
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          setParticipants(response.data.data);
        } else {
          throw new Error(
            response.data.message || "Unexpected API response format.",
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
  }, []); // Runs only once when the component mounts

  return { participants, loading, error, setParticipants };
};
