import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useState } from "react";
import StepDislay from "components/registration/stepDisplay";
import TalkPosterForm from "./talkPoster";
import { MdAdd } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { formatFullDate } from "utils/date";
import { useFieldArray } from "react-hook-form";

// !hardcode in DB
const talkDurations = ["10min", "15min", "20min", "25min", "30min"];

const ContributionForm = ({
  isAdmin = false,
  isEditing = false,
  conferenceData,
  control,
  isDebugMode = false,
  isOnline = false,
  register,
  errors,
  step,
  stepTotal,
  trigger,
  setValue,
  getValues,
  sessions,
  watch
}) => {
  const { fields: talks, append: addTalk, remove: removeTalk } = useFieldArray({ control, name: "talks" });
  const { fields: posters, append: addPoster, remove: removePoster } = useFieldArray({ control, name: "posters" });

  const setWantsToContribute = (value) => {
    setValue("wantsToContribute", value, { shouldDirty: true, shouldValidate: true });
  };

  // Validate before adding new talk/poster
  const validateAndAdd = async (type) => {
    const isValid = await trigger();
    if (isValid) {
      if (type === "talk") addTalk({});
      else if (!isOnline) addPoster({ print: false }); // Default print to false
    }
  };

  const fillTestData = () => {
    setValue("wantsToContribute", true);
    removeTalk();
    if (!isOnline) removePoster();

    const meteorPhysicsSession = sessions.find(s => s.name === "Meteor physics and dynamics")?.id || sessions[0]?.id;
    const radioMeteorSession = sessions.find(s => s.name === "Radio meteor work")?.id || sessions[0]?.id;

    addTalk({
      title: "Meteor Observation Techniques",
      authors: "John Doe, Jane Smith",
      abstract: "A study on advanced meteor observation methods.",
      session_id: meteorPhysicsSession,
      duration: "15min",
    });

    if (!isOnline) {
      addPoster({
        title: "Radio Meteor Detection",
        authors: "Alice Brown, Bob White",
        abstract: "An overview of detecting meteors using radio waves.",
        session_id: radioMeteorSession,
        print: true,
      });
    }
  };

  /*
  useEffect(() => {
    const wantsToContributeValue = watch("wantsToContribute");
    const existingTalks = getValues("talks") || [];
    const existingPosters = getValues("posters") || [];

    if ((existingTalks.length > 0 || existingPosters.length > 0) && wantsToContributeValue !== true) {
      setValue("wantsToContribute", true, { shouldDirty: false, shouldValidate: false });
    }
  }, [watchWantsToContribute, getValues, setValue]);
  */



  return (
    <div className="position-relative">
      {isDebugMode && (
        <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
          Fill Test Data
        </button>
      )}

      {!isAdmin && !isEditing && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Contributions
        </h4>
      )}

      {isEditing && (
        <h4 className="mb-3 border-bottom pb-2">
          Update your Contributions
        </h4>
      )}

      <div className={classNames(cssForm.smallW, 'mx-auto position-relative')}>
        <div className="mb-3 row">
          <label className={classNames('text-center fw-bold', cssForm.balance)}>
            Would you like to contribute a{isOnline && 'n online '} talk
            {!isOnline && (<>{' '}or a poster</>)}  to the main IMC {conferenceData.year} conference program?</label>

          <div className="text-center btn-group d-block mt-3" role="group">
            <input
              type="radio"
              className="btn-check"
              id="contributeYes"
              value="true"
              {...register("wantsToContribute")}
              onChange={() => setWantsToContribute(true)}
            />
            <label className={classNames("btn", {
              "btn-primary": watch("wantsToContribute"),
              "btn-outline-primary": !watch("wantsToContribute"),
            })} htmlFor="contributeYes">Yes</label>

            <input
              type="radio"
              className="btn-check"
              id="contributeNo"
              value="false"
              {...register("wantsToContribute")}
              onChange={(e) => {
                if (talks.length > 0 || posters.length > 0) {
                  const confirmDelete = window.confirm(
                    "Are you sure? All talks and posters you have entered will be deleted."
                  );

                  if (!confirmDelete) {
                    e.preventDefault();
                    return;
                  }

                  removeTalk();
                  removePoster();
                }
                setWantsToContribute(false);
              }}
            />

            <label className={classNames("btn", {
              "btn-primary": !watch("wantsToContribute"),
              "btn-outline-primary": watch("wantsToContribute"),
            })} htmlFor="contributeNo">No</label>
          </div>
          {errors.wantsToContribute && <p className="text-danger fw-bold text-center"><small>{errors.wantsToContribute.message}</small></p>}
        </div>
      </div>


      {/* Contribution Fields */}
      {watch("wantsToContribute") && (
        <>
          {!isAdmin && (
            <div className="border border-2 p-3 rounded-2 bg-dark mb-3 mx-md-5">
              <h6 className="fw-bolder gap-2 d-inline-flex"><FiInfo /> Do not register a lecture {!isOnline && (<>or poster</>)} without having a topic.</h6>
              <p>
                If you consider to present a lecture {!isOnline && (<>or a poster</>)} but have not yet decided on the topic, skip this item and for now just continue with your registration. You can add your talk {!isOnline && (<>or poster</>)} later. The absolute deadline for <b className="text-danger">submitting talks {!isOnline && (<>and posters</>)} is {formatFullDate(conferenceData.deadlines.reg)},</b> but if we cannot accommodate all presentations, priority may be given to those registered early.
              </p>

              <h6 className="fw-bolder gap-2 d-inline-flex mt-2"><FiInfo />  For all lectures {!isOnline && (<>and posters</>)}, a paper for the IMC Proceedings is required.</h6>
              <p>
                Ideally, papers for the Proceedings should be submitted before the start of the conference. <b className="text-danger">The absolute deadline for Proceedings paper delivery is {formatFullDate(conferenceData.deadlines.paper)}</b>.
              </p>
            </div>
          )}

          {/* Talks */}
          {talks.map((talk, index) => (
            <TalkPosterForm
              isAdmin={isAdmin}
              isEditing={isEditing}
              conferenceData={conferenceData}
              key={talk.id}
              index={index}
              register={register}
              remove={() => removeTalk(index)}
              type="talk"
              errors={errors}
              sessions={sessions}
              setValue={setValue}
              talkDurations={talkDurations}
              initialValues={talk}
              watch={watch}
            />
          ))}

          {/* Posters */}
          {!isOnline &&
            posters.map((poster, index) => (
              <TalkPosterForm
                isAdmin={isAdmin}
                isEditing={isEditing}
                conferenceData={conferenceData}
                key={poster.id}
                index={index}
                register={register}
                remove={() => removePoster(index)}
                type="poster"
                errors={errors}
                sessions={sessions}
                initialValues={poster}
                watch={watch}
                setValue={setValue}
              />
            ))}

          {/* Buttons */}
          <div className="d-flex gap-3 justify-content-center">
            <button type="button" className="fw-bold btn btn-outline-secondary my-2" onClick={() => validateAndAdd("talk")}>
              <MdAdd /> Add Talk
            </button>

            {!isOnline && (
              <button type="button" className="fw-bold btn btn-outline-secondary my-2" onClick={() => validateAndAdd("poster")}>
                <MdAdd /> Add Poster
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ContributionForm;
