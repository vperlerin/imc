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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [errorGettingDataFromDB, setErrorGettingDataFromDB] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [workshops, setWorkshops] = useState([]); 
  const [registrationTypes, setRegistrationTypes] = useState([]); 
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [total, setTotal] = useState(0);
  const [paypalFee, setPaypalFee] = useState(0); 
  const activeTab = tab || "identity";
  const hasFetcheData = useRef(false); 
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


  // Fetch available workshops, payment_methods & registration_types from API
  useEffect(() => {
    if (hasFetcheData.current) {
      return;
    }

    hasFetcheData.current = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_specific_data.php`);
        if (response.data.success
          && response.data.data.workshops
          && response.data.data.payment_methods
          && response.data.data.registration_types) {
          setWorkshops(response.data.data.workshops);
          setPaymentMethods(response.data.data.payment_methods);
          setRegistrationTypes(response.data.data.registration_types);
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
    const fetchParticipant = async () => {
      if (!participantId) {
        setError("Invalid participant ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/participant.php?id=${participantId}`
        );

        if (response.data.success) {
          setParticipant(response.data.data);
          reset(response.data.data.participant); // Prefill form
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
    if (!participant) {
      return;
    }

    // Identity
    Object.keys(participant.participant).forEach((key) => {
      if (participant.participant[key]) {
        setValue(key, participant.participant[key]);
      }
    });


    if (participant.participant.dob) {
      const dobParts = participant.participant.dob.split("-");
      if (dobParts.length === 3) {
        setValue("dobYear", dobParts[0]);
        setValue("dobMonth", parseInt(dobParts[1], 10));
        setValue("dobDay", parseInt(dobParts[2], 10));
      }
    }

    // Workshops
    const participantWorkshops = participant.workshops || [];
    participantWorkshops.forEach(workshop => {
      const isAttending = participantWorkshops.some(selected => String(selected.id) === String(workshop.id));
      setValue(`workshops.${workshop.id}`, isAttending ? "true" : "false"); // Set individually
    });

    // Arrival  
    const participantArrival = participant.arrival || [];
    for (const [key, val] of Object.entries(participantArrival)) {
      if (val != null) {
        if (
          key === "arrival_hour" ||
          key === "departure_hour" ||
          key === "arrival_minute" ||
          key === "departure_minute"
        ) {
          setValue(key, val.toString().padStart(2, "0"));
        } else {
          setValue(key, val);
        }
      }
    }

    // Contribution
    const contributions = participant.contributions || [];
    const talks = contributions.filter(c => c.type === "talk");
    const posters = contributions.filter(c => c.type === "poster");
    if (talks.length > 0 || posters.length > 0) {
      if (talks.length !== 0) {
        setValue('talks', talks);
      }

      if (posters.length !== 0) {
        setValue('posters', posters);
      }
    }

    // Accomodation
    const accomodation = participant.accomodation || [];
    Object.keys(accomodation).forEach((key) => {
      if (accomodation[key]) {
        setValue(key, accomodation[key]);
      }
    });


  }, [participant]);


  const onSubmit = async (formData) => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/update_participant.php?id=${participantId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setSuccessMsg("Participant details updated successfully!");
        setUnsavedChanges(false);
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

  if (errorGettingDataFromDB) {
    return <div className="alert alert-danger fw-bolder">{errorGettingDataFromDB}</div>
  }


  return (
    <PageContain
      breadcrumb={breadcrumb}
    >
      {loading || (error && !loading) || (!participant && !loading) || successMsg}
      <div className="position-relative">
        {loading && <Loader />}
        {error && !loading && <div className="alert alert-danger">{error}</div>}
        {!participant && !loading && <div className="alert alert-danger">No participant data available.</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
      </div>

      {!loading && participant && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={classNames('nav nav-tabs mb-3 mt-2', cssTabs.tab)}>
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
                watch={watch}
                workshops={workshops}
                trigger={trigger}
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
                trigger={trigger}
              />
            )}
            {tab === "extras" && (
              <Extras
                isAdmin
                conferenceData={cd}
                register={register}
                errors={errors}
                initialData={participant.extra_options}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "comments" && (
              <Comments
                isAdmin
                register={register}
                errors={errors}
                initialData={participant.participant}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "summary" && (
              <Summary
                isAdmin
                conferenceData={cd}
                getValues={getValues}
                setValue={setValue}
                workshops={workshops}
                setTotal={setTotal}
                setPaypalFee={setPaypalFee}
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
