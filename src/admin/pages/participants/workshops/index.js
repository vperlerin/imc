import { FaRegTrashAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import classNames from "classnames";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useApiWorkshopsParticipants } from "api/participants/workshops.js";

const AdminParticipantsWorkshops = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState("1");
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("last_name");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [sortType, setSortType] = useState("all"); // New state for sorting type

  const { participants, loading } = useApiWorkshopsParticipants(selectedWorkshop);

  useEffect(() => {
    let filtered = participants;

    // Apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((participant) => {
        const fieldValue = participant[searchType] ? String(participant[searchType]).toLowerCase() : "";
        return fieldValue.includes(lowerQuery);
      });
    }

    // Apply type sorting
    if (sortType !== "all") {
      filtered = filtered.filter((participant) =>
        sortType === "online" ? participant.is_online === "1" : participant.is_online === "0"
      );
    }

    setFilteredParticipants(filtered);
  }, [searchQuery, searchType, sortType, participants]);

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
      {loading ? (
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
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((participant) => (
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
