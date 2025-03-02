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
}) => {
  const [wantsToContribute, setWantsToContribute] = useState(null);
 
  const imcSessions = conferenceData.sessions;
 
  const { fields: talks, append: addTalk, remove: removeTalk } = useFieldArray({ control, name: "talks" });
  const { fields: posters, append: addPoster, remove: removePoster } = useFieldArray({ control, name: "posters" });

  // Validate before adding new talk/poster
  const validateAndAdd = async (type) => {
    const isValid = await trigger();
    if (isValid) {
      if (type === "talk") addTalk({});
      else if (!isOnline) addPoster({ print: false }); // Default print to false
    }
  };

  const fillTestData = () => {
    setValue("wantsToContribute", "yes");
    setWantsToContribute(true);
    removeTalk();
    if (!isOnline) {
      removePoster();
    }

    addTalk({
      title: "Meteor Observation Techniques",
      authors: "John Doe, Jane Smith",
      abstract: "A study on advanced meteor observation methods.",
      session: "Meteor physics and dynamics",
      duration: "15min", 
    });

    if (!isOnline) {
      addPoster({
        title: "Radio Meteor Detection",
        authors: "Alice Brown, Bob White",
        abstract: "An overview of detecting meteors using radio waves.",
        session: "Radio meteor work", 
        print: "true",
      });
    }
  };

  useEffect(() => {
    const existingTalks = getValues("talks") || [];
    const existingPosters = getValues("posters") || [];
  
    if (existingTalks.length > 0 || existingPosters.length > 0) {
      setValue("wantsToContribute", "yes");
      setWantsToContribute(true);
    }
  
    // Populate talks if they exist
    if (existingTalks.length > 0) {
      removeTalk();  
      existingTalks.forEach((talk) => addTalk({ ...talk, session: talk.session_id })); // Ensure session ID is set
    }
  
    // Populate posters if they exist
    if (existingPosters.length > 0 && !isOnline) {
      removePoster(); 
      existingPosters.forEach((poster) => addPoster({ ...poster, session: poster.session_id }));
    }
  }, [getValues, setValue, addTalk, addPoster, removeTalk, removePoster, isOnline]);


  return (
    <div className="position-relative">
      {isDebugMode && (
        <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
          Fill Test Data
        </button>
      )}

      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Contributions
        </h4>
      )}
 
      <div className={classNames(cssForm.smallW, 'mx-auto position-relative')}>
        <div className="mb-3 row">
          <label className={classNames('text-center fw-bold', cssForm.balance)}>
            Would you like to contribute a talk
            {!isOnline && (<>{' '}or a poster</>)}  to the main IMC {conferenceData.year} conference?</label>
          <div className="text-center btn-group d-block mt-3" role="group">
            <input
              type="radio"
              className="btn-check"
              id="contributeYes"
              value="yes"
              {...register("wantsToContribute", { required: "Please select an option" })}
              onChange={() => setWantsToContribute(true)}
            />
            <label className="btn btn-outline-primary" htmlFor="contributeYes">Yes</label>

            <input
              type="radio"
              className="btn-check"
              id="contributeNo"
              value="no"
              {...register("wantsToContribute", { required: "Please select an option" })}
              onChange={() => {
                if (talks.length > 0 || posters.length > 0) {
                  const confirmDelete = window.confirm(
                    "Are you sure? All talks and posters you have entered will be deleted."
                  );

                  if (!confirmDelete) {
                    return;
                  }

                  removeTalk();
                  removePoster();
                }

                setWantsToContribute(false);
              }}
            />
            <label className="btn btn-outline-primary" htmlFor="contributeNo">No</label>
          </div>
          {errors.wantsToContribute && <p className="text-danger fw-bold text-center"><small>{errors.wantsToContribute.message}</small></p>}
        </div>
      </div>


      {/* Contribution Fields */}
      {wantsToContribute && (
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
              conferenceData={conferenceData}
              key={talk.id}
              index={index}
              register={register}
              remove={() => removeTalk(index)}
              type="talk"
              errors={errors}
              imcSessions={imcSessions}
              talkDurations={talkDurations} 
              initialValues={talk}
            />
          ))}

          {/* Posters */}
          {!isOnline &&
            posters.map((poster, index) => (
              <TalkPosterForm
                isAdmin={isAdmin}
                conferenceData={conferenceData}
                key={poster.id}
                index={index}
                register={register}
                remove={() => removePoster(index)}
                type="poster"
                errors={errors}
                imcSessions={imcSessions} 
                initialValues={poster}
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
