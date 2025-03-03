import { useState } from "react";
import axios from "axios";

const useApiDeleteParticipant = ( setParticipants, setFilteredParticipants) => {
  const [errorDelete, setErrorDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteParticipant = async (selectedParticipant, deleteType, onComplete = () => {}) => {
    if (!selectedParticipant) return;

    setIsDeleting(true);
    setErrorDelete(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/api/delete_participant.php`, {
        id: selectedParticipant.id,
        delete_type: deleteType,
      });

      if (response.data.success) {
        setParticipants((prev) => prev.filter((p) => p.id !== selectedParticipant.id));
        setFilteredParticipants((prev) => prev.filter((p) => p.id !== selectedParticipant.id));
        onComplete(true);  
      } else {
        throw new Error(response.data.message || "Failed to delete participant.");
      }
    } catch (err) {
      setErrorDelete(err.message);
      onComplete(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteParticipant, errorDelete, isDeleting };
};

export default useApiDeleteParticipant;
