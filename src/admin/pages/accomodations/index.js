import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useState } from "react";
import { useApiParticipantsWithRegistration } from "api/participants/accomodations.js";
import DocButton from "@/admin/components/doc-button";

const AdminAccommodations = ({ typeFilter = 'not_no' }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { participants, loading, error } = useApiParticipantsWithRegistration(typeFilter);
  const searchType = "last_name";

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Filter participants based on search
  let filteredParticipants = participants || [];

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
      breadcrumb={[{ url: "/admin/accommodations/", name: "Participants' Accommodations" }]}
      isMaxWidth
      title="Participants' Accommodations"
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <>
          <div className="d-flex gap-2 mb-3">
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

            <DocButton
              className="ms-auto"
              link={`${process.env.REACT_APP_API_URL}/doc_accommodations.php?type=${typeFilter}`}
            />
          </div>

          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("created_at")}>
                    Reg. Date {sortColumn === "created_at" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>
                    Name {sortColumn === "last_name" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("registration_type")}>
                    Reg. Type {sortColumn === "registration_type" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("price")}>
                    Price {sortColumn === "price" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("description")}>
                    Description {sortColumn === "description" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" onClick={() => handleSort("room_left")}>
                    Room Left {sortColumn === "room_left" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.id}>
                      <td>{participant.created_at?.split(" ")[0] || "N/A"}</td>
                      <td>
                        {participant.title} {participant.first_name} {participant.last_name}
                      </td>
                      <td>{participant.registration_type || "N/A"}</td>
                      <td>{participant.price ? `$${participant.price}` : "N/A"}</td>
                      <td>{participant.description || "N/A"}</td>
                      <td>{participant.room_left ?? "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No participants found.
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

export default AdminAccommodations;
