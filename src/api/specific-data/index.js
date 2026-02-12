// api/specific-data/index.js
import { retry } from "utils/retry.js";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const fetchSpecificData = async () => {
  const response = await retry(() =>
    axios.get(`${process.env.REACT_APP_API_URL}/get_specific_data.php`)
  );

  if (!response?.data?.success) {
    throw new Error(
      response?.data?.message ||
      "Failed to fetch specific IMC data. Please, refresh the page."
    );
  }

  return response.data.data || {};
};

export const useApiSpecificData = () => {
  const [workshops, setWorkshops] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchSpecificData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSpecificData();

      setWorkshops(data.workshops || []);
      setPaymentMethods(data.payment_methods || []);
      setRegistrationTypes(data.registration_types || []);
      setSessions(data.sessions || []);
    } catch (err) {
      setError(
        err.message ||
        "Failed to fetch specific IMC data. Please, refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchSpecificData();
  }, [refetchSpecificData]);

  return {
    error,
    loading,
    paymentMethods,
    refetchSpecificData,
    registrationTypes,
    sessions,
    workshops,
  };
};
