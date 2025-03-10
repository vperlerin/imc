import PageContain from "components/page-contain";
import React from "react";
import { useApiOnlineParticipants } from "api/participants/online.js";
import { useApiOnsiteParticipants } from "api/participants/onsite.js";

const Participants = () => {
    const { participants: onlineParticipants, loading: loadingOnline, error: errorOnline } = useApiOnlineParticipants(true);
    const { participants: onsiteParticipants, loading: loadingOnsite, error: errorOnsite } = useApiOnsiteParticipants(true);

    console.log("onlineParticipants? ", onlineParticipants);
    console.log("onsiteParticipants? ", onsiteParticipants);



  return (
    <PageContain title="Participants">
      Come back soon
    </PageContain>
  );
};

export default Participants;
