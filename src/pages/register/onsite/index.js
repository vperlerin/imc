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
import Summary from "components/billing/summary/";
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    watch
  } = useForm();

  // Watch the dob field
  const dob = watch("dob");
  const age = calculateAge(dob);
  const isUnder16 = age !== null && age < 16;

  const initialData = null; // replace with the API res
  const isEarlyBird = initialData?.isEarlyBird || new Date() < new Date(cd.deadlines.early_birds);

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

  if (!isDebugMode) {
    return (
      <PageContain title="Register Onsite">
        Come back soon…
      </PageContain>
    )
  }

  return (
    <PageContain title="Register Onsite">
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-grow-1 flex-column">
        {step === 1 && (
          <>
            <p className="border rounded-2 p-3">
              <b>People who need an invitation letter for Visa</b> must send their request without any delay to imc{cd.year}@imo.net. Please, provide your legal private domicile or professional address, passport number and the address of the {cd.consulate} where your visa application will be submitted.
            </p>

            {new Date() < new Date(cd.deadlines.early_birds) && (
              <p className="d-flex border rounded-2 p-3 border-info text-info gap-2 mb-5">
                <CiWarning className={css.warning} />
                <span>
                  <span className="d-block fw-bolder">Hurry up! After {formatFullDate(cd.deadlines.early_birds)}, a late booking fee of {cd.costs.after_early_birds}€ is added to the registration fee</span>
                  <small>— because the early birds got the discount, and the latecomers just get the worms (and a fee :).</small>
                </span>
              </p>
            )}
          </>
        )}

        <input
          name="isEarlyBird"
          type="hidden"
          value={isEarlyBird}
          {...register("isEarlyBird")}
        />

        <input
          name="type"
          type="hidden"
          value="onsite"
          {...register("type")}
        />

        {step === 1 && (
          <Identitity
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            initialData={initialData}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
          />
        )}



        {step === 2 && cd?.workshops?.length > 0 && (
          <Workshops
            conferenceData={cd}
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            initialData={initialData}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
          />
        )}
        {step === 3 &&
          <Arrival
            conferenceData={cd}
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            initialData={initialData}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
          />
        }
        {step === 4 &&
          <Contribution
            conferenceData={cd}
            control={control}
            register={register}
            isDebugMode={isDebugMode}
            errors={errors}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
            initialData={{
              talks: initialData?.talks || getValues("talks") || [],
              posters: initialData?.posters || getValues("posters") || [],
            }}
          />
        }
        {step === 5 &&
          <Accomodation
            conferenceData={cd}
            control={control}
            register={register}
            isDebugMode={isDebugMode}
            initialData={initialData}
            isEarlyBird={isEarlyBird}
            errors={errors}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
          />
        }

        {step === 6 && (
          <Extras
            conferenceData={cd}
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            initialData={initialData}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
          />
        )}

        {step === 7 && (
          <Comments
            register={register}
            errors={errors}
            isDebugMode={isDebugMode}
            initialData={initialData}
            isUnder16={isUnder16}
            showGdpr={true}
            step={step}
            stepTotal={totalStep}
            setValue={setValue}
            trigger={trigger}
          />
        )}

        {step === 8 && (
          <Summary
            getValues={getValues}
            isEarlyBird={isEarlyBird}
            conferenceData={cd}
          />
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

            {step === totalStep && <button className="btn btn-primary fw-bolder" type="submit">Submit</button>}
          </div>
        </div>
      </form>
    </PageContain>
  );
};

export default MainForm;
