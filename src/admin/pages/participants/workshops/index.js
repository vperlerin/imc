import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useApiWorkshopsParticipants } from "api/participants/workshops.js";
import { useApiSpecificData } from "api/specific-data";

const AdminParticipantsWorkshops = ({ workshopId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("all");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { participants, loading } = useApiWorkshopsParticipants(workshopId);
  const { workshops, loading: loadingWorkshops } = useApiSpecificData();
  const searchType = "last_name";

  // Find the current workshop based on workshopId
  const currentWorkshop = workshops?.find(w => w.id === String(workshopId));

  const breadcrumb = [{ url: "/admin/participants/workshops/", name: `${currentWorkshop ? currentWorkshop.title : "Workshop"} Participants` }];

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Filter participants based on search and type
  let filteredParticipants = participants || [];

  if (sortType !== "all") {
    filteredParticipants = filteredParticipants.filter(participant =>
      sortType === "online" ? participant.is_online === "1" : participant.is_online === "0"
    );
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredParticipants = filteredParticipants.filter(participant => {
      const fieldValue = participant[searchType] ? String(participant[searchType]).toLowerCase() : "";
      return fieldValue.includes(lowerQuery);
    });
  }

  // Sort participants based on selected column
  if (sortColumn) {
    filteredParticipants = [...filteredParticipants].sort((a, b) => {
      let valueA = a[sortColumn] ?? "";
      let valueB = b[sortColumn] ?? "";

      // Convert values for proper sorting
      if (["created_at"].includes(sortColumn)) {
        valueA = new Date(valueA).getTime() || 0;
        valueB = new Date(valueB).getTime() || 0;
      } else {
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
      title={currentWorkshop ? currentWorkshop.title : "Workshop Participants"}
    >
      {loading || loadingWorkshops ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex gap-2 mb-3">
            {/* Sorting by Type */}
            <select className="form-select w-auto" value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value="all">All</option>
              <option value="online">Online</option>
              <option value="onsite">On-Site</option>
            </select>

            {/* Search Filter */}
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

          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("created_at")}>
                    Reg. Date {sortColumn === "created_at" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("is_online")}>
                    Type {sortColumn === "is_online" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>
                    Name {sortColumn === "last_name" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("registration_type_description")}>
                    Reg. Type {sortColumn === "registration_type_description" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("confirmation_sent")}>
                    Confirmed {sortColumn === "confirmation_sent" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.created_at.split(" ")[0]}</td>
                      <td>{participant.is_online === "0" ? "ON-SITE" : "ONLINE"}</td>
                      <td>
                        {participant.title} {participant.first_name} {participant.last_name}
                      </td>
                      <td>{participant.registration_type_description || "n/a"}</td>
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
