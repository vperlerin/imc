import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import StepDislay from "components/registration/stepDisplay";

const ExtrasForm = ({
  isAdmin,
  conferenceData,
  register,
  errors,
  isDebugMode = false,
  step,
  stepTotal,
  trigger,
  setValue,
  watch,
}) => {
  // Normalize boolean values to always be "true" or "false"
  const normalizeBoolean = (value) =>
    value === true || value === "true" || value === 1 ? "true" : "false";

  // Ensure boolean values are correctly retrieved from form state
  const buyTShirt = normalizeBoolean(watch("buy_tshirt") ?? "false");
  const tshirtSize = watch("tshirt_size") ?? "";
  const excursion = normalizeBoolean(watch("excursion") ?? "true");

  // Food restrictions (array)
  const foodRestrictions = watch("food_restrictions") ?? [];
  const foodOtherText = watch("food_restrictions_other") ?? "";
  const hasFoodOther = Array.isArray(foodRestrictions) && foodRestrictions.includes("other");

  // State for UI updates
  const [wantsTShirt, setWantsTShirt] = useState(buyTShirt === "true");

  // Available T-Shirt sizes
  const tshirt_sizes = conferenceData.costs.tshirts.models.flatMap((model) =>
    conferenceData.costs.tshirts.sizes.map(
      (size) => `${model.charAt(0).toUpperCase() + model.slice(1)} ${size}`
    )
  );

  // WARNING! THE DB ALSO NEED TO BE UPDATED IF THESE OPTIONS CHANGE!
  const foodOptions = useMemo(() => {
    return [
      { key: "vegetarian", label: "Vegetarian" },
      { key: "vegan", label: "Vegan" },
      { key: "coeliac", label: "Coeliac (gluten-free)" },
      { key: "lactose_intolerant", label: "Lactose intolerant" },
      { key: "other", label: "Other" },
    ];
  }, []);

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

  // If "other" gets unchecked, clear the text
  useEffect(() => {
    if (!hasFoodOther && foodOtherText) {
      setValue("food_restrictions_other", "");
      trigger("food_restrictions_other");
    }
  }, [hasFoodOther, foodOtherText, setValue, trigger]);

  const handleTShirtSelection = (value) => {
    setValue("buy_tshirt", normalizeBoolean(value), {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger("tshirt_size"); // Trigger validation when the value changes
  };

  const handleTShirtSizeSelection = (value) => {
    setValue("tshirt_size", value, { shouldDirty: true, shouldValidate: true });
  };

  const handleFoodToggle = (key, checked) => {
    const current = Array.isArray(foodRestrictions) ? foodRestrictions : [];
    const next = checked ? Array.from(new Set([...current, key])) : current.filter((v) => v !== key);

    setValue("food_restrictions", next, { shouldDirty: true, shouldValidate: true });

    // If toggling "other", ensure validation runs on the text field
    if (key === "other") {
      trigger("food_restrictions_other");
      if (!checked) {
        setValue("food_restrictions_other", "");
      }
    }
  };

  const fillTestData = () => {
    setValue("excursion", "true");
    setValue("buy_tshirt", "true");
    setValue("tshirt_size", "Men L");

    setValue("food_restrictions", ["vegetarian", "lactose_intolerant", "other"]);
    setValue("food_restrictions_other", "No peanuts");

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
          <button
            type="button"
            className="position-absolute top-0 end-0 btn btn-secondary"
            onClick={fillTestData}
          >
            Fill Test Data
          </button>
        )}

        {/* Food restrictions */}
        <div className="mb-4">
          <label className="fw-bold mb-2">Food restrictions</label>

          <div className="d-flex flex-column gap-2">
            {foodOptions.map((opt) => {
              const checked =
                Array.isArray(foodRestrictions) && foodRestrictions.includes(opt.key);

              return (
                <div key={opt.key} className="form-check">
                  <input
                    type="checkbox"
                    id={`food-${opt.key}`}
                    className={classNames("form-check-input", {
                      "is-invalid": errors.food_restrictions || errors.food_restrictions_other,
                    })}
                    checked={checked}
                    onChange={(e) => handleFoodToggle(opt.key, e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={`food-${opt.key}`}>
                    {opt.label}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Hidden register so RHF knows about the array field */}
          <input type="hidden" {...register("food_restrictions")} />

          {/* Other text */}
          {hasFoodOther && (
            <div className="mt-3">
              <label className="fw-bold mb-2">Please specify</label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.food_restrictions_other,
                })}
                placeholder="e.g. nut allergy, halal, no seafood…"
                {...register("food_restrictions_other", {
                  validate: (v) => {
                    if (!hasFoodOther) return true;
                    return (v ?? "").trim().length > 0 || "Please specify your restriction";
                  },
                })}
                onChange={(e) =>
                  setValue("food_restrictions_other", e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                value={foodOtherText}
              />
              {errors.food_restrictions_other && (
                <p className="text-danger">
                  <small>{errors.food_restrictions_other.message}</small>
                </p>
              )}
            </div>
          )}
        </div>

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
                  onChange={(e) =>
                    setValue("excursion", normalizeBoolean(e.target.value), {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
                <label className="form-check-label" htmlFor={`excursion-${option}`}>
                  {option === "true" ? "Yes" : "No"}
                </label>
              </div>
            ))}
          </div>
          {errors.excursion && (
            <p className="text-danger">
              <small>{errors.excursion.message}</small>
            </p>
          )}
        </div>

        {/* Buy T-Shirt */}
        <div className="mb-3">
          <label className="fw-bold mb-2">
            Do you want to buy the official IMC{conferenceData.year} T-Shirt for{" "}
            {conferenceData.costs.tshirts.price}€?
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
          {errors.buy_tshirt && (
            <p className="text-danger">
              <small>{errors.buy_tshirt.message}</small>
            </p>
          )}
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
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.tshirt_size && (
              <p className="text-danger">
                <small>{errors.tshirt_size.message}</small>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ExtrasForm;
