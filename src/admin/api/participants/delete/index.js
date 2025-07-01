import { useState } from "react";
import axios from "axios";

export const useApiDeleteParticipant = (
  setParticipants,
  setFilteredParticipants,
) => {
  const [errorDelete, setErrorDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteParticipant = async (selectedParticipant, deleteType) => {
    if (!selectedParticipant) return null;

    setIsDeleting(true);
    setErrorDelete(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/delete_participant.php`,
        {
          id: selectedParticipant.id,
          delete_type: deleteType,
        },
      );

      if (response.data.success) {
        if (deleteType === 'hard') {
          setParticipants((prev) =>
            prev.filter((p) => p.id !== selectedParticipant.id),
          );
          setFilteredParticipants((prev) =>
            prev.filter((p) => p.id !== selectedParticipant.id),
          );
        } else {
          // Soft delete: update participant's status to 'cancelled'
          setParticipants((prev) =>
            prev.map((p) =>
              p.id === selectedParticipant.id
                ? { ...p, status: 'cancelled' }
                : p
            )
          );
          setFilteredParticipants((prev) =>
            prev.map((p) =>
              p.id === selectedParticipant.id
                ? { ...p, status: 'cancelled' }
                : p
            )
          );
        }
      }
 
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setErrorDelete(errorMessage);
      return { data: { success: false, message: errorMessage } };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteParticipant, errorDelete, isDeleting };
};
