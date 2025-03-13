import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { retry } from "utils/retry.js";

export const useApiAvailableRooms = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableRooms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await retry(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/api/get_left_accommodations.php`)
      );

      if (!response.data.success) {
        setError(response.data.message || "Error fetching available rooms.");
      } else {
        setAvailableRooms(response.data.data || []);
      }
    } catch (err) {
      setError(err.message || "Error fetching available rooms.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch available rooms on mount
  useEffect(() => {
    fetchAvailableRooms();
  }, [fetchAvailableRooms]);

  return { availableRooms, loading, error, refetchAvailableRooms: fetchAvailableRooms };
};
