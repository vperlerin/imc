import classNames from 'classnames';
import cssTabs from 'styles/components/tabs.module.scss';
import axios from "axios";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useRef, useState } from "react";
import { useBlockNavigation } from "hooks/block-navigation.js";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { conferenceData as cd } from "data/conference-data";
import { useApiSpecificData } from "api/specific-data/index.js";
import { useApiParticipant } from "api/participants";
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [total, setTotal] = useState(0);
  const [paypalFee, setPaypalFee] = useState(0);
  const [talks, setTalks] = useState([]);
  const [posters, setPosters] = useState([]);
  const activeTab = tab || "identity";
  const navigate = useNavigate();

  useBlockNavigation(unsavedChanges);

  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: specificDataError } = useApiSpecificData();
  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId, 0, true);
  const { control, register, handleSubmit, getValues, setValue, formState: { errors }, trigger, watch } = useForm();

  // Detect form changes
  useEffect(() => {
    const subscription = watch(() => {
      setUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!tab) {
      navigate(`/admin/participants/onsite/${participantId}/identity`, { replace: true });
    }
  }, [tab, participantId, navigate]);


  useEffect(() => {
    if (!participant || sessions.length === 0) {
      return;
    }

    // Extract participant data safely
    const { participant: participantDetails, workshops, arrival, contributions, accommodation, extra_options } = participant || {};
    const { dob, ...otherDetails } = participantDetails || {};

    // Handle Date of Birth
    if (dob) {
      const [year, month, day] = dob.split("-");
      setValue("dobDay", String(Number(day)));
      setValue("dobMonth", String(Number(month)));
      setValue("dobYear", year);
    }

    // Set other participant details safely
    if (otherDetails) {
      Object.entries(otherDetails).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          setValue(key, value);
        }
      });
    }

    // Handle Workshops
    if (workshops && Array.isArray(workshops)) {
      const participantWorkshops = workshops.map(workshop => String(workshop.id));
      setValue("workshops", participantWorkshops);
    }

    // Handle Arrival Details safely
    if (arrival) {
      Object.entries(arrival).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          setValue(
            key,
            key.includes("hour") || key.includes("minute") ? String(value).padStart(2, "0") : value
          );
        }
      });
    }

    // Handle Contributions (Talks & Posters)
    if (contributions && Array.isArray(contributions) && sessions.length > 0) {
      const updatedTalks = contributions
        .filter(contribution => contribution.type === "talk")
        .map(talk => ({ ...talk }));

      const updatedPosters = contributions
        .filter(contribution => contribution.type === "poster")
        .map(poster => ({ ...poster }));

      // Store in state
      setTalks(updatedTalks);
      setPosters(updatedPosters);

      // Set values in form so they persist on submit
      setValue("talks", updatedTalks);
      setValue("posters", updatedPosters);

      // Set wantsToContribute if at least one talk or poster exists
      if (updatedTalks.length > 0 || updatedPosters.length > 0) {
        setValue("wantsToContribute", "yes");
      }
    }


    // Handle Accommodation
    if (accommodation?.registration_type_id) {
      setValue("registration_type_id", String(accommodation.registration_type_id));
    }

    // Handle Extra Options safely
    if (extra_options) {
      setValue("excursion", Boolean(extra_options.excursion));
      setValue("buy_tshirt", Boolean(extra_options.buy_tshirt));
      setValue("tshirt_size", extra_options.tshirt_size || "");
    }

  }, [participant, sessions, setValue, setTalks, setPosters]);

  const onSubmit = async (formData) => {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    // isAdminStep 1: Validate the entire form
    const isValid = await trigger(); // Triggers validation on all fields

    if (!isValid) {
      setSaving(false);
      setError("Please fill in all required fields.");
      return;
    }

    // isAdminStep 2: Check if the user selected a T-shirt but didn't choose a size
    if (formData.buy_tshirt === "1" && !formData.tshirt_size) {
      setSaving(false);
      setError("You must select a T-shirt size if you choose to buy one.");
      return;
    }

    formData.talks = talks;
    formData.posters = posters;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/update_participant.php?id=${participantId}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        let countdown = 3; // Start countdown from 3 seconds
      
        setSuccessMsg(`Participant updated successfully! The page will reload in ${countdown} seconds to assure data integrity.`);
        setUnsavedChanges(false);
      
        const interval = setInterval(() => {
          countdown -= 1;
          if (countdown > 0) {
            setSuccessMsg(`Participant updated successfully! The page will reload in ${countdown} seconds to assure data integrity.`);
          } else {
            clearInterval(interval);
            window.location.reload();
          }
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

  const isLoading = specificdataLoading || participantLoading || saving || !isSummaryReady;
  const hasError = participantError || specificDataError || error;

  const hasAdminNotes =!!participant?.participant?.admin_notes;

  console.log("vALUES ", getValues());
 

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
    >
      <div className="position-relative fw-bolder">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <div className="alert alert-danger">{participantError || specificDataError || error}</div>
        )}

        {!participant && !isLoading && (
          <div className="alert alert-danger">No participant data available for this ID - please try again.</div>
        )}

        {successMsg && !isLoading && (
          <div className="alert alert-success">{successMsg}</div>
        )}
      </div>

      {participant && isSummaryReady && !isLoading &&  (
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
              { key: "summary", label: "Summary" },
              { key: "admin_notes", label: "Marc's notes" },
            ].map(({ key, label }) => (
              <li className="nav-item" key={key}>
                <a
                  className={
                    classNames(
                       'nav-link',
                       activeTab === key && cssTabs.active,
                       key === 'admin_notes' && 'position-relative'
                    )
                  }
                  href={`/admin/participants/onsite/${participantId}/${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/participants/onsite/${participantId}/${key}`);
                  }}
                >
                  {label}
                  {hasAdminNotes && key === 'admin_notes' && (
                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                  )}
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
            {tab === "admin_notes" && (
              <div className="mb-3">
                <label htmlFor="admin_notes" className="form-label fw-bold">
                  Admin Notes
                </label>
                <textarea
                  id="admin_notes"
                  className="form-control"
                  placeholder="Enter your admin notes here"
                  rows={6}
                  {...register("admin_notes")}
                />
                {errors.admin_notes && (
                  <div className="text-danger mt-1">{errors.admin_notes.message}</div>
                )}
              </div>
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
