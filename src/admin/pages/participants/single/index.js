import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!participant) return <div className="text-gray-500 text-center">No participant data available.</div>;

  return (
    <PageContain title={`Participant: ${participant.first_name} ${participant.last_name}`}>
      <div className="p-4 border rounded shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-2">{participant.first_name} {participant.last_name}</h2>
        <p><strong>Email:</strong> {participant.email}</p>
        <p><strong>Phone:</strong> {participant.phone}</p>
        <p><strong>Country:</strong> {participant.country}</p>
        <p><strong>Confirmation Sent:</strong> {participant.confirmation_sent ? "Yes" : "No"}</p>
        <p><strong>Total Due:</strong> ${participant.total_due}</p>
        <p><strong>Total Paid:</strong> ${participant.total_paid}</p>
        <p><strong>Payment Method:</strong> {participant.payments?.map(p => p.payment_method).join(", ") || "N/A"}</p>
      </div>
    </PageContain>
  );
};

export default AdminParticipantsUser;
