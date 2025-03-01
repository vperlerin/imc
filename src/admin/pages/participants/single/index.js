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
  const [successMsg, setSuccessMsg] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const activeTab = tab || "identity";
  const hasFetchedWorkshops = useRef(false);
  const navigate = useNavigate();

  const { control, register, handleSubmit, setValue, formState: { errors, isDirty }, reset, trigger, watch } = useForm();

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

  useEffect(() => {
    if (hasFetchedWorkshops.current) {
      return;
    }

    hasFetchedWorkshops.current = true;
    setLoading(true);

    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_workshops.php`);

        if (response.data.success && Array.isArray(response.data.data)) {
          setWorkshops(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch workshops - please try again later.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching workshops.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);


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


  return (
    <PageContain
      breadcrumb={breadcrumb}
      title={loading ? '' : `Edit Participant: ${participant?.participant.first_name} ${participant?.participant.last_name}`}
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
                initialData={participant.participant}
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
                initialData={participant.workshops}
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
                initialData={participant.arrival} 
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
                initialData={{
                  talks: participant.contributions.filter(c => c.type === "talk") || [],
                  posters: participant.contributions.filter(c => c.type === "poster") || [],
                }}
                setValue={setValue}
                watch={watch} 
                trigger={trigger}
              />
            )}
            {tab === "accommodation" && (
              <Accommodation 
                control={control} 
                register={register} 
                errors={errors} 
                initialData={participant.accommodation} 
                setValue={setValue} 
                trigger={trigger}
              />
            )}
            {tab === "extras" && (
              <Extras 
                register={register} 
                errors={errors} 
                initialData={participant.extra_options} 
                setValue={setValue}  
                trigger={trigger}
              />
            )}
            {tab === "comments" && (
              <Comments 
                register={register} 
                errors={errors} 
                initialData={participant.participant} 
                setValue={setValue}  
                trigger={trigger}
              />
            )}
            {tab === "summary" && (
              <Summary 
                getValues={() => participant} 
                setValue={setValue} 
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
