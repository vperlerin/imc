import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useRef } from "react";
import StepDislay from "components/registration/stepDisplay";
import TalkPosterForm from "./talkPoster";
import { MdAdd } from "react-icons/md";
import { FiInfo } from "react-icons/fi";
import { formatFullDate } from "utils/date";
import { useFieldArray } from "react-hook-form";

// !hardcode in DB
const talkDurations = ["10min", "15min", "20min", "25min", "30min"];

const normalizeBooleanString = (value) =>
  value === true || value === "true" || value === 1 ? "true" : "false";

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
  sessions,
  watch
}) => {
  const { fields: talks, append: addTalk, remove: removeTalk } = useFieldArray({ control, name: "talks" });
  const { fields: posters, append: addPoster, remove: removePoster } = useFieldArray({ control, name: "posters" });

  // IMPORTANT: keep it as "true"/"false"
  const wantsToContributeValue = normalizeBooleanString(watch("wantsToContribute") ?? "false");
  const wantsToContribute = wantsToContributeValue === "true";

  const setWantsToContribute = (value) => {
    setValue("wantsToContribute", value, { shouldDirty: true, shouldValidate: true });
  };

  // Confirm wrappers (per talk/poster)
  const confirmAndRemoveTalk = (index) => {
    const confirmDelete = window.confirm("Are you sure? This talk will be deleted.");
    if (!confirmDelete) return;
    removeTalk(index);
  };

  const confirmAndRemovePoster = (index) => {
    const confirmDelete = window.confirm("Are you sure? This poster will be deleted.");
    if (!confirmDelete) return;
    removePoster(index);
  };

  // Ensure we only auto-add once when switching from NO -> YES
  const didAutoAddRef = useRef(false);

  useEffect(() => {
    if (!wantsToContribute) {
      didAutoAddRef.current = false;
      return;
    }

    // If data is already loaded (admin/edit) and forms exist, do nothing
    if (talks.length > 0 || posters.length > 0) {
      didAutoAddRef.current = true;
      return;
    }

    if (didAutoAddRef.current) return;

    didAutoAddRef.current = true;

    // Default behavior: add a first TALK
    //addTalk({});
  }, [wantsToContribute, talks.length, posters.length, addTalk]);

  // Validate before adding new talk/poster
  const validateAndAdd = async (type) => {
    const isValid = await trigger();
    if (!isValid) return;

    setWantsToContribute("true");
    if (type === "talk") addTalk({});
    else if (!isOnline) addPoster({ print: false });
  };

  const fillTestData = () => {
    setWantsToContribute("true");
    removeTalk();
    if (!isOnline) removePoster();

    const meteorPhysicsSession = sessions.find((s) => s.name === "Meteor physics and dynamics")?.id || sessions[0]?.id;
    const radioMeteorSession = sessions.find((s) => s.name === "Radio meteor work")?.id || sessions[0]?.id;

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
    // If no contribution forms exist, force answer to "false"
    if (talks.length === 0 && posters.length === 0) {
      if (wantsToContributeValue !== "false") {
        setValue("wantsToContribute", "false", {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
  }, [talks.length, posters.length, wantsToContributeValue, setValue]);
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

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        <div className="mb-3 row">
          <label className={classNames("text-center fw-bold", cssForm.balance)}>
            Would you like to contribute a{isOnline && "n online "} talk {!isOnline && <>or a poster</>} to the main IMC{" "}
            {conferenceData.year} conference program?
          </label>

          {/* Register field once so RHF knows it exists (no uncontrolled radio weirdness) */}
          <input type="hidden" {...register("wantsToContribute")} />

          <div className="text-center btn-group d-block mt-3" role="group">
            <input
              type="radio"
              className="btn-check"
              id="contributeYes"
              name="wantsToContributeRadio"
              value="true"
              checked={wantsToContributeValue === "true"}
              onChange={() => setWantsToContribute("true")}
            />
            <label
              className={classNames("btn", {
                "btn-primary": wantsToContributeValue === "true",
                "btn-outline-primary": wantsToContributeValue !== "true",
              })}
              htmlFor="contributeYes"
            >
              Yes
            </label>

            <input
              type="radio"
              className="btn-check"
              id="contributeNo"
              name="wantsToContributeRadio"
              value="false"
              checked={wantsToContributeValue === "false"}
              onChange={() => {
                if (talks.length > 0 || posters.length > 0) {
                  const confirmDelete = window.confirm(
                    "Are you sure? All talks and posters you have entered will be deleted."
                  );

                  if (!confirmDelete) {
                    // Keep YES selected if user cancels
                    setWantsToContribute("true");
                    return;
                  }

                  removeTalk();
                  removePoster();
                }
                setWantsToContribute("false");
              }}
            />
            <label
              className={classNames("btn", {
                "btn-primary": wantsToContributeValue === "false",
                "btn-outline-primary": wantsToContributeValue !== "false",
              })}
              htmlFor="contributeNo"
            >
              No
            </label>
          </div>

          {errors.wantsToContribute && (
            <p className="text-danger fw-bold text-center">
              <small>{errors.wantsToContribute.message}</small>
            </p>
          )}
        </div>
      </div>

      {wantsToContribute && talks.length === 0 && posters.length === 0 && (
        <div className="text-center my-4">
          <p className="fw-bolder mb-2">What would you like to add?</p>

          <div className="d-flex gap-3 justify-content-center">
            <button
              type="button"
              className="btn btn-outline-neutral fw-bolder"
              onClick={() => validateAndAdd("talk")}
            >
              <MdAdd /> Add Talk
            </button>

            {!isOnline && (
              <button
                type="button"
                className="btn btn-outline-neutral fw-bolder"
                onClick={() => validateAndAdd("poster")}
              >
                <MdAdd /> Add Poster
              </button>
            )}
          </div>
        </div>
      )}

      {/* Contribution Fields */}
      {wantsToContribute && (
        <>
          {!isAdmin && (
            <div className="border border-2 p-3 rounded-2 bg-dark mb-3 mx-md-5">
              <h6 className="fw-bolder gap-2 d-inline-flex">
                <FiInfo /> Do not register a lecture {!isOnline && <>or poster</>} without having a topic.
              </h6>
              <p>
                If you consider to present a lecture {!isOnline && <>or a poster</>} but have not yet decided on the topic,
                skip this item and for now just continue with your registration. You can add your talk {!isOnline && <>or poster</>} later. The absolute deadline for{" "}
                <b className="text-danger">
                  submitting talks {!isOnline && <>and posters</>} is {formatFullDate(conferenceData.deadlines.reg)},
                </b>{" "}
                but if we cannot accommodate all presentations, priority may be given to those registered early.
              </p>

              <h6 className="fw-bolder gap-2 d-inline-flex mt-2">
                <FiInfo /> For all lectures {!isOnline && <>and posters</>}, a paper for the IMC Proceedings is required.
              </h6>
              <p>
                Ideally, papers for the Proceedings should be submitted before the start of the conference.{" "}
                <b className="text-danger">
                  The absolute deadline for Proceedings paper delivery is {formatFullDate(conferenceData.deadlines.paper)}
                </b>
                .
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
              remove={() => confirmAndRemoveTalk(index)}
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
                remove={() => confirmAndRemovePoster(index)}
                type="poster"
                errors={errors}
                sessions={sessions}
                initialValues={poster}
                watch={watch}
                setValue={setValue}
              />
            ))}

          {/* Buttons */}
          {!(wantsToContribute && talks.length === 0 && posters.length === 0) && (
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className="fw-bold btn btn-outline-secondary my-2"
                onClick={() => validateAndAdd("talk")}
              >
                <MdAdd /> Add Talk
              </button>

              {!isOnline && (
                <button
                  type="button"
                  className="fw-bold btn btn-outline-secondary my-2"
                  onClick={() => validateAndAdd("poster")}
                >
                  <MdAdd /> Add Poster
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContributionForm;
