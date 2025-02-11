import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import { conferenceData as cd } from "data/conference-data";
import { useWatch } from "react-hook-form";

const Workshops = ({
  control,
  initialData,
  isDebugMode = false,
  register,
  errors,
  step = null,
  trigger,
  setValue,
  watch
}) => {
  useEffect(() => {
    if (initialData?.workshops) {
      Object.entries(initialData.workshops).forEach(([key, value]) => {
        setValue(key, value ? "true" : "false"); // Convert boolean to string for radio
      });
    }
  }, [initialData, setValue]);

  const handleWorkshopChange = (workshopKey, value) => {
    setValue(workshopKey, value);
    trigger(workshopKey); // Validate the field when changed
  };

  const testData = {
    workshop_0: "true",
    workshop_1: "false", // Store as string since radio buttons expect strings
  };

  const fillTestData = () => {
    Object.entries(testData).forEach(([key, value]) => setValue(key, value));
    trigger(); // Trigger validation after setting values
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
        {step && (
          <>
            <span>{step}</span> {' - '} 
          </>
        )}
        Workshops
      </h4>
      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {cd.workshops.map((workshop, index) => {
          const workshopKey = `workshop_${index}`;
          const selectedWorkshop = watch(workshopKey); // Watch form state

          return (
            <div className="mb-5 row" key={workshopKey}>
              <label className={classNames("text-md-center", cssForm.balance)}>
                Do you wish to attend the <b>{workshop.title}</b> organized on {new Date(workshop.date).toLocaleDateString("en-GB", { weekday: 'long', day: 'numeric', month: 'long' })} from {workshop.period} for an extra price of {workshop.cost}€ (including conference materials and coffee break)?
              </label>
              <div className="text-center btn-group d-block mt-3" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  id={`${workshopKey}Yes`}
                  value="true"
                  {...register(workshopKey, { required: "Please select an option" })}
                  onChange={() => handleWorkshopChange(workshopKey, "true")}
                  checked={selectedWorkshop === "true"}
                />
                <label className="btn btn-outline-primary" htmlFor={`${workshopKey}Yes`}>
                  Yes
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  id={`${workshopKey}No`}
                  value="false"
                  {...register(workshopKey, { required: "Please select an option" })}
                  onChange={() => handleWorkshopChange(workshopKey, "false")}
                  checked={selectedWorkshop === "false"}
                />
                <label className="btn btn-outline-primary" htmlFor={`${workshopKey}No`}>
                  No
                </label>
              </div>
              {errors[workshopKey] && (
                <p className="text-danger fw-bold text-center">
                  <small>{errors[workshopKey].message}</small>
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
