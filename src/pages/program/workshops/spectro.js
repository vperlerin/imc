import PageContain from "components/page-contain";
import React from "react";
import { Link } from "react-router-dom";
import { conferenceData as cd } from "data/conference-data";

const Spectro = () => {
  const workshop = cd.workshops.find(w => w.title === "Spectroscopy Workshop");

  return (
    <PageContain title="Spectroscopy Workshop">
      <div className="mb-4">

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

        <div className="p-3 border rounded-2">
          The <strong>{workshop.title}</strong> will take place on <strong>{new Date(workshop.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>,
          from <strong>{workshop.period}</strong>.<br />
         
          On-site participation:  <strong>{workshop.cost.toFixed(2)}€ </strong> {workshop.description && `(${workshop.description})`}<br />
            {workshop.cost_online ? (
              <>Online participation:  <strong>{workshop.cost_online.toFixed(2)}€</strong><br /></>
            ) : (
              <><i>Unfortunately, this workshop won't be available online.</i><br /></>
            )} 

 
        <div className="mt-3">In case participants wish to stay at the {cd.hotel} before the start of the IMC,
        they should book a room directly with the hostel.</div>
        </div>

      </div>

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

export default Spectro;
