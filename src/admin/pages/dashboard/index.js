import React, { useEffect, useState } from "react";
import axios from "axios";
import { retry } from "utils/retry.js";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await retry(() =>
          axios.get(`${process.env.REACT_APP_API_URL}/admin/api/get_dashboard_data.php`)
        );
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch dashboard data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader text="Loading dashboard data..." />;
  if (error) return <PageContain title="Admin Dashboard"><p className="text-danger">{error}</p></PageContain>;

  return (
    <PageContain title="Admin Dashboard">
      <div className="container">
        <h2 className="mb-4">Dashboard Overview</h2>

        <div className="row g-4">
          {/* Confirmed and Unconfirmed Online Participants */}
          <div className="col-md-6">
            <div className="card border-primary p-3">
              <h5 className="fw-bold">Online Participants</h5>
              <p>✅ Confirmed: <b>{dashboardData.confirmed_online}</b></p>
              <p>❌ Unconfirmed: <b>{dashboardData.unconfirmed_online}</b></p>
            </div>
          </div>

          {/* Confirmed and Unconfirmed Onsite Participants */}
          <div className="col-md-6">
            <div className="card border-success p-3">
              <h5 className="fw-bold">Onsite Participants</h5>
              <p>✅ Confirmed: <b>{dashboardData.confirmed_onsite}</b></p>
              <p>❌ Unconfirmed: <b>{dashboardData.unconfirmed_onsite}</b></p>
            </div>
          </div>
        </div>

        {/* Unconfirmed Participants Tables */}
        <div className="mt-4">
          <h4>Unconfirmed Online Participants</h4>
          {dashboardData.online_unconfirmed.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Confirmation Sent</th>
                  <th>Confirmation Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.online_unconfirmed.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title} {p.first_name} {p.last_name}</td>
                    <td>{p.title}</td>
                    <td>{p.confirmation_sent ? "✅" : "❌"}</td>
                    <td>{p.confirmation_date || "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No unconfirmed online participants.</p>
          )}
        </div>

        <div className="mt-4">
          <h4>Unconfirmed Onsite Participants</h4>
          {dashboardData.onsite_unconfirmed.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Confirmation Sent</th>
                  <th>Confirmation Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.onsite_unconfirmed.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title} {p.first_name} {p.last_name}</td>
                    <td>{p.title}</td>
                    <td>{p.confirmation_sent ? "✅" : "❌"}</td>
                    <td>{p.confirmation_date || "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No unconfirmed onsite participants.</p>
          )}
        </div>

        {/* Workshop Stats */}
        <div className="mt-4">
          <h4>Workshop Attendance</h4>
          {dashboardData.workshop_stats.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Workshop</th>
                  <th>Confirmed</th>
                  <th>Unconfirmed</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.workshop_stats.map((workshop, index) => (
                  <tr key={index}>
                    <td>{workshop.workshop_title}</td>
                    <td>{workshop.confirmed_participants}</td>
                    <td>{workshop.unconfirmed_participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No workshop data available.</p>
          )}
        </div>
      </div>
    </PageContain>
  );
};

export default AdminDashboard;
