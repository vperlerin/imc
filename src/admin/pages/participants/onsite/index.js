import { CiSearch } from "react-icons/ci";
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
  const [errorDelete, setErrorDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/onsite_participants.php`);
        if (response.data.success) {
          setParticipants(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch participants. Please, refresh the page.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredParticipants(participants);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredParticipants(
        participants.filter((participant) => {
          const fieldValue = participant[searchType] ? String(participant[searchType]).toLowerCase() : "";
          return fieldValue.includes(lowerQuery);
        })
      );
    }
  }, [searchQuery, searchType, participants]);

  // Calculate totals
  const totalParticipants = participants.length;
  const totalConfirmed = participants.filter((p) => p.confirmation_sent === true).length;

  // Handle delete button click
  const handleDeleteClick = (participant) => {
    setSelectedParticipant(participant);
    setShowDeleteModal(true);
  };

  // Perform deletion
  const deleteParticipant = async (deleteType) => {
    if (!selectedParticipant) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/delete_participant.php`, {
        id: selectedParticipant.id,
        delete_type: deleteType,
      });

      if (response.data.success) {
        setParticipants(participants.filter(p => p.id !== selectedParticipant.id));
        setFilteredParticipants(filteredParticipants.filter(p => p.id !== selectedParticipant.id));
      } else {
        throw new Error(response.data.message || "Failed to delete participant.");
      }
    } catch (err) {
      setErrorDelete(err.message);
    } finally {
      setShowHardDeleteConfirm(false);
      setShowDeleteModal(false);
      setSelectedParticipant(null);
    }
  };

  const breadcrumb = [
    { url: "/admin/participants/onsite", name: "Onsite Participants" },
  ];

  return (
    <PageContain
      breadcrumb={breadcrumb}
      title="Onsite Participants"
      rightContent={
        <>
          <strong>Confirmed:</strong> {totalConfirmed} / {totalParticipants}
        </>
      }
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="alert alert-danger">{error}</p>
      ) : (
        <>
          {errorDelete && <p className="alert alert-danger">{errorDelete}</p>}
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
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Reg. Date</th>
                  <th>Name</th>
                  <th>Total Due</th>
                  <th>Total Paid</th>
                  <th>Pay. Method</th>
                  <th>Confirmed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.created_at.split(' ')[0]}</td>
                      <td>{participant.title} {participant.first_name} {participant.last_name}</td> 
                      <td>
                        {participant.payment_method === 'Paypal' ? (
                          <>{(parseFloat(participant.total_due) + parseFloat(participant.paypal_fee))}€</>
                        ) : (
                          <>{participant.total_due}€</>
                        )}
                      </td> 
                      <td>{participant.total_paid}€</td> 
                      <td>{participant.payment_method || "n/a"}</td>
                      <td>
                        {participant.confirmation_sent === true ? "✅" : "❌"}
                        {participant.confirmation_sent === true && (
                          (participant.confirmation_date)
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <a href={`/admin/participants/onsite/payment/${participant.id}`} className={classNames(css.action, "btn btn-sm btn-outline-success fw-bolder")}>Payments</a>
                          <a href={`/admin/participants/onsite/${participant.id}`} className={classNames(css.action, "btn btn-sm btn-outline-primary fw-bolder")}>Edit</a>
                          <button
                            className={classNames(css.action, "btn btn-sm btn-outline-danger fw-bolder")}
                            onClick={() => handleDeleteClick(participant)}
                          >
                            Cancel Registration
                          </button>
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
          </div>
        </>
      )}

      {(showDeleteModal || showHardDeleteConfirm) && <div className="modal-backdrop fade show"></div>}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedParticipant && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Registration</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel <b>{selectedParticipant.first_name} {selectedParticipant.last_name}</b>'s registration?</p>
                <p><strong>Choose:</strong></p>
                <ul>
                  <li><strong className="text-warning">Soft Delete:</strong> Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement.</li>
                  <li><strong className="text-danger">Hard Delete:</strong> Permanently removes data.</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-outline-warning fw-bolder" onClick={() => deleteParticipant("soft")}>Soft Delete</button>
                <button className="btn btn-outline-danger fw-bolder ms-auto" onClick={() => { setShowDeleteModal(false); setShowHardDeleteConfirm(true); }}>Hard Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hard Delete Confirmation Modal */}
      {showHardDeleteConfirm && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Permanent Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowHardDeleteConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Are you absolutely sure?</strong> This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowHardDeleteConfirm(false)}>No</button>
                <button className="btn btn-outline-danger  fw-bolder" onClick={() => deleteParticipant("hard")}>Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContain>
  );
};

export default AdminParticipantsOnsite;
