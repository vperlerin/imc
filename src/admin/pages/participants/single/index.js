import classNames from 'classnames';
import css from './index.module.scss';
import cssTabs from 'styles/components/tabs.module.scss';
import axios from "axios";
import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import { useBlockNavigation } from "hooks/block-navigation.js";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { conferenceData as cd } from "data/conference-data";
import { useApiSpecificData } from "api/specific-data/index.js";
import { useApiParticipant } from "api/participants";
import { Link } from "react-router-dom";
import Identitity from "components/registration/identity";
import Workshops from "components/registration/workshops";
import Arrival from "components/registration/arrival";
import Contribution from "components/registration/contribution";
import Accommodation from "components/registration/accomodation";
import Extras from "components/registration/extras";
import Comments from "components/registration/comments";
import Summary from "components/billing/summary";
import { formatFullDate } from "utils/date";

const AdminParticipantsUser = ({ isCurOnline = false }) => {
  const { participantId, tab } = useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [total, setTotal] = useState(0);
  const [paypalFee, setPaypalFee] = useState(0);
  const [talks, setTalks] = useState([]);
  const [fetchParticipantTrigger, setFetchParticipantTrigger] = useState(false);
  const [posters, setPosters] = useState([]);
  const activeTab = tab || "identity";
  const navigate = useNavigate();

  useBlockNavigation(unsavedChanges);

  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: specificDataError } = useApiSpecificData();
  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId, isCurOnline, fetchParticipantTrigger, true);
  const { control, register, handleSubmit, getValues, setValue, formState: { errors }, trigger, watch } = useForm();
  const isOnline = participant?.participant?.is_online === "1";
 
  const loading = specificdataLoading || participantLoading || isSaving;
  const error = [
    errorMsg,
    participantError,
    specificDataError,
  ].filter(Boolean);

  console.log(getValues());
  console.log("paypalFee ", paypalFee, " p ", participant?.participant.paypal_fee);

  // Paypal fess
  useEffect(() => {
    setPaypalFee(paypalFee);
  }, [paypalFee])


  // Detect form changes
  useEffect(() => {
    const subscription = watch(() => {
      setUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!tab) {
      navigate(`/admin/participants/onsite/${participantId}/summary`, { replace: true });
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
      setValue("excursion", extra_options.excursion === "0" ? "false" : "true");
      setValue("buy_tshirt", extra_options.buy_tshirt === "0" ? "false" : "true");
      setValue("tshirt_size", extra_options.tshirt_size || "");
    }

  }, [participant, sessions, setValue, setTalks, setPosters]);


  const onSubmit = async (formData) => {
    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // isAdminStep 1: Validate the entire form
    const isValid = await trigger(); // Triggers validation on all fields

    if (!isValid) {
      setIsSaving(false);
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    formData.talks = getValues("talks") || [];
    formData.posters = getValues("posters") || [];

    const formattedData = {
      ...formData,
      total_due: total,
      paypal_fee: paypalFee,
    };


    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/api/update_${isOnline ? 'online' : 'onsite'}_participant.php?id=${participantId}`,
        formattedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setFetchParticipantTrigger(prev => !prev);
        setSuccessMsg("Participant updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to update participant.");
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSaving(false);
    }
  };


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

  const hasAdminNotes = !!participant?.participant?.admin_notes;

  return (
    <PageContain
      breadcrumb={breadcrumb}
      isMaxWidth
    >
      <div className="position-relative fw-bolder">
        {loading && <Loader />}

        {error.length > 0 && (
          <div className="alert alert-danger fw-bolder">
            <ul className="mb-0">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
            <div className="mt-2">
              If you think this is a mistake please try again or {' '} <Link
                aria-label="Contact"
                to="/contact"
                title="Contact"
              >
                contact us
              </Link>.
            </div>
          </div>
        )}
 
        {successMsg && !loading && (
          <div className="alert alert-success">{successMsg}</div>
        )}
      </div>

      {participant && isSummaryReady && !loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className={classNames('nav nav-tabs mb-3 mt-2', cssTabs.tab, 'flex-column flex-sm-row')}>
            {[
              { key: "summary", label: "Billing" },
              { key: "identity", label: "Identity" },
              { key: "workshops", label: "Workshops" },
              ...(!isOnline ? [{ key: "arrival", label: "Arrival" }] : []),
              { key: "contribution", label: "Contribution" },
              ...(!isOnline ? [{ key: "accommodation", label: "Acc. & Pay. Method" }] : [{ key: "accommodation", label: "Pay. Method" }]),
              ...(!isOnline ? [{ key: "extras", label: "Extras" }] : []),
              { key: "comments", label: "Comments" },
              { key: "admin_notes", label: "Marc's notes" },
            ].map(({ key, label }) => (
              <li className="nav-item" key={key}>
                <a
                  className={
                    classNames(
                      'nav-link',
                      activeTab === key && cssTabs.active,
                    )
                  }
                  href={`/admin/participants/onsite/${participantId}/${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/admin/participants/onsite/${participantId}/${key}`);
                  }}
                >

                  {hasAdminNotes && key === 'admin_notes' ? (
                    <span className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                      {label}
                    </span>
                  ) : (
                    <>{label}</>
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
                isOnline={isOnline}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
              />
            )}
            {tab === "workshops" && (
              <Workshops
                isAdmin
                isOnline={isOnline}
                conferenceData={cd}
                register={register}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                workshops={workshops}
              />
            )}
            {tab === "arrival" && !isOnline && (
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
            {tab === "accommodation" && (
              <Accommodation
                isAdmin
                isOnline={isOnline}
                isEarlyBird={participant?.participant.is_early_bird}
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
            {tab === "extras" && !isOnline && (
              <Extras
                isAdmin
                conferenceData={cd}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                trigger={trigger}
                watch={watch}
                control={control}
              />
            )}
            {tab === "comments" && (
              <div className={classNames(css.mxW, 'mx-auto')}>
                <Comments
                  isAdmin
                  isOnline={isOnline}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                />
              </div>
            )}
            
              <div className={classNames(css.mxW, 'mx-auto', tab === "summary" && isSummaryReady ? 'visible': "invisible")}>
                <div className="d-flex mt-3 align-items-center justify-content-between w-100 mb-3">
                  <div>
                    {participant?.participant?.first_name
                      ? participant.participant.first_name.charAt(0).toUpperCase() +
                      participant.participant.first_name.slice(1)
                      : ""}

                    {' '}{participant?.participant?.last_name || ""}

                    {participant.confirmation_sent === "1" ? (
                      <>
                        ✅ {`has been confirmed on `} {participant.confirmation_date && formatFullDate(participant.confirmation_date)}

                      </>
                    ) : (
                      <>
                        ❌  has NOT been confirmed yet.
                      </>
                    )}
                  </div>

                  {participant.confirmation_sent !== "1" && (
                    <div>
                      <Link
                        className="btn btn-outline-success fw-bolder"
                        to={`/admin/participants/${isOnline ? 'online' : 'onsite'}/payment/${participantId}`}
                      >
                        Go to Payments to confirm
                      </Link>
                    </div>
                  )}
                </div>

                <Summary
                  isAdmin
                  isOnline={isOnline}
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
              </div>
 
            {tab === "admin_notes" && (
              <div className={classNames(css.mxW, 'mx-auto mb-3')}>
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
              <button type="submit" className="btn btn-outline-primary fw-bolder" disabled={isSaving}>{isSaving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </form>
      )}
    </PageContain>
  );
};

export default AdminParticipantsUser;
