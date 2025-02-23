import { CiSearch } from "react-icons/ci";
//
import PageContain from "@/admin/components/page-contain";
import classNames from "classnames";
import css from './index.module.scss';
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminParticipantsOnsite = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");

  useEffect(() => {
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

  // Filter participants based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredParticipants(participants);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredParticipants(
        participants.filter((participant) =>
          participant[searchType].toLowerCase().includes(lowerQuery)
        )
      );
    }
  }, [searchQuery, searchType, participants]);

  // Calculate totals
  const totalParticipants = participants.length;
  const totalConfirmed = participants.filter((p) => p.confirmation_sent === true).length;

  return (
    <PageContain
      title="Onsite Participants"
      rightContent={
        <>
          <strong> Confirmed:</strong> {totalConfirmed} / {totalParticipants}
        </>
      }
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <>

          <div className="d-flex gap-2 mb-3">
            <select
              className="form-select w-auto"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="last_name">Search by Last Name</option>
              <option value="email">Search by Email</option>
            </select>
            <div className="position-relative w-auto">
              <input
                type="text"
                className="form-control pe-5"
                placeholder={`Enter ${searchType.replace("_", " ")}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <CiSearch className="position-absolute top-50 end-0 translate-middle-y me-2" />
            </div>

          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Reg. Date</th>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Total Due (€)</th>
                <th>Payment Method</th>
                <th>Confirmed</th>
                <th></th>
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
                    <td>{participant.total_due} €</td>
                    <td>{participant.payment_method || "n/a"}</td>
                    <td>{participant.confirmation_sent === true ? "✅" : "❌"}</td>
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <a href={`/admin/participants/onsite/${participant.id}/confirm`} className={classNames(css.action, "btn btn-sm btn-outline-success fw-bolder")}>Confirm</a>
                        <a href={`/admin/participants/onsite/${participant.id}`} className={classNames(css.action, "btn btn-sm btn-outline-primary fw-bolder")}>Edit</a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No onsite participants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>

      )}

    </PageContain>
  );
};

export default AdminParticipantsOnsite;
