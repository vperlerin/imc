import Arrival from "components/registration/arrival.js";
import Contribution from "components/registration/contribution";
import Loader from "components/loader";
import PageContain from "components/page-contain";
import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import { conferenceData as cd } from "data/conference-data";
import { authSelectors, fetchUser } from 'store/auth';
import { Link } from "react-router-dom";
import { useApiParticipant } from "api/participants";
import { useApiSpecificData } from "api/specific-data/index.js";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useBlockNavigation } from "hooks/block-navigation.js";
import { useApiLogout } from 'api/oauth/logout';

const UpdateRegistration = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [participantId, setParticipantId] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const hasFetchedParticipant = useRef(false);
  let isOnline = false;
  const user = useSelector(authSelectors.getUser);
  const { control, register, handleSubmit, getValues, setValue, formState: { errors }, trigger, watch } = useForm();
 
  const { participant, loading: participantLoading } = useApiParticipant(participantId, isOnline,  fetchTrigger);
  const { loading: specificDataLoading, sessions } = useApiSpecificData();
  const { logout, loading: logoutLoading } = useApiLogout();
  isOnline = participant?.participant?.is_online === "1";

  useBlockNavigation(unsavedChanges);

  useEffect(() => {
    if (!participant || sessions.length === 0) {
      return;
    }

    // Handle Contributions (Talks & Posters)
    if (participant.contributions && Array.isArray(participant.contributions) && sessions.length > 0) {
      const updatedTalks = participant.contributions
        .filter(contribution => contribution.type === "talk")
        .map(talk => ({ ...talk }));

      const updatedPosters = participant.contributions
        .filter(contribution => contribution.type === "poster")
        .map(poster => ({ ...poster }));

      // Set values in form so they persist on submit
      setValue("talks", updatedTalks);
      setValue("posters", updatedPosters);

      // Set wantsToContribute if at least one talk or poster exists
      if (updatedTalks.length > 0 || updatedPosters.length > 0) {
        setValue("wantsToContribute", "1");
      }
    }
  }, [participant, sessions, setValue]);

  // Detect form changes to prevent accidental navigation
  useEffect(() => {
    const subscription = watch(() => setUnsavedChanges(true));
    return () => subscription.unsubscribe();
  }, [watch]);

  // Fetch user if missing
  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  // Set participant ID once user is loaded
  useEffect(() => {
    if (user?.id) {
      setParticipantId(user.id);
    }
  }, [user]);

  // Populate form with participant data when available
  useEffect(() => {
    if (!participant || sessions.length === 0 || hasFetchedParticipant.current) return;
    hasFetchedParticipant.current = true;

    // Set arrival details
    if (participant.arrival) {
      Object.keys(participant.arrival).forEach((key) => {
        if (participant.arrival[key] !== null) {
          setValue(
            key,
            key.includes("hour") || key.includes("minute")
              ? participant.arrival[key].toString().padStart(2, "0")
              : participant.arrival[key]
          );
        }
      });
    }

    // Process contributions
    const contributions = participant.contributions || [];

    const updatedTalks = contributions
      .filter(c => c.type === "talk")
      .map(talk => ({ ...talk || sessions[0]?.id }));

    const updatedPosters = contributions
      .filter(c => c.type === "poster")
      .map(poster => ({ ...poster || sessions[0]?.id }));

    // Store data in form fields
    setValue("talks", updatedTalks);
    setValue("posters", updatedPosters);
 

  }, [participant, sessions, setValue]);

  // Form submission handler
  const onSubmit = async (formData) => {
    if (!participantId) {
      alert("Error: Participant ID is missing. Please refresh the page and try again.");
      return;
    }

    setSaving(true);
    setUnsavedChanges(false);
    setErrMsg('');
    setSuccessMsg('');

    try {
      const apiFile = (activeSection === "arrival") ? 'update_arrival' : 'update_contribution';
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${apiFile}.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participant_id: participantId,
          ...formData
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to update data.");
      }

      setSuccessMsg("Your changes have been saved successfully! If you don't have other updates to make, please don't forget to ");
      setFetchTrigger(prev => prev + 1); // Trigger re-fetch after successful update
    } catch (err) {
      setErrMsg("An error occurred while saving your data. Please, try again later or contact us.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContain title="Update Your Data">
      {(participantLoading || specificDataLoading) && <Loader text="Fetching your record… Please wait." />}

      {participant && !participantLoading && (
        <>
          <div className="border rounded-2 p-3 mb-3">
            <p className="fw-bolder">{`Hello ${participant.participant.title} ${participant.participant.first_name} ${participant.participant.last_name},`}</p>
            <p>
              {isOnline ? (
                <>
                  On this page, you have the option to update your contributions (talks).
                  If you need to make any other changes to your records, please{' '}
                  <Link aria-label="Contact" to="/contact" title="Contact">contact us</Link>.
                </>
              ) : (
                <>
                  On this page, you have the option to update either your travel details or contributions (talks & posters).
                  If you need to make any other changes to your records, please{' '}
                  <Link aria-label="Contact" to="/contact" title="Contact">contact us</Link>.
                </>
              )}
            </p>
            {!isOnline && (
            <div className="d-flex gap-2 mb-2"> 
                <button
                  className={classNames('btn fw-bolder', activeSection === "arrival" ? 'btn-primary' : 'btn-outline-primary')}
                  onClick={() => setActiveSection(activeSection === "arrival" ? null : "arrival")}
                >
                  Travel Details
                </button> 
              <button
                className={classNames('btn fw-bolder', activeSection === "contributions" ? 'btn-primary' : 'btn-outline-primary')}
                onClick={() => setActiveSection(activeSection === "contributions" ? null : "contributions")}
              >
                Contributions
              </button>
            </div>
            )}

            {errMsg && (
              <div className="alert alert-danger fw-bolder mt-3">{errMsg}</div>
            )}

            {successMsg && (
              <div className="alert alert-success fw-bolder mt-3">
                {successMsg}
                <div className="text-center mt-2">
                  <button
                    aria-label="Logout"
                    className="btn btn-outline-danger px-3 fw-bolder ms-3"
                    onClick={logout}
                    disabled={logoutLoading}
                    title="Logout"
                  >
                    {logoutLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {(!!activeSection || isOnline) && (
            <div className="mt-2 position-relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                {saving && <Loader isFixed={false} />}

                {activeSection === "arrival" && (
                  <Arrival isEditing conferenceData={cd} register={register} errors={errors} setValue={setValue} trigger={trigger} />
                )}

                {(activeSection === "contributions" || isOnline) && (
                  <Contribution
                    isEditing
                    isOnline={isOnline}
                    conferenceData={cd}
                    control={control}
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    trigger={trigger}
                    sessions={sessions}
                  />
                )}

                <div className="mt-4 d-flex justify-content-end">
                  <button type="submit" className="btn btn-outline-primary fw-bolder" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </PageContain>
  );
};

export default UpdateRegistration;
