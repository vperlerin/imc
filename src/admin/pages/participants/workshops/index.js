
import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import classNames from "classnames";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useApiWorkshopsParticipants } from "api/participants/workshops.js";
import { useApiDeleteParticipant } from "@/admin/api/participants/delete"; 
import axios from "axios";

const AdminParticipantsWorkshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState("1");
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorDeletion, setErrorDeletion] = useState('');

  const { participants, loading, error, setParticipants } = useApiWorkshopsParticipants(selectedWorkshop);
  const { deleteParticipant, errorDelete, isDeleting } = useApiDeleteParticipant(setParticipants, setFilteredParticipants);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/api/workshops.php`)
      .then((response) => {
        if (response.data.success) {
          setWorkshops(response.data.data);
          setSelectedWorkshop(response.data.data[0]?.id || ""); // Default to the first workshop
        }
      })
      .catch((err) => console.error("Failed to fetch workshops:", err));
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

  // Handle delete button click
  const handleDeleteClick = (participant) => {
    setSelectedParticipant(participant);
    setShowDeleteModal(true);
  };

  const onDeleteParticipant = async (deleteType) => {
    if (!selectedParticipant) return;
    try {
      const response = await deleteParticipant(selectedParticipant, deleteType);
      if (response?.data?.success) {
        setSuccess(response.data.message || "Participant deleted successfully!");
      } else {
        setErrorDeletion(response?.data?.message || "Failed to delete participant.");
      }
    } catch (error) {
      setErrorDeletion("An unexpected error occurred.");
    }
  };

  const breadcrumb = [{ url: "/admin/participants/workshops", name: "Workshop Participants" }];

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title="Workshop Participants"
      rightContent={
        <select
          className="form-select"
          value={selectedWorkshop}
          onChange={(e) => setSelectedWorkshop(e.target.value)}
        >
          {workshops.map((workshop) => (
            <option key={workshop.id} value={workshop.id}>
              {workshop.title} ({workshop.date})
            </option>
          ))}
        </select>
      }
    >
      {errorDeletion && <div className="alert alert-danger fw-bolder">{errorDeletion}</div>}
      {success && <div className="alert alert-success fw-bolder">{success}</div>}
      {error && <p className="alert alert-danger fw-bolder">{error}</p>}

      {loading || isDeleting ? (
        <Loader />
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
          <div className="table-responsive" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Reg. Date</th>
                  <th>Name</th>
                  <th>Reg. Type</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Confirmed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.created_at.split(' ')[0]}</td>
                      <td>{participant.title} {participant.first_name} {participant.last_name}</td>
                      <td>{participant.registration_type_id || "N/A"}</td>
                      <td>{participant.total_due}€</td>
                      <td>{participant.total_paid}€</td>
                      <td className={classNames({ "text-success": Number(participant.total_due) - Number(participant.total_paid) === 0 })}>
                        {(Number(participant.total_due) - Number(participant.total_paid)).toFixed(2)}€
                      </td>
                      <td>{participant.confirmation_sent === "1" ? "✅" : "❌"}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-sm btn-outline-danger fw-bolder" onClick={() => handleDeleteClick(participant)}>
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No participants found for this workshop.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {(showDeleteModal || showHardDeleteConfirm) && <div className="modal-backdrop fade show"></div>}

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
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-outline-danger fw-bolder" onClick={() => onDeleteParticipant("hard")}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContain>
  );
};

export default AdminParticipantsWorkshops;
