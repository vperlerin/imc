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
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get_talks.php`)
      .then((response) => {
        setTalks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching talks:", error);
        setLoading(false);
      });
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  let filteredTalks = talks;

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredTalks = filteredTalks.filter((talk) =>
      talk.talk_title.toLowerCase().includes(lowerQuery)
    );
  }

  if (sortColumn) {
    filteredTalks = [...filteredTalks].sort((a, b) => {
      let valueA = a[sortColumn] ?? "";
      let valueB = b[sortColumn] ?? "";
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
      return sortOrder === "asc" ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
    });
  }

  return (
    <PageContain title="Talks List" isMaxWidth>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex gap-2 mb-3">
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

            <DocButton className="ms-auto" link={`${process.env.REACT_APP_API_URL}/doc_talks.php`} />
          </div>

          <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sortable" onClick={() => handleSort("session_name")}>Session {sortColumn === "session_name" && (sortOrder === "asc" ? "🔼" : "🔽")}</th>
                  <th className="sortable" onClick={() => handleSort("talk_title")}>Talk Title {sortColumn === "talk_title" && (sortOrder === "asc" ? "🔼" : "🔽")}</th>
                  <th className="sortable" onClick={() => handleSort("last_name")}>Presenter {sortColumn === "last_name" && (sortOrder === "asc" ? "🔼" : "🔽")}</th>
                  <th className="sortable" onClick={() => handleSort("confirmation_sent")}>Confirmed {sortColumn === "confirmation_sent" && (sortOrder === "asc" ? "🔼" : "🔽")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTalks.length > 0 ? (
                  filteredTalks.map((talk, index) => (
                    <tr key={index}>
                      <td>{talk.session_name}</td>
                      <td>{talk.talk_title}</td>
                      <td>{`${talk.first_name} ${talk.last_name}`}</td>
                      <td>{talk.confirmation_sent === "1" ? "✅" : "❌"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No talks found.</td>
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