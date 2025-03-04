import { useState, useEffect } from "react";
import axios from "axios";

export const useApiSpecificData = () => {
  const [workshops, setWorkshops] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecificData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/get_specific_data.php`,
        );
        if (response.data.success) {
          setWorkshops(response.data.data.workshops || []);
          setPaymentMethods(response.data.data.payment_methods || []);
          setRegistrationTypes(response.data.data.registration_types || []);
          setSessions(response.data.data.sessions || []);
        } else {
          throw new Error(
            response.data.message ||
              "Failed to fetch specific IMC data. Please, refresh the page.",
          );
        }
      } catch (err) {
        setError(
          err.message ||
            "Failed to fetch specific IMC data. Please, refresh the page.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificData();
  }, []); // Runs only once when the component mounts

  return {
    workshops,
    paymentMethods,
    registrationTypes,
    sessions,
    loading,
    error,
  };
};
