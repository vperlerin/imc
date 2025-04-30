import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React from "react";
import StepDislay from "components/registration/stepDisplay";
import { formatFullDate } from "utils/date";

const Workshops = ({
  isAdmin = false,
  isOnline = false,
  isDebugMode = false,
  errors,
  step,
  stepTotal,
  trigger,
  setValue,
  watch,
  workshops,
}) => {
  // Watch selected workshop IDs
  const selectedWorkshops = watch("workshops") || [];

  // For online version, we don't display the workshops without price
  const filteredWorkshops = isOnline
    ? workshops.filter((workshop) => parseFloat(workshop.price_online) !== 0)
    : workshops;

  // Function to toggle selection
  const toggleWorkshop = (workshopId) => {
    const updatedWorkshops = selectedWorkshops.includes(workshopId)
      ? selectedWorkshops.filter((id) => id !== workshopId) // Remove if already selected
      : [...selectedWorkshops, workshopId]; // Add if not selected

    setValue("workshops", updatedWorkshops, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="position-relative">
      {isDebugMode && (
        <button
          type="button"
          className="position-absolute top-0 end-0 btn btn-secondary"
          onClick={() => {
            const allWorkshopIds = filteredWorkshops.map((workshop) => workshop.id);
            setValue("workshops", allWorkshopIds, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
            trigger();
          }}
        >
          Fill Test Data
        </button>
      )}

      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Workshops
        </h4>
      )}

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {filteredWorkshops.map((workshop) => {
          const workshopId = workshop.id.toString();
          const isSelected = selectedWorkshops.includes(workshopId);

          return (
            <div className="mb-5 row" key={workshopId}>
              <label className={classNames("text-md-center", cssForm.balance)}>
                <b>The {workshop.title}</b> will be held on <b>{formatFullDate(workshop.date)}</b> from <b>{workshop.period}</b>.
                <br /> Would you like to attend {isOnline && "online"} for an extra price of {parseFloat(
                  isOnline ? workshop.price_online : workshop.price
                ).toFixed(2)}€?
              </label>

              <div className="text-center d-block mt-3">
                {/* Checkbox for selecting multiple workshops */}
                <input
                  type="checkbox"
                  className="btn-check"
                  id={`workshop-${workshopId}`}
                  checked={isSelected}
                  onChange={() => toggleWorkshop(workshopId)}
                />
                <label className="btn btn-outline-primary fw-bolder" htmlFor={`workshop-${workshopId}`}>
                  {isSelected ? "YES!" : "No :("}
                </label>
              </div>

              {errors.workshops?.some((id) => id === workshopId) && (
                <p className="text-danger fw-bold text-center">
                  <small>{errors.workshops.message}</small>
                </p>
              )}
            </div>
          );
        })}

        {!isAdmin && (
          <p className="text-center">
            Read more about the <a href="/program/workshops/radio" target="_blank">Radio Workshop</a>
            {!isOnline && (
              <>
                {" "}and the <a href="/program/workshops/spectro" target="_blank">Spectroscopy Workshop</a>
              </>
            )}
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Workshops;
