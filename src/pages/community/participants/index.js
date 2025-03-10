import PageContain from "components/page-contain";
import React from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";



const Participants = () => {
    const { onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants();
    const { onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants();

  return (
    <PageContain title="Participants">
      Come back soon
    </PageContain>
  );
};

export default Participants;
