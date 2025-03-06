import Loader from "components/loader";
import PageContain from "components/page-contain";
import React, { useEffect, useState } from "react";
import { authSelectors } from 'store/auth';
import { useSelector } from 'react-redux';
import { useApiParticipant } from "api/participants";
import { useApiSpecificData } from "api/specific-data/index.js";


const UpdateRegistration = () => { 
  const [participantId, setParticipantId] = useState();
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const user = useSelector(authSelectors.getUser);
 
  console.log("USER? ", user);

  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId);
  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: errorGettingDataFromDB } = useApiSpecificData();
   
  useEffect(() => {
    if(!user) {
      return;
    }

    setParticipantId(user.id);
  }, [ user ])


  console.log("PARTICIPA NT ", participant);

  return (
    <PageContain title="Update your data">
       {isLoggedIn && !!user.user_id && (
        <>
          {(participantLoading || specificdataLoading) && <Loader text="We are fetching your record…|Please, wait."/>  }
        </>
      )}

      {!!participant && (
        <>
          {`Hello ${curParticipant.title} ${curParticipant.first_name} ${curParticipant.last_name}`}
        </>
      )}
       
    </PageContain>
  )
};

export default UpdateRegistration;
