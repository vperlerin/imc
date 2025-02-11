import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useState } from "react";
import { conferenceData as cd } from "data/conference-data";

const ExtrasForm = ({
  register,
  errors,
  isDebugMode = false,
  step = null,
  trigger,
  setValue,
  initialData }) => {
  const [wantsTShirt, setWantsTShirt] = useState(null);

  // Generate T-Shirt Size Options
  const tShirtSizes = cd.costs.tshirts.models.flatMap((model) =>
    cd.costs.tshirts.sizes.map((size) => `${model.charAt(0).toUpperCase() + model.slice(1)} ${size}`)
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
        {step && <><span >{step} </span>{' '}-{' '}</>}
        Extras
      </h4>

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>

        {isDebugMode && (
          <button type="button" className="position-fixed top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        {/* Excursion Participation */}
        <div className="mb-3">
          <label className="fw-bold">Do you want to participate in the excursion (at no extra cost)?</label>
          <div className="d-flex flex-column gap-2">
            {["yes", "no"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`excursion-${option}`}
                  className="form-check-input"
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

        {/* T-Shirt Purchase */}
        <div className="mb-3">
          <label className="fw-bold">Do you want to buy the official IMC2024 T-Shirt for 10€?</label>
          <div className="d-flex flex-column gap-2">
            {["yes", "no"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`tshirt-${option}`}
                  className="form-check-input"
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
          <div className="mb-3">
            <label className="fw-bold">Select your T-Shirt size</label>
            <select
              className={classNames("form-select", errors.tShirtSize && "is-invalid")}
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

        {/* Proceedings Option */}
        <div className="mb-3">
          <label className="fw-bold">Proceedings</label>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                type="radio"
                id="proceedings-pdf"
                className="form-check-input"
                value="pdf"
                {...register("proceedings", { required: "Please select a proceedings option" })}
              />
              <label className="form-check-label" htmlFor="proceedings-pdf">
                Only PDF (free)
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="proceedings-pdf-printed"
                className="form-check-input"
                value="pdf_printed"
                {...register("proceedings", { required: "Please select a proceedings option" })}
              />
              <label className="form-check-label" htmlFor="proceedings-pdf-printed">
                PDF & Printed copy ({cd.costs.printed_proceedings}€)
              </label>
            </div>
          </div>
          {errors.proceedings && <p className="text-danger"><small>{errors.proceedings.message}</small></p>}
        </div>

      </div>
    </>
  );
};

export default ExtrasForm;
