import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import { FiTrash2 } from "react-icons/fi";
import React, { useEffect, useState } from "react";

const TalkPosterForm = ({
  isAdmin = false,
  isEditing = false,
  conferenceData,
  index,
  register,
  remove,
  type,
  errors,
  sessions,
  talkDurations = [],
  initialValues = {},
  setValue,
  watch,
}) => {
  const [printChanged, setPrintChanged] = useState(false);
  const isTalk = type === "talk";

  const printValue = watch(`${type}s.${index}.print`) ?? initialValues.print;
  const initialPrintValue = initialValues.print === true || initialValues.print === "true" || initialValues.print === 1 || initialValues.print === "1";
  const isPrinted = printValue === true || printValue === "true" || printValue === 1 || printValue === "1";

  // Ensure session_id is properly stored instead of session name
  useEffect(() => {
    if (initialValues.session_id) {
      setValue(`${type}s.${index}.session_id`, initialValues.session_id);
    }
  }, [initialValues.session_id, setValue, index, type]);

  useEffect(() => {
    if (isEditing && initialPrintValue !== isPrinted) {
      setPrintChanged(true);
    } else {
      setPrintChanged(false);
    }
  }, [isPrinted, initialPrintValue, isEditing]);

  return (
    <div className="border rounded-2 p-3 mb-3 mx-md-5">
      <h5 className="fw-bold d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <span>{isTalk ? "Talk" : "Poster"} #{index + 1}</span>
        <button
          title={`Delete ${isTalk ? "Talk" : "Poster"} #${index + 1}`}
          type="button"
          className={classNames("btn btn-sm btn-danger", cssForm.deleteBtn)}
          onClick={remove}
        >
          <FiTrash2 />
        </button>
      </h5>

      {/* Title */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label fw-bold pb-0">Title</label>
        <div className="col-sm-10">
          <input
            className="form-control"
            defaultValue={initialValues.title || ""}
            placeholder="Enter title"
            {...register(`${type}s.${index}.title`, { required: "Title is required" })}
          />
          {errors?.[`${type}s`]?.[index]?.title && <p className="text-danger"><small>{errors[`${type}s`][index].title.message}</small></p>}
        </div>
      </div>

      {/* Authors */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label fw-bold pb-0">Authors</label>
        <div className="col-sm-10">
          <input
            className="form-control"
            defaultValue={initialValues.authors || ""}
            placeholder="List all authors separated with commas"
            {...register(`${type}s.${index}.authors`, { required: "Authors are required" })}
          />
          {errors?.[`${type}s`]?.[index]?.authors && <p className="text-danger"><small>{errors[`${type}s`][index].authors.message}</small></p>}
        </div>
      </div>

      {/* Abstract */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label fw-bold pb-0">Abstract</label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            defaultValue={initialValues.abstract || ""}
            placeholder="Enter abstract"
            {...register(`${type}s.${index}.abstract`, { required: "Abstract is required" })}
          ></textarea>
          {errors?.[`${type}s`]?.[index]?.abstract && <p className="text-danger"><small>{errors[`${type}s`][index].abstract.message}</small></p>}
        </div>
      </div>

      {/* Suitable IMC Session (Stores session ID) */}
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label fw-bold pb-0">IMC Session</label>
        <div className="col-sm-10">
          <select
            className={classNames("form-select", errors?.[`${type}s`]?.[index]?.session_id && "is-invalid", cssForm.mdAuto)}
            {...register(`${type}s.${index}.session_id`, { required: "Session is required" })}
            defaultValue={initialValues.session_id || ""}
            onChange={(e) => setValue(`${type}s.${index}.session_id`, e.target.value, { shouldValidate: true })}
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name} {/* Display session name but store session ID */}
              </option>
            ))}
          </select>
          {errors?.[`${type}s`]?.[index]?.session_id && <p className="text-danger"><small>{errors[`${type}s`][index].session_id.message}</small></p>}
        </div>
      </div>

      {/* Talk Duration (Only for Talks) */}
      {isTalk && (
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label fw-bold pb-0">Talk Duration</label>
          <div className="col-sm-10">
            <select
              className={classNames("form-select", errors?.[`${type}s`]?.[index]?.duration && "is-invalid", cssForm.mdAuto)}
              defaultValue={initialValues.duration || ""}
              {...register(`${type}s.${index}.duration`, { required: "Duration is required" })}
            >
              <option value="">Select duration</option>
              {talkDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
            {errors?.[`${type}s`]?.[index]?.duration && <p className="text-danger"><small>{errors[`${type}s`][index].duration.message}</small></p>}
          </div>
        </div>
      )}

      {/* Printing (Only for Posters) */}
      {!isTalk && !isEditing && (
        <>
          {isEditing && printChanged && (
            <div className="alert alert-warning mt-2 fw-bolder">
              Changing this option will update the total fees. The treasurer will be notified, and you may need to be reimbursed or pay more.
            </div>
          )}

          <div className="mb-3 row">
            <label className="fw-bold pb-0">
              Do you want to have your poster printed on-site for {conferenceData.poster_print.price}€?
            </label>
            {!isAdmin && <p className="form-text mt-0">{conferenceData.poster_print.desc}</p>}

            <div className="text-center btn-group d-block" role="group">
              {(() => {
                return (
                  <>
                    {/* Yes Button */}
                    <input
                      type="radio"
                      className="btn-check"
                      id={`printYes${index}`}
                      value="true"
                      {...register(`${type}s.${index}.print`, { required: "Please select an option" })}
                      onChange={() => setValue(`${type}s.${index}.print`, "true", { shouldValidate: true, shouldDirty: true })}
                      checked={isPrinted}
                    />
                    <label className="btn btn-outline-neutral fw-bolder" htmlFor={`printYes${index}`}>
                      Yes
                    </label>

                    {/* No Button */}
                    <input
                      type="radio"
                      className="btn-check"
                      id={`printNo${index}`}
                      value="false"
                      {...register(`${type}s.${index}.print`, { required: "Please select an option" })}
                      onChange={() => setValue(`${type}s.${index}.print`, "false", { shouldValidate: true, shouldDirty: true })}
                      checked={!isPrinted}
                    />
                    <label className="btn btn-outline-neutral fw-bolder" htmlFor={`printNo${index}`}>
                      No
                    </label>
                  </>
                );
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TalkPosterForm;
