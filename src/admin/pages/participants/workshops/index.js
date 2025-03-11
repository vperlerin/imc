import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import classNames from "classnames";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useApiWorkshopsParticipants } from "api/participants/workshops.js";
import { useApiSpecificData } from "api/specific-data";

const AdminParticipantsWorkshops = ({ workshopId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name"); 
  const [sortType, setSortType] = useState("all");
  const { participants, loading } = useApiWorkshopsParticipants(workshopId);
  const { workshops, loading: loadingWorkshops  } = useApiSpecificData();

  // Find the current workshop based on workshopId
  const currentWorkshop = workshops?.find(w => w.id === String(workshopId));
  const breadcrumb = [{ url: "/admin/participants/workshops/", name: `${currentWorkshop && currentWorkshop.title} Participants` }];
  console.log("participants? ", participants);


  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title={currentWorkshop && currentWorkshop.title}
    >
      {loading || loadingWorkshops ? (
        <Loader />
      ) : (
        <>

          <div className="d-flex gap-2 mb-3">
            {/* Search Filter */}
            <select className="form-select w-auto" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
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

            {/* Sorting by Type */}
            <select className="form-select w-auto" value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="all">All</option>
              <option value="online">Online</option>
              <option value="onsite">On-Site</option>
            </select>
          </div>

          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Reg. Date</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Reg. Type</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Confirmed</th>
                </tr>
              </thead>
              <tbody>
                {participants.length > 0 ? (
                  participants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.created_at.split(" ")[0]}</td>
                      <td>{participant.is_online === "0" ? "ON-SITE" : "ONLINE"}</td>
                      <td>
                        {participant.title} {participant.first_name} {participant.last_name}
                      </td>
                      <td>{participant.registration_type_id || "N/A"}</td>
                      <td>{participant.total_due}€</td>
                      <td>{participant.total_paid}€</td>
                      <td
                        className={classNames({
                          "text-success": Number(participant.total_due) - Number(participant.total_paid) === 0,
                        })}
                      >
                        {(Number(participant.total_due) - Number(participant.total_paid)).toFixed(2)}€
                      </td>
                      <td>{participant.confirmation_sent === "1" ? "✅" : "❌"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No participants found for this workshop.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </PageContain>
  );
};

export default AdminParticipantsWorkshops;