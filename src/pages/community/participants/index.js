import classNames from 'classnames';
import css from './index.module.scss';
import PageContain from "components/page-contain";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";
import { useCountryName } from 'hooks/country-name';
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Loader from "components/loader";


const Participants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const countryName = useCountryName;
  const { participants: onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants(true);
  const { participants: onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants(true);

  if (loadingOnline || loadingOnsite) {
    return <Loader />;
  }

  const filterParticipants = (participants) => {
    return participants.filter((participant) => {
      const fullName = `${participant.title} ${participant.first_name} ${participant.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
  };

  const filteredOnsiteParticipants = filterParticipants(onsiteParticipants);
  const filteredOnlineParticipants = filterParticipants(onlineParticipants);

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

  const onsiteByCountry = groupByCountry(filteredOnsiteParticipants);
  const onlineByCountry = groupByCountry(filteredOnlineParticipants);

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

      <div className={classNames('d-grid gap-4 mt-3 align-items-start', css.grid)}>

        {(errorOnline || errorOnsite) && <p className="text-danger">Error fetching participants. Please try again later.</p>}
 
        <div className={classNames('w-100 position-relative', css.searchBar)}>
          <input
            type="text"
            className="form-control"
            placeholder="Search participant by name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className="position-absolute top-50 end-0 translate-middle-y me-2" />
        </div>

        {/* On-site Participants */}
        <div className={classNames('w-100', css.col)}>
          <h3>{filteredOnsiteParticipants.length} On-site Participant{filteredOnsiteParticipants.length > 1 && 's'}</h3>

          {filteredOnsiteParticipants.length > 0 ? (
            uniqueCountries.map((country) =>
              onsiteByCountry[country] ? (
                <div key={country} className="mb-4">
                  <h5 className="d-flex align-items-center gap-2 mt-3 border-bottom pb-2">
                    <ReactCountryFlag countryCode={country} svg className={classNames(css.flag, 'mt-1')} title={country} />
                    {countryName(country)}
                  </h5>
                  <ul className="list-unstyled">
                    {onsiteByCountry[country].map((participant) => (
                      <li key={participant.id} className="d-flex flex-column mb-2">
                        {participant.title} {participant.first_name} {participant.last_name}
                        {participant.organization && <small className="text-muted">({participant.organization})</small>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          ) : (
            <>
              {searchQuery !== '' ? (
                <p>No matching onsite participants found.</p>
              ) : (
                <p>No one has confirmed onsite participation yet. {' '}
                  <Link
                    aria-label="Onsite Registration"
                    className="fw-bolder"
                    to="/register/onsite"
                    title="Register Onsite"
                  >
                    Be the first!
                  </Link>
                </p>
              )}
            </>
          )}
        </div>


        {/* Online Participants */}
        <div className={classNames('w-100', css.col)}>
          <h3>{filteredOnlineParticipants.length} Online Participant{filteredOnlineParticipants.length > 1 && 's'}</h3>

          {filteredOnlineParticipants.length > 0 ? (
            uniqueCountries.map((country) =>
              onlineByCountry[country] ? (
                <div key={country} className="mb-4">
                  <h5 className="d-flex align-items-center gap-2 mt-3 border-bottom pb-2">
                    <ReactCountryFlag countryCode={country} svg className={classNames(css.flag, 'mt-1')} title={country} />
                    {countryName(country)}
                  </h5>
                  <ul className="list-unstyled">
                    {onlineByCountry[country].map((participant) => (
                      <li key={participant.id} className="d-flex flex-column mb-2">
                        {participant.title} {participant.first_name} {participant.last_name}
                        {participant.organization && <small className="text-muted">({participant.organization})</small>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          ) : (
            <>
              {searchQuery !== '' ? (
                <p>No matching online participants found.</p>
              ) : (
                <p>No one has confirmed online participation yet. {' '}
                  <Link
                    aria-label="Online Registration"
                    className="fw-bolder"
                    to="/register/online"
                    title="Register Online"
                  >
                    Be the first!
                  </Link>
                </p>
              )}
            </>
          )}
        </div>


        {(onsiteParticipants.length > 0 || onlineParticipants.length > 0) && (
          <div className={classNames('border p-3 rounded-2 ', css.perc)}>
            <p className="m-0 mb-3 fw-bolder">{Object.entries(countryCounts).length} countries represented</p>
            <ul className="list-unstyled mb-0">
              {Object.entries(countryCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([country, count]) => (
                  <li key={country} className="d-flex flex-row align-items-center gap-2 mb-3">
                    <ReactCountryFlag countryCode={country} svg className={css.flag} title={country} />
                    <div className="position-relative w-100 h-100">
                      <div className="d-flex w-100 align-items-center">
                        {countryName(country)}
                        <small className="text-muted ms-auto"> {((count / totalParticipants) * 100).toFixed(1)}%</small>
                      </div>
                      <div className={css.bar} style={{ width: `${(count / totalParticipants) * 100}%` }}></div>
                    </div>
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
