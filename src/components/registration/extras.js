import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useState } from "react";
import StepDislay from "components/registration/stepDisplay"; 

const ExtrasForm = ({
  conferenceData,
  register,
  errors,
  isDebugMode = false,
  step,
  stepTotal,
  trigger,
  setValue,
  initialData
}) => {
  const [wantsTShirt, setWantsTShirt] = useState(null);

  const tShirtSizes = conferenceData.costs.tshirts.models.flatMap((model) =>
    conferenceData.costs.tshirts.sizes.map((size) => `${model.charAt(0).toUpperCase() + model.slice(1)} ${size}`)
  );

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        if (initialData[key]) {
          setValue(key, initialData[key]);
        }
      });
    }
  }, [initialData, setValue]);

  const fillTestData = () => {
    setValue("excursion", "yes");
    setValue("buyTShirt", "yes");
    setValue("tShirtSize", "Men L");
    setValue("proceedings", "pdf_printed");
    setWantsTShirt(true);
    trigger();
  };

  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">
       <StepDislay step={step} stepTotal={stepTotal} /> 
        Extras
      </h4>

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {isDebugMode && (
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        <div className="mb-4">
          <label className="fw-bold mb-2">Do you want to participate in the excursion (at no extra cost)?</label>
          <div className="d-flex flex-column gap-2">
            {["yes", "no"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`excursion-${option}`}
                  className={classNames("form-check-input", { "is-invalid": errors.excursion })}
                  value={option}
                  {...register("excursion", { required: "Please select an option" })}
                />
                <label className="form-check-label" htmlFor={`excursion-${option}`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {errors.excursion && <p className="text-danger"><small>{errors.excursion.message}</small></p>}
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-2">Do you want to buy the official IMC{conferenceData.year} T-Shirt for {conferenceData.costs.tshirts.price}€?</label>
          <div className="d-flex flex-column gap-2">
            {["yes", "no"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`tshirt-${option}`}
                  className={classNames("form-check-input", { "is-invalid": errors.buyTShirt })}
                  value={option}
                  {...register("buyTShirt", { required: "Please select an option" })}
                  onChange={(e) => setWantsTShirt(e.target.value === "yes")}
                />
                <label className="form-check-label" htmlFor={`tshirt-${option}`}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {errors.buyTShirt && <p className="text-danger"><small>{errors.buyTShirt.message}</small></p>}
        </div>

        {wantsTShirt && (
          <div className="mb-4">
            <label className="fw-bold mb-2">Select your T-Shirt size</label>
            <select
              className={classNames("form-select", { "is-invalid": errors.tShirtSize })}
              {...register("tShirtSize", { required: "Please select a T-Shirt size" })}
            >
              <option value="">Select size</option>
              {tShirtSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.tShirtSize && <p className="text-danger"><small>{errors.tShirtSize.message}</small></p>}
          </div>
        )}

        <div className="mb-3">
          <label className="fw-bold mb-2">Proceedings</label>
          <div className="d-flex flex-column gap-2">
            {["pdf", "pdf_printed"].map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`proceedings-${option}`}
                  className={classNames("form-check-input", { "is-invalid": errors.proceedings })}
                  value={option}
                  {...register("proceedings", { required: "Please select a proceedings option" })}
                />
                <label className="form-check-label" htmlFor={`proceedings-${option}`}>
                  {option === "pdf" ? "Only PDF (free)" : `PDF & Printed copy (${conferenceData.costs.printed_proceedings}€)`}
                </label>
              </div>
            ))}
          </div>
          {errors.proceedings && <p className="text-danger"><small>{errors.proceedings.message}</small></p>}
        </div>
      </div>
    </>
  );
};

export default ExtrasForm;
