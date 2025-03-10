import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiDeleteParticipant } from "@/admin/api/participants/delete";
import AdminTable from "@/admin/components/admin-table";


const AdminParticipantsOnline = () => {
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorDeletion, setErrorDeletion] = useState('');

  const { participants, loading, error, setParticipants } = useApiOnlineParticipants();
  const { deleteParticipant, errorDelete, isDeleting } = useApiDeleteParticipant(setParticipants, setFilteredParticipants);

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
  const onDeleteParticipant = async (deleteType) => {
    if (!selectedParticipant) return;

    try {
      const response = await deleteParticipant(selectedParticipant, deleteType);
      if (response?.data?.success) {
        setSuccess(response.data.message || "Participant deleted successfully!");
      } else {
        setErrorDeletion(response?.data?.message || "Impossible to delete the participant for now, please try again later.");
      }
    } catch (error) {
      setErrorDeletion("An unexpected error occurred while deleting the participant.");
    }
  };

  const breadcrumb = [
    { url: "/admin/participants/onsite", name: "Onsite Participants" },
  ];

  console.log("PARTICIPANTS IN ADMIN TABLE ", participants);

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title="ONLINE Participants"
      rightContent={
        <>
          <strong>Confirmed:</strong> {totalConfirmed} / {totalParticipants}
        </>
      }
    >
      {errorDeletion && (
        <div className="alert alert-danger fw-bolder">
          {errorDeletion}
        </div>
      )}
      {success && (
        <div className="alert alert-success fw-bolder">
          {success}
        </div>
      )}
      {error && (
        <p className="alert alert-danger fw-bolder">{error}</p>
      )}

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
          <AdminTable participants={filteredParticipants} onDelete={handleDeleteClick}/>
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
                {false && (
                  <>
                    <p>Are you sure you want to cancel <b>{selectedParticipant.first_name} {selectedParticipant.last_name}</b>'s registration?</p>
                    <p><strong>Choose:</strong></p>
                    <ul>
                      <li><strong className="text-warning">Soft Delete:</strong> Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement.</li>
                      <li><strong className="text-danger">Hard Delete:</strong> Permanently removes data.</li>
                    </ul>*
                  </>
                )}
                Are you sure you want to permanently delete all data related to this participant?
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                {false && (
                  <button className="btn btn-outline-warning fw-bolder" onClick={() => onDeleteParticipant("soft")}>Soft Delete</button>
                )}

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

                <button className="btn btn-outline-danger  fw-bolder" onClick={() => { onDeleteParticipant("hard"); setShowHardDeleteConfirm(false); }}>Yes, Delete</button>
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowHardDeleteConfirm(false)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContain>
  );
};

export default AdminParticipantsOnline;
