import { useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import { useApiParticipantsWithRegistration } from "api/participants/accommodations.js";
import DocButton from "@/admin/components/doc-button";
import AvailableRooms from '@/admin/components/rooms';

const AdminAccommodations = ({ typeFilter = "" }) => {
  const [curFilter, setCurFilter] = useState(typeFilter || "not_no");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch participants data
  const { participants, loading, error } = useApiParticipantsWithRegistration(curFilter);

  const searchType = "last_name";

  // Function to handle sorting
  const handleSort = (column) => {
    setSortOrder(sortColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc");
    setSortColumn(column);
  };

  // Filter and sort participants efficiently using useMemo
  const filteredParticipants = useMemo(() => {
    let filtered = participants ? [...participants] : [];

    // Apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((participant) =>
        participant[searchType]?.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        let valueA = a[sortColumn] ?? "";
        let valueB = b[sortColumn] ?? "";

        // Convert values properly for sorting
        if (sortColumn === "created_at") {
          valueA = new Date(valueA).getTime() || 0;
          valueB = new Date(valueB).getTime() || 0;
        } else {
          valueA = valueA.toString().toLowerCase();
          valueB = valueB.toString().toLowerCase();
        }

        return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
    }

    return filtered;
  }, [participants, searchQuery, sortColumn, sortOrder]);

  return (
    <PageContain
      isMaxWidth
      title="Participants' Accommodations"
    >
      {loading ? (
        <Loader />
      ) : error  ? (
        <p className="text-danger">Error: {error || errorRooms}</p>
      ) : (
        <>
          <AvailableRooms className="mb-4"/>
          <div className="d-flex flex-column flex-md-row gap-2 mb-3">
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

            <select
              className="form-select w-auto"
              value={curFilter}
              onChange={(e) => setCurFilter(e.target.value)}
            >
              <option value="not_no">Staying at the hostel</option>
              <option value="no">No Accommodation</option>
            </select>

            <DocButton
              className="ms-auto"
              link={`${process.env.REACT_APP_API_URL}/doc_accommodations.php?type=${curFilter}`}
            />
          </div>

          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th onClick={() => handleSort("created_at")}>
                    Reg. Date
                  </th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>
                    Name {sortColumn === "last_name" && (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th className="sortable" >
                    Accommodation 
                  </th>
                  <th >
                    Confirmed
                  </th>
                  <th >
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
                    <tr key={participant.participant_id}>
                      <td>{participant.created_at?.split(" ")[0] || "n/a"}</td>
                      <td>
                        {participant.title} {participant.first_name} {participant.last_name}
                      </td>
                      <td>{participant.registration_type || ""}</td>
                      <td>{participant.confirmation_sent === "1" ? "✅" : "❌"}</td>
                      <td>{participant.comments || ""}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
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
