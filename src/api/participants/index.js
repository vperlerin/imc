import { useState, useEffect } from "react";
import axios from "axios"; 

export const useApiParticipant = (participantId) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("PARTICIPANT ID IN API ", participantId);

    if (!participantId) {
      return;
    }

    const fetchParticipant = async () => {
      console.log("FETCH PARTICPATN !!!!!");

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/get_participant.php?id=${participantId}`
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

  console.log("IN useApiParticipant ", participantId);


  return { participant, loading, error, setParticipant };
};
