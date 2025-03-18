import classNames from 'classnames';
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";
import { useCountryName } from 'hooks/country-name';
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Loader from "components/loader";


const Participants = () => {
  const countryName = useCountryName;
  const { participants: onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants(true);
  const { participants: onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants(true);

  if (loadingOnline || loadingOnsite) return <Loader />;
  if (errorOnline || errorOnsite) return <p className="text-danger">Error fetching participants. Please try again later.</p>;

  // Grouping participants by country separately for On-site and Online
  const groupByCountry = (participants) => {
    const grouped = {};
    participants.forEach((participant) => {
      if (!grouped[participant.country]) {
        grouped[participant.country] = [];
      }
      grouped[participant.country].push(participant);
    });
    return grouped;
  };

  const onsiteByCountry = groupByCountry(onsiteParticipants);
  const onlineByCountry = groupByCountry(onlineParticipants);

  const uniqueCountries = [
    ...new Set([...Object.keys(onsiteByCountry), ...Object.keys(onlineByCountry)])
  ].sort((a, b) => countryName(a).localeCompare(countryName(b)));


  // Combine both lists into one count per country
  const countryCounts = {};
  [...onsiteParticipants, ...onlineParticipants].forEach((participant) => {
    countryCounts[participant.country] = (countryCounts[participant.country] || 0) + 1;
  });

  const totalParticipants = onsiteParticipants?.length + onlineParticipants?.length;

  return (
    <PageContain title="Participants">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between mt-3 align-items-start">

        {/* On-site Participants */}
        <div>
          <h3>On-site Participants</h3>
          {onsiteParticipants.length > 0 ? (
            uniqueCountries.map((country) =>
              onsiteByCountry[country] ? (
                <div key={country} className="mb-4">
                  <h5 className="d-flex align-items-center gap-2 mt-3">
                    <ReactCountryFlag countryCode={country} svg className={classNames(css.flag, 'mt-1')} title={country} />
                    {countryName(country)}
                  </h5>
                  <ul className="list-unstyled">
                    {onsiteByCountry[country].map((participant) => (
                      <li key={participant.id} className="d-flex align-items-center gap-2 mb-2">
                        {participant.title} {participant.first_name} {participant.last_name}
                        {participant.organization && <small className="text-muted">({participant.organization})</small>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          ) : (
            <p>No one has confirmed on-site participation yet. {' '}
              <Link
                aria-label="On-site Registration"
                className="fw-bolder"
                to="/register/onsite"
                title="Register On-site"
              >Be the first!</Link>
            </p>
          )}
        </div>

        {/* Online Participants */}
        <div>
          <h3>Online Participants</h3>
          {onlineParticipants.length > 0 ? (
            uniqueCountries.map((country) =>
              onlineByCountry[country] ? (
                <div key={country} className="mb-4">
                  <h5 className="d-flex align-items-center gap-2 mt-3">
                    <ReactCountryFlag countryCode={country} svg className={classNames(css.flag, 'mt-1')} title={country} />
                    {countryName(country)}
                  </h5>
                  <ul className="list-unstyled">
                    {onlineByCountry[country].map((participant) => (
                      <li key={participant.id} className="d-flex align-items-center gap-2 mb-2">
                        {participant.title} {participant.first_name} {participant.last_name}
                        {participant.organization && <small className="text-muted">({participant.organization})</small>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          ) : (
            <p>No one has confirmed online participation yet. {' '}
              <Link
                aria-label="Online Registration"
                className="fw-bolder"
                to="/register/online"
                title="Register Online"
              >Be the first!</Link>
            </p>
          )}
        </div> 


      {(onsiteParticipants.length > 0 || onlineParticipants.length > 0) && (
        <div className="border p-3 rounded-2">
          <p className="m-0 mb-2 fw-bolder">{Object.entries(countryCounts).length} countries represented</p>
          <ul className="list-unstyled mb-0">
            {Object.entries(countryCounts).map(([country, count]) => (
              <li key={country} className="d-flex align-items-center gap-2 mb-1">
                <ReactCountryFlag countryCode={country} svg className={css.flag} title={country} />
                {countryName(country)} <span className="text-muted"> {((count / totalParticipants) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </PageContain >
  );
};

export default Participants;
