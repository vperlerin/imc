import { retry } from "utils/retry.js";
import { useState, useEffect } from "react";
import axios from "axios"; 

export const useApiParticipant = (participantId) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!participantId) {
      return;
    }

    const fetchParticipant = async () => { 
      setLoading(true);
      setError(null);

      try {
        const response = await retry(() =>
          axios.get(`${process.env.REACT_APP_API_URL}/api/get_participant.php?id=${participantId}`)
        );

        if (response.data.success && response.data.data) {
          setParticipant(response.data.data);
        } else {
          throw new Error(response.data.message || "Participant not found.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch participant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [participantId]);  
 
  return { participant, loading, error, setParticipant };
};
