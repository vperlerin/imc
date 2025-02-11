import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React, { useEffect } from "react";
import { conferenceData as cd } from "data/conference-data";

const AccomodationForm = ({
  register,
  errors,
  isDebugMode = false,
  step = null,
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
    setValue("registrationType", cd.costs.rooms[1].price.toString()); // Defaulting to "Double Room"
    setValue("paymentMethod", "Paypal");
    trigger();
  };

  return (
    <>
      <h4 className="mb-3 border-bottom pb-2">
        {step && <><span >{step} </span>{' '}-{' '}</>}
        Accomodation & Payment Method
      </h4>

      <div className={classNames(cssForm.smallW, "mx-auto position-relative")}>

        {isDebugMode && (
          <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
            Fill Test Data
          </button>
        )}

        {/* Registration Type */}
        <div className="mb-4 mt-2">
          <label className="fw-bold mb-2">Registration Type</label>
          <div className="d-flex flex-column gap-2">
            {cd.costs.rooms.map((room, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`room-${index}`}
                  className="form-check-input"
                  value={room.price.toString()}
                  {...register("registrationType", { required: "Please select a registration type" })}
                />
                <label className="form-check-label" htmlFor={`room-${index}`}>
                  <strong>{room.price}€</strong> - {room.description}
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
                  className="form-check-input"
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
