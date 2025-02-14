import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import StepDislay from "components/registration/stepDisplay";
import { conferenceData as cd } from "data/conference-data";

const AccomodationForm = ({
  register,
  errors,
  isDebugMode = false,
  isEarlyBird,
  isOnline = false,
  step,
  stepTotal,
  trigger,
  setValue,
  initialData
}) => {

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
    setValue("registrationType", cd.costs.rooms[1].type);
    setValue("paymentMethod", "Paypal");
    trigger();
  };

  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">
        <StepDislay step={step} stepTotal={stepTotal} />
        {!isOnline && <>Accomodation &</>} Payment Method
      </h4>

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>
        {isDebugMode && (
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        {/* Registration Type */}
        {!isOnline && (
          <div className="mb-4 mt-2">
            <label className="fw-bold mb-2">Registration Type</label>
            <div className="d-flex flex-column gap-2">
              {cd.costs.rooms.map((room, index) => (
                <div key={index} className="form-check">
                  <input
                    type="radio"
                    id={`room-${index}`}
                    className={classNames("form-check-input", { "is-invalid": errors.registrationType })}
                    value={room.type}
                    {...register("registrationType", { required: "Please select a registration type" })}
                  />
                  <label className="form-check-label" htmlFor={`room-${index}`}>
                    <strong>{isEarlyBird ? room.price : (room.price + cd.costs.after_early_birds)}€</strong> - {room.description}
                    <small className="text-muted d-block">
                      {room.number
                        ? `Standard accommodation in a ${room.type} room for 3 nights (only) with full board + participation in the conference, conference materials, coffee breaks, and excursion (price per person).`
                        : `All meals except breakfasts + participation in the conference, conference materials, coffee breaks, and excursion.`}
                    </small>
                  </label>
                </div>
              ))}
            </div>
            {errors.registrationType && <p className="text-danger"><small>{errors.registrationType.message}</small></p>}
          </div>
        )}

        {isOnline && (
          <p>
            The price of the online participation is <b className="fw-bolder">{cd.costs.online}€</b>.
          </p>
        )}


        {/* Payment Method */}
        <div className="mb-3">
          <label className="fw-bold mb-2">Method of Payment</label>
          <div className="d-flex flex-column gap-2">
            {[{
              type: "Paypal",
              note: "Additional fees apply."
            },
            {
              type: "Bank Transfer",
              note: "Usually free from EU and EEA countries; costs are always at participants' expense."
            },
            {
              type: "Other",
              note: "Requires prior approval from the IMO Treasurer and statement of the agreed arrangement"
            },].map((method, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`payment-${method.type}`}
                  className={classNames("form-check-input", { "is-invalid": errors.paymentMethod })}
                  value={method.type}
                  {...register("paymentMethod", { required: "Please select a payment method" })}
                />
                <label className="form-check-label" htmlFor={`payment-${method.type}`}>
                  {method.type}
                </label>
                <div className="form-text">
                  {method.note}
                </div>
              </div>
            ))}
          </div>
          {errors.paymentMethod && <p className="text-danger"><small>{errors.paymentMethod.message}</small></p>}
        </div>
      </div>
    </>
  );
};

export default AccomodationForm;
