import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { CiWarning } from "react-icons/ci";

import Accomodation from "components/registration/accomodation.js";
import Arrival from "components/registration/arrival.js";
import Comments from "components/registration/comments";
import Contribution from "components/registration/contribution.js";
import css from './index.module.scss';
import Extras from "components/registration/extras.js";
import Identitity from "components/registration/identity.js";
import PageContain from "components/page-contain";
import React, { useState } from "react";
import Workshops from "components/registration/workshops";
import { conferenceData as cd } from "data/conference-data";
import { formatFullDate } from 'utils/date';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const totalStep = 8;

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

const MainForm = () => {
  const [step, setStep] = useState(1);
  const location = useLocation();
  const isDebugMode = new URLSearchParams(location.search).get("debug") === "1";
  const { control, register, handleSubmit, formState: { errors }, getValues, setValue, trigger, watch } = useForm();

  // Watch the dob field
  const dob = watch("dob");
  const age = calculateAge(dob);
  const isUnder16 = true; //age !== null && age < 16;

  const nextStep = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
  };

  return (
    <PageContain title="Register On-site">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-grow-1 flex-column">
        {step === 1 && (
          <>
            <p className="border rounded-2 p-3">
              <b>People who need an invitation letter for Visa</b> must send their request without any delay to imc{cd.year}@imo.net. Please, provide your legal private domicile or professional address, passport number and the address of the {cd.consulate} where your visa application will be submitted.
            </p>
            <p className="d-flex border rounded-2 p-3 border-info text-info gap-2 mb-5">
              <CiWarning className={css.warning} />
              <span>
                <span className="d-block fw-bolder">After {formatFullDate(cd.deadlines.early_birds)}, a late booking fee of {cd.costs.after_early_birds}€ is added to the registration fee</span>
                <small>— because the early birds got the discount, and the latecomers just get the worms (and a fee :).</small>
              </span>
            </p>
          </>
        )}

        {step === 8 && (
          <Identitity
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
          />
        )}

        {step === 2 && cd?.workshops?.length > 0 && (
          <Workshops
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
          />
        )}
        {step === 3 &&
          <Arrival
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
          />
        }
        {step === 4 &&
          <Contribution
            control={control}
            register={register}
            isDebugMode={isDebugMode}
            errors={errors}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
          />
        }
        {step === 5 &&
          <Accomodation
            control={control}
            register={register}
            isDebugMode={isDebugMode}
            errors={errors}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
          />
        }
        {step === 6 && (
          <Extras
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
          />
        )}

        {step === 1 && (
          <Comments
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            step={`${step}/${totalStep}`}
            setValue={setValue}
            trigger={trigger}
          />
        )}

        {/* If the user is under 16, add extra fields on the last step */}
        {step === 1 && isUnder16 && (
          <div className="border p-3 rounded-2 mt-3">
            <h5>Additional Information for Minors</h5>
            <div className="mb-3">
              <label className="form-label">Parent/Guardian Full Name</label>
              <input
                type="text"
                className="form-control"
                {...register("guardian_name", { required: "Parent/Guardian name is required" })}
              />
              {errors.guardian_name && <p className="text-danger">{errors.guardian_name.message}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Parent/Guardian Contact Number</label>
              <input
                type="tel"
                className="form-control"
                {...register("guardian_contact", { required: "Contact number is required" })}
              />
              {errors.guardian_contact && <p className="text-danger">{errors.guardian_contact.message}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Parent/Guardian Email</label>
              <input
                type="email"
                className="form-control"
                {...register("guardian_contact", { required: "Email is required" })}
              />
              {errors.guardian_email && <p className="text-danger">{errors.guardian_email.message}</p>}
            </div>
          </div>
        )}

        <div className="mt-auto pt-3">
          <div className="d-flex gap-3 justify-content-end">
            {step > 1 && (
              <button className="btn btn-outline-primary fw-bolder d-inline-flex align-items-center gap-2" type="button" onClick={prevStep}>
                <SlArrowLeft style={{ strokeWidth: "110px" }} /> Back
              </button>
            )}
            {step < totalStep && (
              <button className="btn btn-outline-primary fw-bolder d-inline-flex align-items-center gap-2" type="button" onClick={nextStep}>
                Continue <SlArrowRight style={{ strokeWidth: "110px" }} />
              </button>
            )}
          </div>

          {step === totalStep && <button className="btn btn-outline-primary fw-bolder" type="submit">Submit</button>}
        </div>
      </form>
    </PageContain>
  );
};

export default MainForm;
