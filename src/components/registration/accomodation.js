import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import React from "react";
import StepDislay from "components/registration/stepDisplay";

const AccomodationForm = ({
  isAdmin = false,
  conferenceData,
  register,
  errors,
  isDebugMode = false,
  isEarlyBird,
  isOnline = false,
  step,
  stepTotal,
  trigger,
  setValue,
  paymentMethods,
  registrationTypes,
}) => {

  const fillTestData = () => {
    setValue("registration_type_id", registrationTypes.length > 1 ? registrationTypes[1].id : "");
    setValue("payment_method_id", paymentMethods.length > 0 ? paymentMethods[paymentMethods.length - 1].id : "");
    trigger();
  };

  const hiddenRegistrationTypes  = ['single'];

  return (
    <>
      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          {!isOnline && <>Accommodation &</>} Payment Method
        </h4>
      )}

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
              {registrationTypes.filter((registration) => {
                if (isAdmin) return true; 
                return !hiddenRegistrationTypes.includes(registration.type); 
              }).map((registration, index) => (
                <div key={registration.id} className="form-check">
                  <input
                    type="radio"
                    id={`registration-${registration.id}`}
                    className={classNames("form-check-input", { "is-invalid": !!errors.registration_type_id })}
                    value={registration.id} // Now using ID instead of type
                    {...register("registration_type_id", { required: "Please select a registration type" })}
                  />
                  <label className="form-check-label d-block" htmlFor={`registration-${registration.id}`}>
                    <strong>
                      {isEarlyBird
                        ? parseFloat(registration.price).toFixed(2)
                        : (parseFloat(registration.price) + conferenceData.costs.after_early_birds).toFixed(2)}€
                    </strong>
                    - {registration.description}
                    <small className="text-muted d-block">
                      {registration.type !== "no"
                        ? `Standard accommodation in a ${registration.type} room for 3 nights (only) with full board + participation in the conference, conference materials, coffee breaks, and excursion (price per person).`
                        : `All meals except breakfasts + participation in the conference, conference materials, coffee breaks, and excursion (price per person).`}
                    </small>
                  </label>
                </div>
              ))}
            </div>
            {errors.registration_type_id && <p className="text-danger"><small>{errors.registration_type_id.message}</small></p>}
          </div>
        )}

        {isOnline && (
          <p>
            The price for online participation in IMC {conferenceData.year} is <b className="fw-bolder">{conferenceData.costs.online}€</b>.
          </p>
        )}

        {/* Payment Method */}
        <div className="mb-3">
          <label className="fw-bold mb-2">Method of Payment</label>
          <div className="d-flex flex-column gap-2">
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <div key={method.id} className="form-check">
                  <input
                    type="radio"
                    id={`payment-${method.id}`}
                    className={classNames("form-check-input", { "is-invalid": errors.payment_method_id })}
                    value={method.id} // Using ID for payment method
                    {...register("payment_method_id", { required: "Please select a payment method" })}
                  />
                  <label className="form-check-label d-block" htmlFor={`payment-${method.id}`}>
                    {method.method}
                    <div className="form-text">
                      {method.method === "Paypal"
                        ? "Additional fees apply."
                        : method.method === "Bank Transfer"
                          ? "Usually free from EU and EEA countries; costs are always at participants' expense."
                          : "Requires prior approval from the IMO Treasurer and statement of the agreed arrangement"}
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-danger"><small>No payment methods available.</small></p>
            )}
          </div>
          {errors.payment_method_id && <p className="text-danger"><small>{errors.payment_method_id.message}</small></p>}
        </div>
      </div>
    </>
  );
};

export default AccomodationForm;
