import classNames from "classnames";
import css from './index.module.scss';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { retry } from "utils/retry.js";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import { Link } from "react-router-dom";


const getRandomGreeting = () => {
  const messages = [
    "i hope you're doing great today!",
    "rise and shine!",
    "you're awesome, keep it up!",
    "wishing you a fantastic day!",
    "hope you're feeling amazing!",
    "you're doing an incredible job!",
    "très bonne journée à toi :)",
    "the IMO is lucky to have you!",
    "your kindness makes the IMC a better place!",
    "jouw vriendelijkheid maakt de IMC een betere plek!",
    "your kindness makes the IMC a better place!",
    "the IMO is lucky to have you!",
    "de IMO heeft geluk met jou!",
    "you're doing an incredible job!",
    "je doet ongelooflijk goed werk!"
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return `Hey Marc, ${randomMessage}`;
}

// Example usage:
console.log(getRandomGreeting());


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
    <PageContain>
      <div className={classNames(css.dashboard, 'mx-auto')}>
        <h3>{getRandomGreeting()}</h3>
        <p className="mb-4">Here is a quick summary of what's going on here:</p>

        <div className="d-flex flex-column flex-md-row gap-3 w-100">

          {/* Confirmed and Unconfirmed Onsite Participants */}
          <div className="flex-grow-1 flex-shrink-0 border p-3 rounded-2 position-relative">
            <div className=" ">
              <h5 className="fw-bold">
                <Link to="/admin/participants/onsite">
                  On-site Participants
                </Link>
              </h5>
              <div className="position-absolute border rounded-3 border-3 top-0 end-0 m-2 p-2">
                ✅  <b>{dashboardData.confirmed_onsite}{' '}</b>/ {(parseFloat(dashboardData.unconfirmed_onsite) + parseFloat(dashboardData.confirmed_onsite))}
              </div>

              <div className="mt-4">
                <h6>Unconfirmed On-site Participants</h6>
                {dashboardData.onsite_unconfirmed.length > 0 ? (
                  <div className="table-responsive" style={{ maxWidth: "calc(100vw - 2rem)" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Confirmed</th>
                          <th>Email sent</th>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.onsite_unconfirmed.map((p) => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.title} {p.first_name} {p.last_name}</td>
                            <td>{p.confirmation_sent === "1" ? "✅" : "❌"}</td>
                            <td className={classNames(p?.confirmation_date && "text-success")}>
                              {p.confirmation_date ? formatFullDate(p.confirmation_date) : "❌"}
                            </td>
                            <td>
                              <div className="d-flex gap-2 justify-content-end">
                                <a href={`/admin/participants/onsite/payment/${p.id}`} className="btn btn-sm btn-outline-success fw-bolder">Payments</a>
                                <a href={`/admin/participants/online/${p.id}`} className="btn btn-sm btn-outline-primary fw-bolder">Edit</a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No unconfirmed onsite participants!</p>
                )}
              </div>
            </div>
          </div>


          {/* Confirmed and Unconfirmed Online Participants */}
          <div className="flex-grow-1 flex-shrink-0 border p-3 rounded-2 position-relative">
            <div className=" ">
              <h5 className="fw-bold">
                <Link to="/admin/participants/online">
                  Online Participants
                </Link>
              </h5>
              <div className="position-absolute border rounded-3 border-3 top-0 end-0 m-2 p-2">
                ✅  <b>{dashboardData.confirmed_online}{' '}</b>/ {(parseFloat(dashboardData.unconfirmed_online) + parseFloat(dashboardData.confirmed_online))}
              </div>
              {/* Unconfirmed Participants Tables */}
              <div className="mt-4">
                <h6>Unconfirmed Online Participants</h6>
                {dashboardData.online_unconfirmed.length > 0 ? (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Confirmed</th>
                        <th>Email sent</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.online_unconfirmed.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.title} {p.first_name} {p.last_name}</td>
                          <td>{p.confirmation_sent === "1" ? "✅" : "❌"}</td>
                          <td className={classNames(p?.confirmation_date && "text-success")}>
                            {p.confirmation_date ? formatFullDate(p.confirmation_date) : "❌"}
                          </td>
                          <td>
                            <div className="d-flex gap-2 justify-content-end">
                              <a href={`/admin/participants/onsite/payment/${p.id}`} className="btn btn-sm btn-outline-success fw-bolder">Payments</a>
                              <a href={`/admin/participants/online/${p.id}`} className="btn btn-sm btn-outline-primary fw-bolder">Edit</a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-success"><i>No unconfirmed online participants: you go to go!</i></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Stats */}
        <div className="mt-4 border p-3 rounded-2">
          <h5>Workshop Attendance</h5>
          {dashboardData.workshop_stats.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th rowSpan="2">Workshop</th>
                  <th colSpan="3" className="text-center">Online Participants</th>
                  <th colSpan="3" className="text-centert">Onsite Participants</th>
                </tr>
                <tr>

                  <th className="text-success">Confirmed</th>
                  <th className="text-danger">Unconfirmed</th>
                  <th className="text-success">Confirmed</th>
                  <th className="text-danger">Unconfirmed</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.workshop_stats.map((workshop, index) => (
                  <tr key={index}>
                    <td className="fw-bolder">
                      <Link
                        to={`/admin/participants/workshops/${workshop.workshop_title.toLowerCase().includes('radio') ? 'radio' : 'spectro'}`}
                      >
                        {workshop.workshop_title}
                      </Link>
                    </td>
                    <td className="text-success fw-bolder">{workshop.confirmed_online_participants}</td>
                    <td className="text-danger">{workshop.unconfirmed_online_participants}</td>
                    <td className="text-success fw-bolder">{workshop.confirmed_onsite_participants}</td>
                    <td className="text-danger">{workshop.unconfirmed_onsite_participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No workshop data available.</p>
          )}
        </div>


      </div>
    </PageContain >
  );
};

export default AdminDashboard;
