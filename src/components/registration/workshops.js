import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useMemo } from "react";
import StepDislay from "components/registration/stepDisplay";
import { formatFullDate } from "utils/date";

const Workshops = ({
  isAdmin = false,
  isOnline = false,
  isDebugMode = false,
  conferenceData: cd,
  errors,
  step,
  stepTotal,
  trigger,
  setValue,
  watch,
  workshops,
}) => {
  const selectedWorkshops = watch("workshops") || [];

  const filteredWorkshops = isOnline
    ? workshops.filter((workshop) => parseFloat(workshop.price_online) !== 0)
    : workshops;

  const workshopLinks = useMemo(() => {
    const list = Array.isArray(cd?.workshops) ? cd.workshops : [];

    const withSlug = list.filter((w) => !!w?.title && !!w?.slug);
    const filteredByMode = withSlug.filter((w) => {
      if (isOnline) {
        const v = w?.cost_online ?? w?.price_online ?? 0;
        return parseFloat(v) !== 0;
      }
      const v = w?.cost ?? w?.price ?? 0;
      return parseFloat(v) !== 0;
    });

    return filteredByMode.map((w) => ({
      title: w.title,
      href: `/program/workshops/${w.slug}`,
    }));
  }, [isOnline]);

  const toggleWorkshop = (workshopId, shouldSelect) => {
    const updatedWorkshops = shouldSelect
      ? selectedWorkshops.includes(workshopId)
        ? selectedWorkshops
        : [...selectedWorkshops, workshopId]
      : selectedWorkshops.filter((id) => id !== workshopId);

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

          const yesId = `workshop-${workshopId}-yes`;
          const noId = `workshop-${workshopId}-no`;
          const groupName = `workshop-choice-${workshopId}`;

          return (
            <div className="mb-5 row" key={workshopId}>
              <label className={classNames("text-md-center", cssForm.balance)}>
                <b>The {workshop.title}</b> will be held on <b>{formatFullDate(workshop.date)}</b> from{" "}
                <b>{workshop.period}</b>.
                {(workshop.title !== "Spectroscopy Workshop" || isAdmin) && (
                  <>
                    <br /> Would you like to attend {isOnline && "online"} for an extra price of{" "}
                    {parseFloat(isOnline ? workshop.price_online : workshop.price).toFixed(2)}€?
                  </>
                )}
              </label>

              <div
                className="text-center btn-group d-block mt-3"
                role="group"
                aria-label={`Workshop ${workshop.title}`}
              >
                {/* YES */}
                <input
                  type="radio"
                  className="btn-check"
                  id={yesId}
                  name={groupName}
                  checked={isSelected}
                  onChange={() => toggleWorkshop(workshopId, true)}
                />
                <label
                  className={classNames("btn fw-bolder", {
                    "btn-primary": isSelected,
                    "btn-outline-primary": !isSelected,
                  })}
                  htmlFor={yesId}
                >
                  Yes
                </label>

                {/* NO */}
                <input
                  type="radio"
                  className="btn-check"
                  id={noId}
                  name={groupName}
                  checked={!isSelected}
                  onChange={() => toggleWorkshop(workshopId, false)}
                />
                <label
                  className={classNames("btn fw-bolder", {
                    "btn-primary": !isSelected,
                    "btn-outline-primary": isSelected,
                  })}
                  htmlFor={noId}
                >
                  No
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

        {!isAdmin && workshopLinks.length > 0 && (
          <p className="text-center">
            Read more about{" "}
            {workshopLinks.map((w, idx) => (
              <React.Fragment key={w.href}>
                {idx > 0 && (idx === workshopLinks.length - 1 ? " and " : ", ")}
                <a href={w.href} target="_blank" rel="noreferrer">
                  {w.title}
                </a>
              </React.Fragment>
            ))}
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Workshops;
