import AdminTable from '@/admin/components/admin-table';
import classNames from 'classnames';
import cssTabs from 'styles/components/tabs.module.scss';
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";
import { useApiDeleteParticipant } from "@/admin/api/participants/delete";
import { useParams, useNavigate } from "react-router-dom";
import DocButton from "@/admin/components/doc-button";

const AdminParticipantsOnsite = () => {
  const { tab } = useParams();
  //
  const [activeTab, setActiveTab] = useState(tab || "unconfirmed");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHardDeleteConfirm, setShowHardDeleteConfirm] = useState(false);
  const [success, setSuccess] = useState('');
  const [errorDeletion, setErrorDeletion] = useState('');
  const navigate = useNavigate();
  const { participants, loading, error, setParticipants } = useApiOnsiteParticipants(false, true);
  const { deleteParticipant, errorDelete, isDeleting } = useApiDeleteParticipant(setParticipants, setFilteredParticipants);

  useEffect(() => {
    setActiveTab(tab || "unconfirmed");
  }, [tab]);

  useEffect(() => {
    const baseList = participants.filter((p) => {
      if (activeTab === "confirmed") {
        return p.confirmation_sent === "1" && p.status !== "cancelled";
      }
      if (activeTab === "cancelled") {
        return p.status === "cancelled";
      }
      // Default: unconfirmed
      return p.confirmation_sent !== "1" && p.status !== "cancelled";
    });

    if (!searchQuery) {
      setFilteredParticipants(baseList);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredParticipants(
        baseList.filter((participant) => {
          const fieldValue = participant[searchType]
            ? String(participant[searchType]).toLowerCase()
            : "";
          return fieldValue.includes(lowerQuery);
        })
      );
    }
  }, [searchQuery, searchType, participants, activeTab]);

  // Calculate totals
  const totalCancelled = participants.filter(p => p.status === "cancelled").length;
  const totalConfirmed = participants.filter(p => p.confirmation_sent === "1" && p.status !== "cancelled").length;
  const totalUnconfirmed = participants.filter(p => p.confirmation_sent !== "1" && p.status !== "cancelled").length;

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
        setErrorDeletion('');
      } else {
        setErrorDeletion(response?.data?.message || "Impossible to delete the participant for now, please try again later.");
      }
    } catch (error) {
      setErrorDeletion("An unexpected error occurred while deleting the participant.");
    } finally {
      // Close the correct modal depending on type
      if (deleteType === 'soft') {
        setShowDeleteModal(false);
      } else {
        setShowHardDeleteConfirm(false);
      }

      setSelectedParticipant(null);
    }
  };


  const breadcrumb = [
    { url: "/admin/participants/onsite", name: "On-site Participants" },
  ];

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title="ON-SITE Participants"
      rightContent={
        <>
          <>
            <strong>Confirmed:</strong> <strong className="text-success">{totalConfirmed}</strong>{' '}
            | <strong>Unconfirmed:</strong> <strong className="text-warning">{totalUnconfirmed}</strong>{' '}
            | <strong>Cancelled:</strong> <strong className="text-danger">{totalCancelled}</strong>{' '}
            | <strong>Total:</strong> <strong>{participants.length}</strong>
          </>
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
          <div className="d-flex flex-column flex-md-row gap-2 mb-3">
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

            <DocButton
              className="ms-auto"
              link={`${process.env.REACT_APP_API_URL}/doc_participants.php`}
            />
          </div>


          <ul className={classNames('nav nav-tabs mb-3 mt-2', cssTabs.tab, 'flex-column flex-sm-row w-100')}>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "unconfirmed" ? cssTabs.active : ""}`}
                href={`/admin/participants/onsite`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/participants/onsite`);
                }}
              >
                Unconfirmed
                <span className="badge text-bg-warning ms-2">{totalUnconfirmed}</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "confirmed" ? cssTabs.active : ""}`}
                href={`/admin/participants/onsite/confirmed`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/participants/onsite/confirmed`)
                }}
              >
                Confirmed
                <span className="badge text-bg-success ms-2">{totalConfirmed}</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "cancelled" ? cssTabs.active : ""}`}
                href={`/admin/participants/onsite/cancelled`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/participants/onsite/cancelled`)
                }}
              >
                Cancelled
                <span className="badge text-bg-danger ms-2">{totalCancelled}</span>
              </a>
            </li>
          </ul>

          <AdminTable participants={filteredParticipants} onDelete={handleDeleteClick} />
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

                <>
                  <p>Are you sure you want to cancel <b>{selectedParticipant.first_name} {selectedParticipant.last_name}</b>'s registration?</p>
                  <p><strong>Choose:</strong></p>
                  <ul>
                    <li><strong className="text-warning">Soft Delete:</strong> Keeps record but marks as 'cancelled' - so we can keep track of the reimbursement.</li>
                    <li><strong className="text-danger">Hard Delete:</strong> Permanently removes data.</li>
                  </ul>
                </>

              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-outline-warning fw-bolder" onClick={() => onDeleteParticipant("soft")}>Soft Delete</button>
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

export default AdminParticipantsOnsite;
