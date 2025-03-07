import Loader from "components/loader";
import PageContain from "components/page-contain";
import React, { useEffect, useState } from "react";
import { authSelectors, fetchUser } from 'store/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useApiParticipant } from "api/participants";
import { useApiSpecificData } from "api/specific-data/index.js";
import { Navigate } from "react-router-dom";

const UpdateRegistration = () => {
  const dispatch = useDispatch();
  const [participantId, setParticipantId] = useState(null);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const user = useSelector(authSelectors.getUser);

  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId);
  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: errorGettingDataFromDB } = useApiSpecificData();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());  
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setParticipantId(user.id);
    }
  }, [user]);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageContain title="Update your data">
      {(participantLoading || specificdataLoading) && <Loader text="We are fetching your record… Please wait." />}
      
      {!!participant ? (
        <>
          {`Hello ${participant.title} ${participant.first_name} ${participant.last_name}`}
        </>
      ) : (
        <>Participant not found</>
      )}
    </PageContain>
  );
};

export default UpdateRegistration;
