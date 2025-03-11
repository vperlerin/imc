import { CiSearch } from "react-icons/ci";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DocButton from "@/admin/components/doc-button";

const AdminPosters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [confirmationFilter, setConfirmationFilter] = useState("all");
  const [posters, setTalks] = useState([]);
  const [filteredTalks, setFilteredTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get_posters.php`)
      .then((response) => {
        if (response.data.success) {
          const formattedTalks = Object.entries(response.data.data).flatMap(([sessionName, posters]) =>
            posters.map((poster) => ({ ...poster, session_name: sessionName }))
          );
          setTalks(formattedTalks);
          setFilteredTalks(formattedTalks);
        } else {
          setError(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching posters: " + error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...posters];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((poster) =>
        poster.title.toLowerCase().includes(lowerQuery)
      );
    }
    if (confirmationFilter !== "all") {
      filtered = filtered.filter((poster) =>
        confirmationFilter === "confirmed" ? poster.confirmation_sent === "1" : poster.confirmation_sent === "0"
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
  }, [searchQuery, confirmationFilter, sortColumn, sortOrder, posters]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <PageContain title="Posters List" isMaxWidth>
      {error && <div className="alert alert-danger fw-bolder">{error}</div>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex gap-2 mb-3">
            <div className="position-relative w-auto">
              <input
                type="text"
                className="form-control pe-5"
                placeholder="Search posters by title"
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
            <DocButton className="ms-auto" link={`${process.env.REACT_APP_API_URL}/doc_posters.php`} />
          </div>
          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("session_name")}>Session</th>
                  <th className="sortable" onClick={() => handleSort("title")}>Title</th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>Presenter</th> 
                  <th className="sortable" onClick={() => handleSort("confirmation_sent")}>Confirmed</th>
                </tr>
              </thead>
              <tbody>
                {filteredTalks.length > 0 ? (
                  filteredTalks.map((poster, index) => (
                    <tr key={index}>
                      <td>{poster.session_name}</td>
                      <td>{poster.title}</td>
                      <td>{`${poster.first_name} ${poster.last_name}`}</td>
                      <td>{poster.confirmation_sent === "1" ? "✅" : "❌"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No posters found.</td>
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

export default AdminPosters;
