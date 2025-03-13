import { retry } from "utils/retry.js";
import { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import { useNavigate } from "react-router-dom";

export const useApiLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await retry(() =>
        axios.get(`${process.env.REACT_APP_API_URL}/auth/logout.php`, {
          withCredentials: true,
        }),
      );

      if (response.data.success) {
        dispatch(authActions.logout());
        localStorage.removeItem("session");
        navigate("/");
      } else {
        throw new Error(response.data.message || "An error occurred.");
      }
    } catch (err) {
      setError(err.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  return { logout, loading, error };
};
