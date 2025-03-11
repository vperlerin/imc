import PageContain from "components/page-contain";
import React from "react";
import { Link } from "react-router-dom";
import { conferenceData as cd } from "data/conference-data";

const Radio = () => {
  const workshop = cd.workshops.find(w => w.title === "Radio Workshop");

  return (
    <PageContain title="Radio Workshop">
 
      <div className="mb-4"> 
       <p>
          This year, the radio workshop will mainly focus on head echoes produced by scattering of the radio waves on the ionized region moving in front of the incoming meteoroid.  However, any other topic related to radio observations of meteors is very welcome.  The final program will become available a few weeks before the event.
        </p>


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

export default Radio;
