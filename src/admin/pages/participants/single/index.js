import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Identitity from "components/registration/identity.js";

const AdminParticipantsUser = () => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { participantId } = useParams();

  useEffect(() => {
    const fetchParticipant = async () => {
      if (!participantId) {
        setError("Invalid participant ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/participant.php?id=${participantId}`
        );

        if (response.data.success) {
          setParticipant(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch participant. Please refresh the page.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [participantId]);



  return (
    <PageContain title={loading ? 'Loading…' : `Participant: ${participant?.participant.first_name} ${participant?.participant.last_name}`}>
      <div className="position-relative">
        {!!loading && <Loader />}
        {!!error && !loading && <div className="alert alert-danger">{error}</div>}
        {!participant && !loading && <div className="alert alert-danger">No participant data available.</div>}

      </div>

     

    </PageContain>
  );
};

export default AdminParticipantsUser;
