import classNames from "classnames";
import cssForm from "styles/components/form.module.scss";
import StepDislay from "components/registration/stepDisplay";
import React, { useEffect, useState } from "react";
import { gdpr } from 'data/gdpr';

const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const Comments = ({
  isAdmin = false,
  register,
  errors,
  isDebugMode = false,
  isUnder16 = false,
  showGdpr = false,
  step,
  stepTotal,
  trigger,
  setValue,
  initialData
}) => {
  const [isCurUnder16, setIsCurUnder16] = useState(isUnder16 || false);


  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key, value);
        }
      });

      // Set service agreement default value
      setValue("service_agreement", initialData.service_agreement ?? false);

      // Check if the participant is under 16
      const age = calculateAge(initialData.dob);
      if (age !== null && age < 16) {
        setIsCurUnder16(true);
        setValue("guardian_name", initialData.guardian_name ?? "");
        setValue("guardian_contact", initialData.guardian_contact ?? "");
        setValue("guardian_email", initialData.guardian_email ?? "");
        setValue("parental_consent", initialData.parental_consent ?? false);
      } else {
        setIsCurUnder16(false);
      }
    }
  }, [initialData, setValue]);


  const fillTestData = () => {
    setValue("comments", "No comment provided.");
    setValue("service_agreement", true);

    if (isUnder16) {
      setValue("guardian_name", "John Doe");
      setValue("guardian_contact", "+1234567890");
      setValue("guardian_email", "guardian@example.com");
      setValue("parental_consent", true);
    }

    trigger();
  };


  return (
    <div className="position-relative">

      {isDebugMode && (
        <button type="button" className="position-absolute top-0 end-0 btn btn-secondary" onClick={fillTestData}>
          Fill Test Data
        </button>
      )}

      {!isAdmin && (
        <h4 className="mb-3 border-bottom pb-2">
          <StepDislay step={step} stepTotal={stepTotal} />
          Comments, Data Protection and Service Agreement
        </h4>
      )}

      <div className="mx-md-3 mb-3">
        <div className="mb-4">
          <label className="form-label fw-bold pb-0">Preferred Roommates, Comments, or Specific Instructions</label>
          <p class="text-info fw-bolder mb-1">If you selected to stay with us in a double, triple, or quadruple room,
            please enter the names of your preferred roommates below.</p>
          <textarea
            className="form-control"
            placeholder="Add a comment and/or the list of your preferred roommates if needed"
            {...register("comments")}
          ></textarea>
          {errors.comments && <p className="text-danger">{errors.comments.message}</p>}
        </div>

        {showGdpr && (
          <>
            <label className="form-label fw-bold pb-0">
              IMO values your personal data and holds them in accordance with the General Data Protection Regulation (
              <a href="https://gdpr-info.eu/" target="_blank" rel="noopener noreferrer">GDPR</a>).
            </label>
            <div className={classNames(cssForm.gdpr, 'p-3 rounded border mb-3')}>
              {gdpr}
            </div>

            {isCurUnder16 && (
              <>
                <label className="form-label fw-bold pb-0 mt-3">
                  Since you are not yet 16 years of age, the consent we seek must be given by someone holding the parental responsibility over you.
                  Please ask this person to complete the following:
                </label>
                <div className="border p-3 rounded-2">
                  <div className="d-md-flex mb-3 gap-3">
                    <div className="flex-grow-1">
                      <label className="form-label">Parent/Guardian Full Name</label>
                      <input
                        type="text"
                        className={classNames('form-control', { "is-invalid": errors.guardian_name })}
                        {...register("guardian_name", { required: "Parent/Guardian name is required" })}
                      />
                      {errors.guardian_name && <p className="text-danger">{errors.guardian_name.message}</p>}
                    </div>

                    <div className="flex-grow-1">
                      <label className="form-label">Parent/Guardian Contact Number</label>
                      <input
                        type="tel"
                        className={classNames('form-control', { "is-invalid": errors.guardian_contact })}
                        {...register("guardian_contact", { required: "Contact number is required" })}
                      />
                      {errors.guardian_contact && <p className="text-danger">{errors.guardian_contact.message}</p>}
                    </div>

                    <div className="flex-grow-1">
                      <label className="form-label">Parent/Guardian Email</label>
                      <input
                        type="email"
                        className={classNames('form-control', { "is-invalid": errors.guardian_email })}
                        {...register("guardian_email", { required: "Email is required" })}
                      />
                      {errors.guardian_email && <p className="text-danger">{errors.guardian_email.message}</p>}
                    </div>
                  </div>

                  <div className="form-check mt-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="parentalConsent"
                      {...register("parental_consent", { required: "Parental consent is required" })}
                    />
                    <label className="form-check-label" htmlFor="parentalConsent">
                      I certify that I am holder of the parental responsibility over the person identified above, and that I give my consent to the data controller to process his/her personal data in strict compliance with the above conditions.
                      This consent extends to my personal data provided in this authorization which the data controller will keep as proof that due consent has been given and which, in case of doubt, an IMO officer acting under the authority of the IMO may use to contact me in verification that this authorization is genuine.
                      Also, I understand that any participant under 18 years old must be accompanied by a properly and provably authorized adult.
                    </label>
                  </div>
                  {errors.parental_consent && <p className="text-danger">{errors.parental_consent.message}</p>}
                </div>
              </>
            )}

            <div className="form-check mt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="serviceAgreement"
                {...register("service_agreement", { required: "You must accept the service agreement." })}
              />
              <label className="form-check-label" htmlFor="serviceAgreement">
                By ticking this box, I acknowledge that I have read and that I accept the <a href="/disclaimer" target="blank" rel="no">service agreement and disclaimer</a> .
              </label>
            </div>
            {errors.service_agreement && <p className="text-danger">{errors.service_agreement.message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
