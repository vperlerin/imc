import PageContain from "components/page-contain";
import React from "react";
import { Link } from "react-router-dom";
import { conferenceData as cf } from "data/conference-data";

const Workshops = () => {
  return (
    <PageContain title="Workshops">
      <p>
        In case participants wish to stay at the Stayokay hostel before the start of the IMC,
        they should book a room themselves at the hostel.
      </p>


      {cf.workshops.map((workshop, index) => (
        <div key={index} className="mb-4">
          <h3>{workshop.title}</h3>

          {(workshop.title === 'Spectroscopy Workshop') && (
            <>
              <p>
                This year, ahead of the IMC there will be a half-day workshop on spectroscopy. The idea was born based on the fact that the amount of work done on spectroscopy is increasing, but for many a relatively new field. In this workshop, we will focus on the basics of spectroscopy and will focus on two main goals:
              </p>
              <ol>
                <li>
                  Learn how to build a spectrograph and doing a spectral measurement yourself, (e.g. by making a picture via a camera with a grating);
                </li>
                <li>
                  Having a deeper look at the results and interpretation of a meteor spectrum. You will learn what you can derive from it.
                </li>
              </ol>

              <p>The workshop will have a practical part (making a spectrum, analysing) and a little bit of deeper insight in theory and its challenges. At the end we will devote some time for discussion and exchanging experience.</p>

              <p> The workshop is aimed at non-specialists in the spectral field (amateurs and professionals).</p>
            </>
          )}


          {(workshop.title === 'Radio Workshop') && (
            <>
              <p>
                This year, the radio workshop will mainly focus on head echoes produced by scattering of the radio waves on the ionized region moving in front of the incoming meteoroid.  However, any other topic related to radio observations of meteors is very welcome.  The final program will become available a few weeks before the event.
              </p>
            </>
          )}

          <div className="p-3 border rounded-2">
            The <strong>{workshop.title}</strong> will take place on <strong>{new Date(workshop.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>,
            from <strong>{workshop.period}</strong>.<br />
            Participation is <strong>{workshop.cost_online ? "available on-site and online" : "only available on-site"}</strong>
            {workshop.cost_online && (<span> for <strong>€{workshop.cost_online.toFixed(2)}</strong> (online)</span>)}.
            The on-site cost is <strong>€{workshop.cost.toFixed(2)}</strong>, which includes {workshop.description}.<br />

          </div>

        </div>
      ))}

      <div className="border border-primary p-3 rounded-2 text-center mb-4 d-flex flex-column align-items-center">
        Participation in a workshop requires you to {" "}
        <Link
          aria-label="Register"
          className="btn btn-outline-primary fw-bolder mt-2 d-block"
          to="/register"
          title="Register Now"
        >
          Register
        </Link>
      </div>
    </PageContain>
  );
};

export default Workshops;
