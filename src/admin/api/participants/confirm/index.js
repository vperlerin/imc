import { useState } from "react";
import axios from "axios";

export const useApiConfirmParticipant = () => {
  const [errorConfirm, setErrorConfirm] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const confirmParticipant = async (participantId, confirmationData) => {
    if (!participantId) return null;

    setIsConfirming(true);
    setErrorConfirm(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/confirm.php`,
        {
          id: participantId,
          ...confirmationData,
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      setErrorConfirm(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsConfirming(false);
    }
  };

  return { confirmParticipant, errorConfirm, isConfirming };
};