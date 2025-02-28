import PageContain from "@/admin/components/page-contain";
import Loader from "components/loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { conferenceData as cd } from "data/conference-data";

// Import all form components
import Identitity from "components/registration/identity";
import Workshops from "components/registration/workshops";
import Arrival from "components/registration/arrival";
import Contribution from "components/registration/contribution";
import Accomodation from "components/registration/accomodation";
import Extras from "components/registration/extras";
import Comments from "components/registration/comments";
import Summary from "components/billing/summary";

const AdminParticipantsUser = () => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [activeTab, setActiveTab] = useState("identity"); // Default tab
  const { participantId } = useParams();

  const { control, register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm();

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
      } else {
        throw new Error(response.data.message || "Failed to update participant.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
 

  return (
    <PageContain title={loading ? '' : `Edit Participant: ${participant?.participant.first_name} ${participant?.participant.last_name}`}>
      <div className="position-relative">
        {loading && <Loader />}
        {error && !loading && <div className="alert alert-danger">{error}</div>}
        {!participant && !loading && <div className="alert alert-danger">No participant data available.</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
      </div>

      {!loading && participant && (
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Bootstrap Nav Tabs */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "identity" ? "active" : ""}`} onClick={() => setActiveTab("identity")}>Identity</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "workshops" ? "active" : ""}`} onClick={() => setActiveTab("workshops")}>Workshops</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "arrival" ? "active" : ""}`} onClick={() => setActiveTab("arrival")}>Arrival</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "contribution" ? "active" : ""}`} onClick={() => setActiveTab("contribution")}>Contribution</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "accommodation" ? "active" : ""}`} onClick={() => setActiveTab("accommodation")}>Accommodation</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "extras" ? "active" : ""}`} onClick={() => setActiveTab("extras")}>Extras</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "comments" ? "active" : ""}`} onClick={() => setActiveTab("comments")}>Comments</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "summary" ? "active" : ""}`} onClick={() => setActiveTab("summary")}>Summary</button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "identity" && (
              <Identitity isAdmin register={register} errors={errors} initialData={participant.participant} setValue={setValue} />
            )}
            {activeTab === "workshops" && (
              <Workshops isAdmin conferenceData={cd} register={register} errors={errors} initialData={participant.workshops} setValue={setValue} watch={watch} />
            )}
            {activeTab === "arrival" && (
              <Arrival register={register} errors={errors} initialData={participant.arrival} setValue={setValue} />
            )}
            {activeTab === "contribution" && (
              <Contribution
                control={control}
                register={register}
                errors={errors}
                initialData={{
                  talks: participant.contributions.filter(c => c.type === 'talk') || [],
                  posters: participant.contributions.filter(c => c.type === 'poster') || [],
                }}
                setValue={setValue}
                watch={watch}
              />
            )}
            {activeTab === "accommodation" && (
              <Accomodation control={control} register={register} errors={errors} initialData={participant.accommodation} setValue={setValue} />
            )}
            {activeTab === "extras" && (
              <Extras register={register} errors={errors} initialData={participant.extra_options} setValue={setValue} />
            )}
            {activeTab === "comments" && (
              <Comments register={register} errors={errors} initialData={participant.participant} setValue={setValue} />
            )}
            {activeTab === "summary" && (
              <Summary getValues={() => participant} setValue={setValue} />
            )}
          </div>

          <div className="mt-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </PageContain>
  );
};

export default AdminParticipantsUser;
