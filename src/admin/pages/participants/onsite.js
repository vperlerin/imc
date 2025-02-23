import PageContain from "@/admin/components/page-contain";
import classNames from "classnames";
import css from './index.module.scss';
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminParticipantsOnsite = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Onsite Participants from API
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/onsite_participants.php`);
        if (response.data.success) {
          setParticipants(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch participants.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <PageContain title="Onsite Participants">

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Reg. Date</th>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Confirmation Sent</th>
              <th>Total Due (€)</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.created_at}</td>
                  <td>{participant.title}</td>
                  <td>{participant.first_name}</td>
                  <td>{participant.last_name}</td>
                  <td>{participant.confirmation_sent ? "✅ Yes" : "❌ No"}</td>
                  <td>{participant.total_due} €</td>
                  <td>{participant.payment_method || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No onsite participants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

    </PageContain>
  );
};

export default AdminParticipantsOnsite;
