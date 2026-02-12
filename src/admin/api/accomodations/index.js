import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { retry } from "utils/retry.js";

export const fetchAvailableRooms = async () => {
  const response = await retry(() =>
    axios.get(`${process.env.REACT_APP_API_URL}/api/get_left_accommodations.php`)
  );

  if (!response?.data?.success) {
    throw new Error(response?.data?.message || "Error fetching available rooms.");
  }

  return response.data.data || [];
};
 
export const useApiAvailableRooms = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableRoomsHook = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAvailableRooms();
      setAvailableRooms(data);
    } catch (err) {
      setError(err.message || "Error fetching available rooms.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailableRoomsHook();
  }, [fetchAvailableRoomsHook]);

  return {
    availableRooms,
    loading,
    error,
    refetchAvailableRooms: fetchAvailableRoomsHook,
  };
};
