import PageContain from "components/page-contain";
import React from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";

const Participants = () => {
  const { participants: onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants(true); // Fetch confirmed only
  const { participants: onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants(true); // Fetch confirmed only

  return (
    <PageContain title="Participants">
      {loadingOnline || loadingOnsite ? (
        <p>Loading participants...</p>
      ) : errorOnline || errorOnsite ? (
        <p className="text-danger">Error fetching participants. Please try again later.</p>
      ) : (
        <>
          <h3>Online Participants</h3>
          {onlineParticipants.length > 0 ? (
            <ul className="list-unstyled">
              {onlineParticipants.map((participant) => (
                <li key={participant.id}>
                  {participant.title} {participant.first_name} {participant.last_name}
                  {participant.organization ? ` (${participant.organization})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No confirmed online participants.</p>
          )}

          <h3>Onsite Participants</h3>
          {onsiteParticipants.length > 0 ? (
            <ul className="list-unstyled">
              {onsiteParticipants.map((participant) => (
                <li key={participant.id}>
                  {participant.title} {participant.first_name} {participant.last_name}
                  {participant.organization ? ` (${participant.organization})` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p>No confirmed onsite participants.</p>
          )}
        </>
      )}
    </PageContain>
  );
};

export default Participants;
