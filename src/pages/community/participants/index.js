import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Loader from "components/loader";


const Participants = () => {
  const { participants: onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants(true);
  const { participants: onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants(true);

  if (loadingOnline || loadingOnsite) return <Loader />;
  if (errorOnline || errorOnsite) return <p className="text-danger">Error fetching participants. Please try again later.</p>;

  // Combine both lists into one count per country
  const countryCounts = {};
  [...onsiteParticipants, ...onlineParticipants].forEach((participant) => {
    countryCounts[participant.country] = (countryCounts[participant.country] || 0) + 1;
  });

  const totalParticipants = onsiteParticipants?.length + onlineParticipants?.length;

  return (
    <PageContain title="Participants">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between mt-3">

        <div>
          <h3>On-site Participants</h3>
          {onsiteParticipants.length > 0 ? (
            <>
              <p className="mb-3">
                {onsiteParticipants.length} online participant
                {onsiteParticipants.length !== 1 ? 's have' : ' has'} been confirmed so far.
              </p>
              <ul className="list-unstyled">
                {onsiteParticipants.map((participant) => (
                  <li key={participant.id} className="d-flex align-items-center gap-2 mb-2">
                    <ReactCountryFlag countryCode={participant.country} svg className={css.flag} title={participant.country} />
                    {participant.title} {participant.first_name} {participant.last_name}
                    {participant.organization ? ` (${participant.organization})` : ""}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No one has confirmed on-site participation yet. {' '}
              <Link
                aria-label="On-site Registration"
                className="fw-bolder"
                to="/register/onsite"
                title="Register On-site"
              >Be the first!
              </Link>
            </p>
          )}
        </div>

        <div>
          <h3>Online Participants</h3>
          {onlineParticipants.length > 0 ? (
            <>
              <p className="mb-3">
                {onlineParticipants.length} online participant
                {onlineParticipants.length !== 1 ? 's have' : ' has'} been confirmed so far.
              </p>              <ul className="list-unstyled">
                {onlineParticipants.map((participant) => (
                  <li key={participant.id} className="d-flex align-items-center gap-2 mb-2">
                    <ReactCountryFlag countryCode={participant.country} svg className={css.flag} title={participant.country} />
                    {participant.title} {participant.first_name} {participant.last_name}
                    {participant.organization ? ` (${participant.organization})` : ""}
                  </li>
                ))}
              </ul>
            </>

          ) : (
            <p>No one has confirmed online participation yet. {' '}
              <Link
                aria-label="On-site Registration"
                className="fw-bolder"
                to="/register/onsite"
                title="Register On-site"
              >Be the first!
              </Link></p>
          )}
        </div>
        {(onsiteParticipants.length > 0 || onlineParticipants.length > 0) && (
          <div className="border p-3 rounded-2">
            <h4 className="m-0 mb-2">{Object.entries(countryCounts).length} countries represented</h4>
            <ul className="list-unstyled mb-0">
              {Object.entries(countryCounts).map(([country, count]) => (
                <li key={country} className="d-flex align-items-center gap-2 mb-1">
                  <ReactCountryFlag countryCode={country} svg className={css.flag} title={country} />
                  <span> {((count / totalParticipants) * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageContain>
  );
};

export default Participants;
