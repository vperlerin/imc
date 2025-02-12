import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import StepDislay from "components/registration/stepDisplay";  
import { conferenceData as cd } from "data/conference-data";
import { formatFullDate } from 'utils/date';

const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(formatFullDate(currentDate.toISOString().split("T")[0], false, false));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const availableDates = getDateRange(cd.dates.start, cd.dates.end);
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = Array.from({ length: 6 }, (_, i) => (i * 10).toString().padStart(2, "0"));

const ArrivalForm = ({
  register,
  errors,
  isDebugMode = false,
  step,
  stepTotal,
  trigger,
  setValue,
  initialData
}) => {

  const fillTestData = () => {
    setValue("arrivalDate", availableDates[0]);
    setValue("arrivalHour", "14");
    setValue("arrivalMinute", "30");
    setValue("departureDate", availableDates[availableDates.length - 1]);
    setValue("departureHour", "12");
    setValue("departureMinute", "00");
    setValue("travelling", "train");
    setValue("travelling_details", "I will be alone in my train.")
    trigger(); // Validate form
  };

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        if (initialData[key]) {
          setValue(key, initialData[key]);
        }
      });
    }
  }, [initialData, setValue]);

  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">
       <StepDislay step={step} stepTotal={stepTotal} /> 
        Personal Details
      </h4>
      <div className={classNames(cssForm.smallW, 'mx-auto position-relative')}>
        {isDebugMode && (
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        <div className={cssForm.smallW}>
          {/* Arrival Date & Time */}
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Arrival</label>
            <div className="col-sm-3">
              <select
                className={classNames("form-select", errors.arrivalDate && "is-invalid")}
                {...register("arrivalDate", { required: "Arrival date is required" })}
                onBlur={() => trigger("arrivalDate")}
              >
                <option value="">Select Arrival Date</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              {errors.arrivalDate && <p className="text-danger mb-0"><small>{errors.arrivalDate.message}</small></p>}
            </div>

            <div className="col-sm-2">
              <select
                className={classNames("form-select", errors.arrivalHour && "is-invalid")}
                {...register("arrivalHour", { required: "Hour is required" })}
                onBlur={() => trigger("arrivalHour")}
              >
                <option value="">Hour</option>
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
            </div>

            <div className="col-sm-2">
              <select
                className={classNames("form-select", errors.arrivalMinute && "is-invalid")}
                {...register("arrivalMinute", { required: "Minute is required" })}
                onBlur={() => trigger("arrivalMinute")}
              >
                <option value="">Min</option>
                {minutes.map(min => (
                  <option key={min} value={min}>{min}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Departure Date & Time */}
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Departure</label>
            <div className="col-sm-3">
              <select
                className={classNames("form-select", errors.departureDate && "is-invalid")}
                {...register("departureDate", { required: "Departure date is required" })}
                onBlur={() => trigger("departureDate")}
              >
                <option value="">Select Departure Date</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
              {errors.departureDate && <p className="text-danger mb-0"><small>{errors.departureDate.message}</small></p>}
            </div>

            <div className="col-sm-2">
              <select
                className={classNames("form-select", errors.departureHour && "is-invalid")}
                {...register("departureHour", { required: "Hour is required" })}
                onBlur={() => trigger("departureHour")}
              >
                <option value="">Hour</option>
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
            </div>

            <div className="col-sm-2">
              <select
                className={classNames("form-select", errors.departureMinute && "is-invalid")}
                {...register("departureMinute", { required: "Minute is required" })}
                onBlur={() => trigger("departureMinute")}
              >
                <option value="">Min</option>
                {minutes.map(min => (
                  <option key={min} value={min}>{min}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Travelling by */}
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Travelling by </label>
            <div className="col-sm-10">
              <select
                className={classNames('form-select', errors.travelling && "is-invalid", cssForm.mdAuto)}
                {...register("travelling")}
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
              {errors.travelling && <p className="text-danger mb-0"><small>{errors.travelling.message}</small></p>}
            </div>
          </div>


          {/* Travelling details */}
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label fw-bold">Details</label>
            <div className="col-sm-10">
              <textarea className={classNames('form-control', errors.travelling_details && "is-invalid")} placeholder="Travelling Details..."
                {...register("travelling_details")} onBlur={() => trigger("travelling_details")} />
              <div className="form-text">
                If you travel in group, indicate with whom you share your journey. If you travel by bus, plane or train indicate which bus, plane (date, flight number, airport) or train. Indicate this for both arrival and departure.
              </div>
              {errors.travelling_details && <p className="text-danger mb-0"><small>{errors.travelling_details.message}</small></p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArrivalForm;
