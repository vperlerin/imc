import classNames from 'classnames';
import cssTabs from 'styles/components/tabs.module.scss';
import axios from "axios";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useRef, useState } from "react";
import { useBlockNavigation } from "hooks/block-navigation.js";
import { useParams, useNavigate } from "react-router-dom";
import { get, useForm } from "react-hook-form";
import { conferenceData as cd } from "data/conference-data";
import Identitity from "components/registration/identity";
import Workshops from "components/registration/workshops";
import Arrival from "components/registration/arrival";
import Contribution from "components/registration/contribution";
import Accommodation from "components/registration/accomodation";
import Extras from "components/registration/extras";
import Comments from "components/registration/comments";
import Summary from "components/billing/summary";

const AdminParticipantsUser = () => {
  const { participantId, tab } = useParams();
  //
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [errorGettingDataFromDB, setErrorGettingDataFromDB] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [total, setTotal] = useState(0);
  const [paypalFee, setPaypalFee] = useState(0);
  const activeTab = tab || "identity";
  const hasFetchedData = useRef(false);
  const hasFetchedParticipant = useRef(false);
  const navigate = useNavigate();

  const { control, register, handleSubmit, getValues, setValue, formState: { errors }, reset, trigger, watch } = useForm();

  useBlockNavigation(unsavedChanges);

  // Detect form changes
  useEffect(() => {
    const subscription = watch(() => {
      setUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Redirect to default tab if none is provided
  useEffect(() => {
    if (!tab) {
      navigate(`/admin/participants/onsite/${participantId}/identity`, { replace: true });
    }
  }, [tab, participantId, navigate]);

  // Fetch available workshops, payment_methods, sessions & registration_types from API
  useEffect(() => {
    if (hasFetchedData.current) {
      return;
    }

    hasFetchedData.current = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_specific_data.php`);
        if (response.data.success
          && response.data.data.workshops
          && response.data.data.payment_methods
          && response.data.data.registration_types
          && response.data.data.sessions
        ) {
          setWorkshops(response.data.data.workshops);
          setPaymentMethods(response.data.data.payment_methods);
          setRegistrationTypes(response.data.data.registration_types);
          setSessions(response.data.data.sessions);
        } else {
          throw new Error(response.data.message || "Failed to fetch data - please try again later.");
        }
      } catch (err) {
        setErrorGettingDataFromDB(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get participant data
  useEffect(() => {
    if(hasFetchedParticipant.current) {
      return;
    }
 
    const fetchParticipant = async () => { 
      if (!participantId) {
        setError("Invalid participant ID.");
        setLoading(false);
        return;
      }

      hasFetchedParticipant.current = true;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/participant.php?id=${participantId}`
        );

        if (response.data.success) {
          setParticipant(response.data.data);
          reset(response.data.data.participant);  
        } else {
          throw new Error(response.data.message || "Failed to fetch participant. Please refresh the page.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [participantId, reset]);


  // Create all the values for the forms 
  useEffect(() => {
    if (!participant && sessions.length === 0) {
      return;
    }

    // Participant
    const { dob, ...otherDetails } = participant.participant;

    if (dob) {
      const [year, month, day] = dob.split("-");
      setValue("dobDay", String(Number(day)));
      setValue("dobMonth", String(Number(month)));
      setValue("dobYear", year);
    }

    // Set other participant details
    Object.keys(otherDetails).forEach((key) => {
      if (otherDetails[key]) {
        setValue(key, otherDetails[key]);
      }
    });


    // Workshops
    const participantWorkshops = participant.workshops?.map(workshop => String(workshop.id)) || [];
    setValue("workshops", participantWorkshops);

    // Arrival  
    const participantArrival = participant.arrival || {};
    Object.keys(participantArrival).forEach((key) => {
      if (participantArrival[key] !== null) {
        setValue(key, key.includes("hour") || key.includes("minute")
          ? participantArrival[key].toString().padStart(2, "0")
          : participantArrival[key]
        );
      }
    });

    // Contribution
    const contributions = participant.contributions || [];
    if (sessions.length > 0) {
      const talks = contributions.filter(c => c.type === "talk").map(talk => ({
        ...talk,
        session: talk.session_id || sessions[0]?.id,
      }));
      const posters = contributions.filter(c => c.type === "poster").map(poster => ({
        ...poster,
        session: poster.session_id || sessions[0]?.id,
      }));

      if (talks.length > 0) setValue('talks', talks);
      if (posters.length > 0) setValue('posters', posters);
    }

    // Accommodation
    if (participant.accommodation?.registration_type_id) {
      setValue("registration_type_id", String(participant.accommodation.registration_type_id));
    }

    // Extras
    if (participant.extra_options) {
      setValue("excursion", participant.extra_options.excursion);
      setValue("buy_tshirt", participant.extra_options.buy_tshirt);
      setValue("tshirt_size", participant.extra_options.tshirt_size);
    }
  }, [participant]);

  const onSubmit = async (formData) => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    // ✅ Step 1: Validate the entire form
    const isValid = await trigger(); // Triggers validation on all fields

    if (!isValid) {
      setSaving(false);
      setError("Please fill in all required fields.");
      return;
    }

    // ✅ Step 2: Check if the user selected a T-shirt but didn't choose a size
    if (formData.buy_tshirt === "1" && !formData.tshirt_size) {
      setSaving(false);
      setError("You must select a T-shirt size if you choose to buy one.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/update_participant.php?id=${participantId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMsg("Participant updated successfully! The page will now reload to assure data integrity.");
        setUnsavedChanges(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error(response.data.message || "Failed to update participant.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const isOnline = participant?.participant?.is_online === "1";
  const breadcrumb = [
    {
      url: `/admin/participants/${isOnline ? 'online' : 'onsite'}`,
      name: isOnline ? "Online Participants" : "Onsite Participants"
    },
    {
      url: `/admin/participants/${isOnline ? 'online' : 'onsite'}/${participantId}/${activeTab}`,
      name: `${participant?.participant?.first_name ?
        participant.participant.first_name.charAt(0).toUpperCase() + participant.participant.first_name.slice(1)
        : "Participant"} 
        ${participant?.participant?.last_name || ""} - 
        ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
    }
  ];
 
  const isSummaryReady = (
    participant &&
    paymentMethods.length > 0 &&
    workshops.length > 0 &&
    registrationTypes.length > 0
  );

  if (errorGettingDataFromDB) {
    return <div className="alert alert-danger fw-bolder">{errorGettingDataFromDB}</div>
  }
 
  return (
    <PageContain
      breadcrumb={breadcrumb}
    > 
      <div className="position-relative fw-bolder">
        {(!loading && error) && (
          <div className="alert alert-danger">{error}</div>
        )}

        {(!loading && hasFetchedData.current && hasFetchedParticipant.current && !participant) && (
          <div className="alert alert-danger">No participant data available.</div>
        )}

        {(!loading && successMsg) && (
          <div className="alert alert-success">{successMsg}</div>
        )}
      </div>
 
      {(loading || !hasFetchedData.current) && <Loader />}

      {!loading && participant && isSummaryReady && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={classNames('nav nav-tabs mb-3 mt-2', cssTabs.tab, 'flex-column flex-sm-row')}>
            {[
              { key: "identity", label: "Identity" },
              { key: "workshops", label: "Workshops" },
              { key: "arrival", label: "Arrival" },
              { key: "contribution", label: "Contribution" },
              { key: "accommodation", label: "Accommodation" },
              { key: "extras", label: "Extras" },
              { key: "comments", label: "Comments" },
              { key: "summary", label: "Summary" }
            ].map(({ key, label }) => (
              <li className="nav-item" key={key}>
                <a
                  className={`nav-link ${activeTab === key ? `active ${cssTabs.active}` : ""}`}
                  href={`/admin/participants/onsite/${participantId}/${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/participants/onsite/${participantId}/${key}`);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          {/* Tab Content */}
          <div className={classNames('tab-content mx-auto', cssTabs.contentMxw)}>
            {tab === "identity" && (
              <Identitity
                isAdmin
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "workshops" && (
              <Workshops
                isAdmin
                conferenceData={cd}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                workshops={workshops}
              />
            )}
            {tab === "arrival" && (
              <Arrival
                isAdmin
                conferenceData={cd}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "contribution" && (
              <Contribution
                isAdmin
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
            {tab === "accommodation" && (
              <Accommodation
                isAdmin
                conferenceData={cd}
                control={control}
                register={register}
                errors={errors}
                paymentMethods={paymentMethods}
                setValue={setValue}
                registrationTypes={registrationTypes}
                trigger={trigger}
              />
            )}
            {tab === "extras" && (
              <Extras
                isAdmin
                conferenceData={cd}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                control={control}
              />
            )}
            {tab === "comments" && (
              <Comments
                isAdmin
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "summary" && isSummaryReady && (
              <Summary
                isAdmin
                isEarlyBird={participant?.participant.is_early_bird}
                conferenceData={cd}
                getValues={getValues}
                setValue={setValue}
                setTotal={setTotal}
                setPaypalFee={setPaypalFee}
                workshops={workshops}
                registrationTypes={registrationTypes}
                paymentMethods={paymentMethods}
                watch={watch}
              />
            )}

            <div className="mt-4 d-flex justify-content-end">
              <button type="submit" className="btn btn-outline-primary fw-bolder" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </form>
      )}
    </PageContain>
  );
};

export default AdminParticipantsUser;
