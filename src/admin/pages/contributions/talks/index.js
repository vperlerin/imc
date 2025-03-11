import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DocButton from "@/admin/components/doc-button";

const AdminTalks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [confirmationFilter, setConfirmationFilter] = useState("all");
  const [talks, setTalks] = useState([]);
  const [filteredTalks, setFilteredTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get_talks.php`)
      .then((response) => {
        if (response.data.success) {
          const formattedTalks = Object.entries(response.data.data).flatMap(([sessionName, talks]) =>
            talks.map((talk) => ({ ...talk, session_name: sessionName }))
          );
          setTalks(formattedTalks);
          setFilteredTalks(formattedTalks);
        } else {
          setError(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching talks: " + error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...talks];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((talk) =>
        talk.title.toLowerCase().includes(lowerQuery)
      );
    }
    if (confirmationFilter !== "all") {
      filtered = filtered.filter((talk) =>
        confirmationFilter === "confirmed" ? talk.confirmation_sent === "1" : talk.confirmation_sent === "0"
      );
    }
    if (sortColumn) {
      filtered.sort((a, b) => {
        let valueA = a[sortColumn] ?? "";
        let valueB = b[sortColumn] ?? "";
        if (sortColumn === "onsite") {
          valueA = a.is_online === "0" ? 1 : 0;
          valueB = b.is_online === "0" ? 1 : 0;
        } else {
          valueA = valueA.toString().toLowerCase();
          valueB = valueB.toString().toLowerCase();
        }
        return sortOrder === "asc" ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
      });
    }
    setFilteredTalks(filtered);
  }, [searchQuery, confirmationFilter, sortColumn, sortOrder, talks]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <PageContain title="Talks List" isMaxWidth>
      {error && <div className="alert alert-danger fw-bolder">{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <>
         <div className="d-flex flex-column flex-md-row gap-2 mb-3">
             
            <div className="position-relative w-auto">
              <input
                type="text"
                className="form-control pe-5"
                placeholder="Search talks by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <CiSearch className="position-absolute top-50 end-0 translate-middle-y me-2" />
            </div>
            <select
              className="form-select w-auto"
              value={confirmationFilter}
              onChange={(e) => setConfirmationFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="confirmed">Only Confirmed</option>
              <option value="not_confirmed">Only Non-Confirmed</option>
            </select>
            <DocButton className="ms-auto" link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} />
          </div>
          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("session_name")}>Session</th>
                  <th className="sortable" onClick={() => handleSort("title")}>Title</th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>Presenter</th>
                  <th className="sortable" onClick={() => handleSort("duration")}>Dur.</th>
                  <th className="sortable" onClick={() => handleSort("onsite")}>Onsite</th>
                  <th className="sortable" onClick={() => handleSort("confirmation_sent")}>Confirmed</th>
                </tr>
              </thead>
              <tbody>
                {filteredTalks.length > 0 ? (
                  filteredTalks.map((talk, index) => (
                    <tr key={index}>
                      <td>{talk.session_name}</td>
                      <td>{talk.title}</td>
                      <td>{`${talk.first_name} ${talk.last_name}`}</td>
                      <td>{`${talk.duration}`}</td>
                      <td>{talk.is_online === "0" ? "✅" : "❌"}</td>
                      <td>{talk.confirmation_sent === "1" ? "✅" : "❌"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No talks found.</td>
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

export default AdminTalks;
