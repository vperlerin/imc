import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useState } from "react";
import StepDislay from "components/registration/stepDisplay"; 

const ExtrasForm = ({
  isAdmin,
  conferenceData,
  register,
  errors,
  isDebugMode = false,
  step,
  getValues,
  stepTotal,
  trigger,
  setValue,
  watch, 
}) => {  
  // Normalize boolean values to always be "true" or "false"
  const normalizeBoolean = (value) => ((value === "true" || value === true) ? "true" : "false");

  console.log("GET VALUES ", getValues());
  console.log("watch(buy_tshirt) ? ", watch("buy_tshirt"));
  console.log("watch(excursion) ? ", watch("excursion"));

  // Ensure boolean values are correctly retrieved
  const buyTShirt = normalizeBoolean(watch("buy_tshirt") || "false");
  const tshirtSize = watch("tshirt_size");
  const excursion = normalizeBoolean(watch("excursion") || "false");
 
  // State for UI updates
  const [wantsTShirt, setWantsTShirt] = useState(buyTShirt === "true");

  // Available T-Shirt sizes
  const tshirt_sizes = conferenceData.costs.tshirts.models.flatMap((model) =>
    conferenceData.costs.tshirts.sizes.map((size) => `${model.charAt(0).toUpperCase() + model.slice(1)} ${size}`)
  );

  // Sync T-Shirt selection with state
  useEffect(() => {
    setWantsTShirt(buyTShirt === "true");

    if (buyTShirt !== "true") {
      setValue("tshirt_size", "");
    }
  }, [buyTShirt, setValue]);

  // Ensure `tshirt_size` validation is triggered when `buy_tshirt` changes
  useEffect(() => {
    if (buyTShirt === "true") {
      trigger("tshirt_size");
    }
  }, [buyTShirt, trigger]);

  const handleTShirtSelection = (value) => {
    setValue("buy_tshirt", normalizeBoolean(value), { shouldDirty: true, shouldValidate: true });
    trigger("tshirt_size"); // Trigger validation when the value changes
  };

  const handleTShirtSizeSelection = (value) => {
    setValue("tshirt_size", value, { shouldDirty: true, shouldValidate: true });
  };

  const fillTestData = () => {
    setValue("excursion", "true");
    setValue("buy_tshirt", "true");
    setValue("tshirt_size", "Men L");
    trigger();
  };

  return (
    <>
      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Extras
        </h4>
      )}

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {isDebugMode && (
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        {/* Excursion */}
        <div className="mb-4">
          <label className="fw-bold mb-2">
            Do you want to participate in the excursion (at no extra cost)?
          </label>
          <div className="d-flex flex-column gap-2">
            {["true", "false"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`excursion-${option}`}
                  className={classNames("form-check-input", { "is-invalid": errors.excursion })}
                  value={option}
                  {...register("excursion", { required: "Please select an option" })}
                  checked={excursion === option}
                  onChange={(e) => setValue("excursion", normalizeBoolean(e.target.value), { shouldDirty: true, shouldValidate: true })}
                />
                <label className="form-check-label" htmlFor={`excursion-${option}`}>
                  {option === "true" ? "Yes" : "No"}
                </label>
              </div>
            ))}
          </div>
          {errors.excursion && <p className="text-danger"><small>{errors.excursion.message}</small></p>}
        </div>

        {/* Buy T-Shirt */}
        <div className="mb-3">
          <label className="fw-bold mb-2">
            Do you want to buy the official IMC{conferenceData.year} T-Shirt for {conferenceData.costs.tshirts.price}€?
          </label>
          <div className="d-flex flex-column gap-2">
            {["true", "false"].map((option) => (
              <div key={option} className="form-check">
                <input
                  type="radio"
                  id={`tshirt-${option}`}
                  className={classNames("form-check-input", { "is-invalid": errors.buy_tshirt })}
                  value={option}
                  {...register("buy_tshirt", { required: "Please select an option" })}
                  checked={buyTShirt === option}
                  onChange={(e) => handleTShirtSelection(e.target.value)}
                />
                <label className="form-check-label" htmlFor={`tshirt-${option}`}>
                  {option === "true" ? "Yes" : "No"}
                </label>
              </div>
            ))}
          </div>
          {errors.buy_tshirt && <p className="text-danger"><small>{errors.buy_tshirt.message}</small></p>}
        </div>

        {/* T-Shirt Size Dropdown */}
        {wantsTShirt && (
          <div className="mb-4">
            <label className="fw-bold mb-2">Select your T-Shirt size</label>
            <select
              className={classNames("form-select", { "is-invalid": errors.tshirt_size })}
              {...register("tshirt_size", {
                required: buyTShirt === "true" ? "Please select a T-Shirt size" : false,
              })}
              onChange={(e) => handleTShirtSizeSelection(e.target.value)}
              value={tshirtSize || ""}
            >
              <option value="">Select size</option>
              {tshirt_sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            {errors.tshirt_size && <p className="text-danger"><small>{errors.tshirt_size.message}</small></p>}
          </div>
        )}
      </div>
    </>
  );
};

export default ExtrasForm;
