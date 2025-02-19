import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import StepDislay from "components/registration/stepDisplay";

const Workshops = ({
  conferenceData,
  initialData,
  isDebugMode = false,
  isOnline = false,
  register,
  errors,
  step,
  stepTotal,
  trigger,
  setValue,
  watch
}) => {
  useEffect(() => {
    if (initialData?.workshops) {
      Object.entries(initialData.workshops).forEach(([title, value]) => {
        setValue(title, value ? "true" : "false");
      });
    }
  }, [initialData, setValue]);

  const handleWorkshopChange = (workshopTitle, value) => {
    setValue(workshopTitle, value);
    trigger(workshopTitle);
  };

  const testData = !isOnline ? {
    "Spectroscopy Workshop": "true",
    "Radio workshop": "false",
  } : {
    "Radio workshop": "true",
  };

  const fillTestData = () => {
    Object.entries(testData).forEach(([key, value]) => setValue(key, value));
    trigger();
  };

  return (
    <div className="position-relative">
      {isDebugMode && (
        <button
          type="button"
          className="position-absolute top-0 end-0 btn btn-secondary"
          onClick={fillTestData}
        >
          Fill Test Data
        </button>
      )}
      <h4 className="mb-3 border-bottom pb-2">
        <StepDislay step={step} stepTotal={stepTotal} />
        Workshops
      </h4>
      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {conferenceData.workshops
          .filter(workshop => !isOnline || workshop.cost_online)
          .map((workshop) => {
            const workshopTitle = workshop.title;
            const selectedWorkshop = watch(workshopTitle);

            return (
              <div className="mb-5 row" key={workshopTitle}>
                <label className={classNames("text-md-center", cssForm.balance)}>
                  Do you wish to attend the <b>{workshop.title}</b> organized on {new Date(workshop.date).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'long' })} from {workshop.period}
                  {' '}for an extra price of {!isOnline ? workshop.cost.toFixed(2) : workshop.cost_online.toFixed(2)}€
                  {!isOnline && <>{' '}({workshop.description})</>}?
                </label>
                <div className="text-center btn-group d-block mt-3" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    id={`${workshopTitle}Yes`}
                    value="true"
                    {...register(workshopTitle, { required: "Please select an option" })}
                    onChange={() => handleWorkshopChange(workshopTitle, "true")}
                    checked={selectedWorkshop === "true"}
                  />
                  <label className="btn btn-outline-primary" htmlFor={`${workshopTitle}Yes`}>
                    Yes
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    id={`${workshopTitle}No`}
                    value="false"
                    {...register(workshopTitle, { required: "Please select an option" })}
                    onChange={() => handleWorkshopChange(workshopTitle, "false")}
                    checked={selectedWorkshop === "false"}
                  />
                  <label className="btn btn-outline-primary" htmlFor={`${workshopTitle}No`}>
                    No
                  </label>
                </div>
                {errors[workshopTitle] && (
                  <p className="text-danger fw-bold text-center">
                    <small>{errors[workshopTitle].message}</small>
                  </p>
                )}
              </div>
            );
          })}

      </div>
    </div>
  );
};

export default Workshops;
