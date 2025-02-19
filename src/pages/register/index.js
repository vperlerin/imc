import PageContain from "components/page-contain";
import React from "react";
import { Link } from 'react-router-dom';
import { conferenceData as cd } from 'data/conference-data';
import {  formatFullDate } from 'utils/date';

const Register = () => {
  return (
    <PageContain title="Register" showRegBtn={false}>
      <p>We are excited to welcome participants from around the world to the International Meteor Conference!</p>
      <p>
        To make the event as accessible as possible, we offer both onsite and online registration options. Whether you prefer to join us in person or participate remotely, we want to ensure that everyone has the opportunity to attend and engage with the conference.
      </p>
      <p>
        Register now and be part of this global gathering of meteor enthusiasts and researchers!
      </p>

      <div className="alert alert-info">
        Registration Deadline: <span className="fw-bolder">{formatFullDate(cd.deadlines.reg)}</span>
      </div>
     

      <div className="d-flex gap-3 justify-content-center mt-3"> 
        <Link
          aria-label="Register ONSITE"
          className="btn btn-outline-primary fw-bolder" 
          to="/register/onsite"
          title="Register ONSITE"
        >
          Register ONSITE
        </Link>

        <Link
          aria-label="Register ONLINE"
          className="btn btn-outline-primary fw-bolder"
          to="/register/online"
          title="Register ONLINE"
        >
          Register ONLINE
        </Link>

      </div>
    </PageContain>
  );
};

export default Register;
