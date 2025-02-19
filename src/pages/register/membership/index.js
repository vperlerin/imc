import PageContain from "components/page-contain";
import React from "react";
import { conferenceData as cd } from "data/conference-data";

const Membership = () => {
  return (
    <PageContain title="IMO Membership">
      <h2>Join the International Meteor Organization and Enhance Your IMC 2025 Experience!</h2>
      <p>
        As a participant of the IMC {cd.year} in {cd.location}  you have a unique opportunity to become a member of the International Meteor Organization (IMO)!</p>

      <h4>Why Join?</h4>
      <ul>
        <li>Receive the bimonthly <b>WGN journal</b> (available in print, digital, or both).</li>
        <li> Enjoy <b>free digital access</b> to the entire <b></b>WGN archive, the Handbook for Meteor Observers, and the Meteor Shower Workbook—essential tools for meteor enthusiasts!</li>
        <li>Connect with a global community of meteor observers and researchers.</li>
      </ul>

      <h4> Exclusive IMC Discount</h4>
      <ul>
        <li><b> Save €5</b> on your first-year membership!</li>
        <li>Current members get <b>€5 off</b> renewal at the conference.</li>
      </ul>

      Don't miss out on these amazing benefits! Join today the IMO today and be part of the global meteor community! 

      <p>
      <a className="btn btn-outline-primary fw-bolder mt-3 " href="https://www.imo.net/members/imo_registration/register/" target="_blank" rel="noopener noreferrer">Join the IMO today</a>
      </p>
    </PageContain>
  );
};

export default Membership;
