import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import StepDislay from "components/registration/stepDisplay";
import { formatFullDate } from "utils/date";

const getDateRange = (startDate, endDate) => {
  return Array.from(
    {
      length:
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1,
    },
    (_, i) => {
      const rawDate = new Date(startDate);
      rawDate.setDate(rawDate.getDate() + i);
      return {
        value: rawDate.toISOString().split("T")[0], // YYYY-MM-DD for MySQL
        label: formatFullDate(rawDate.toISOString().split("T")[0], false, false), // Human-readable
      };
    }
  );
};

// Generate hour and minute options (both zero-padded strings)
const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const minutes = Array.from({ length: 6 }, (_, i) =>
  (i * 10).toString().padStart(2, "0")
);

const ArrivalForm = ({
  isAdmin,
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
  const availableDates = getDateRange(
    conferenceData.dates.start,
    conferenceData.dates.end
  );

  /**
   * Optional: Used for quick test filling.
   */
  const fillTestData = () => {
    setValue("arrival_date", availableDates[0].value);
    setValue("arrival_hour", "14");
    setValue("arrival_minute", "30");
    setValue("departure_date", availableDates[availableDates.length - 1].value);
    setValue("departure_hour", "12");
    setValue("departure_minute", "00");
    setValue("travelling", "train");
    setValue("travelling_details", "I will be alone in my train.");
    trigger(); // Validate form
  };

  /**
   * Load initial data if available, ensuring hours and minutes are zero-padded
   * so they match the select dropdown options (e.g. "0" -> "00").
   */
  useEffect(() => {
    if (initialData) {
      for (const [key, val] of Object.entries(initialData)) {
        if (val != null) {
          if (
            key === "arrival_hour" ||
            key === "departure_hour" ||
            key === "arrival_minute" ||
            key === "departure_minute"
          ) {
            setValue(key, val.toString().padStart(2, "0"));
          } else {
            setValue(key, val);
          }
        }
      }
    }
  }, [initialData, setValue]);

  return (
    <>
      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Travel Details
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

        {!isAdmin && (
          <p className="fw-bolder">
            If you plan to arrive before {availableDates[0].label}, you must
            arrange your own accommodation.
          </p>
        )}

        <div className={cssForm.smallW}>
          {/* Arrival Date & Time */}
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label fw-bold">Arrival</label>
            <div className="col-sm-9 d-flex align-items-center gap-1">
              <select
                className={classNames(
                  "form-select me-2",
                  errors.arrival_date && "is-invalid"
                )}
                {...register("arrival_date", {
                  required: "Arrival date is required",
                })}
                onBlur={() => trigger("arrival_date")}
              >
                <option value="">Select Arrival Date</option>
                {availableDates.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                className={classNames(
                  "form-select w-auto",
                  errors.arrival_hour && "is-invalid"
                )}
                {...register("arrival_hour", {
                  required: "Hour is required",
                })}
                onBlur={() => trigger("arrival_hour")}
              >
                <option value="">Hour</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              :
              <select
                className={classNames(
                  "form-select w-auto",
                  errors.arrival_minute && "is-invalid"
                )}
                {...register("arrival_minute", {
                  required: "Minute is required",
                })}
                onBlur={() => trigger("arrival_minute")}
              >
                <option value="">Min</option>
                {minutes.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </div>
            {errors.arrival_date && (
              <p className="text-danger mb-0">
                <small>{errors.arrival_date.message}</small>
              </p>
            )}
          </div>

          {/* Departure Date & Time */}
          <div className="mb-3 row align-items-center">
            <label className="col-sm-3 col-form-label fw-bold">Departure</label>
            <div className="col-sm-9 d-flex align-items-center gap-1">
              <select
                className={classNames(
                  "form-select me-2",
                  errors.departure_date && "is-invalid"
                )}
                {...register("departure_date", {
                  required: "Departure date is required",
                })}
                onBlur={() => trigger("departure_date")}
              >
                <option value="">Select Departure Date</option>
                {availableDates.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                className={classNames(
                  "form-select w-auto",
                  errors.departure_hour && "is-invalid"
                )}
                {...register("departure_hour", {
                  required: "Hour is required",
                })}
                onBlur={() => trigger("departure_hour")}
              >
                <option value="">Hour</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              :
              <select
                className={classNames(
                  "form-select w-auto",
                  errors.departure_minute && "is-invalid"
                )}
                {...register("departure_minute", {
                  required: "Minute is required",
                })}
                onBlur={() => trigger("departure_minute")}
              >
                <option value="">Min</option>
                {minutes.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </div>
            {errors.departure_date && (
              <p className="text-danger mb-0">
                <small>{errors.departure_date.message}</small>
              </p>
            )}
          </div>

          {/* Travelling by */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">Travelling by</label>
            <div className="col-sm-9">
              <select
                className={classNames(
                  "form-select",
                  errors.travelling && "is-invalid",
                  cssForm.mdAuto
                )}
                {...register("travelling", {
                  required: "Mode of Transportation is required",
                })}
                onBlur={() => trigger("travelling")}
              >
                <option value="">Select a Mode of Transportation</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="plane">Plane</option>
                <option value="train">Train</option>
                <option value="local">Local Resident</option>
                <option value="undecided">Not yet decided</option>
              </select>
              {errors.travelling && (
                <p className="text-danger mb-0">
                  <small>{errors.travelling.message}</small>
                </p>
              )}
            </div>
          </div>

          {/* Travelling details (textarea) */}
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
              Travel Details
            </label>
            <div className="col-sm-9">
              <textarea
                className="form-control"
                rows="3"
                {...register("travelling_details")}
                onBlur={() => trigger("travelling_details")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArrivalForm;
