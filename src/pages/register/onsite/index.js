import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { CiWarning } from "react-icons/ci";
import css from "./index.module.scss";
import Accomodation from "components/registration/accomodation.js";
import Arrival from "components/registration/arrival.js";
import Comments from "components/registration/comments";
import Contribution from "components/registration/contribution.js";
import Extras from "components/registration/extras.js";
import Identitity from "components/registration/identity.js";
import Loader from "components/loader";
import PageContain from "components/page-contain";
import React, { useState } from "react";
import Summary from "components/billing/summary/";
import Workshops from "components/registration/workshops";
import { conferenceData as cd } from "data/conference-data";
import { formatFullDate } from 'utils/date';
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [total, setTotal] = useState(0);  
  const [paypalFee, setPaypalFee] = useState(0);  
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

  const initialData = null;
  const is_early_bird = initialData?.is_early_bird || new Date() < new Date(cd.deadlines.early_birds);

  const nextStep = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (formData) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/register.php`;

      const formattedData = {
        ...formData,
        is_early_bird: is_early_bird.toString(),
        is_online: "false",
        talks: formData.talks || [],
        posters: formData.posters || [],
        total_due: total.toFixed(2), 
        paypal_fee: paypalFee.toFixed(2),
      };
 
      const response = await axios.post(apiUrl, formattedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccessMsg("Registration successful!");
      } else {
        setErrorMsg(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMsg("Failed to submit the form. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isDebugMode) {
    return <PageContain title="Register Onsite">Come back soon…</PageContain>;
  }

  return (
    <PageContain title="Register Onsite">
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-grow-1 flex-column position-relative">
        {loading && <Loader />}

        <input name="is_early_bird" type="hidden" value={is_early_bird} {...register("is_early_bird")} />
        <input name="is_online" type="hidden" value="false" {...register("is_online")} />

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
            isEarlyBird={is_early_bird}
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
            isEarlyBird={is_early_bird}
            conferenceData={cd}
            setTotalCost={setTotal}
            setPaypalFee={setPaypalFee}
            initialData={initialData}
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
