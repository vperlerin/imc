import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { getPaymentMethodById } from "utils/payment_method";
import Accomodation from "components/registration/accomodation.js";
import Contribution from "components/registration/contribution.js";
import Identity from "components/registration/identity.js";
import Loader from "components/loader";
import PageContain from "components/page-contain";
import PayPalForm from "components/paypal";
import StaticSummary from "components/billing/static_summary/";
import Summary from "components/billing/summary/";
import Workshops from "components/registration/workshops";
import { conferenceData as cd } from "data/conference-data";
import { Link } from "react-router-dom";
import { sendEmail } from "hooks/send-email";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useApiParticipant } from "api/participants";
import { useApiSpecificData } from "api/specific-data/index.js";
import { registrationEmailToTeam, registrationEmailToParticipant } from "email-templates/registration";

const totalStep = 5;

const MainForm = () => {
  const location = useLocation();
  const isDebugMode = new URLSearchParams(location.search).get("debug") === "1";
  //
  const [emailStatus, setEmailStatus] = useState({
    teamEmailSent: null,
    participantEmailSent: null,
    error: null
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setisSaving] = useState(false);
  const [participantId, setParticipantId] = useState(null);
  const [paypalFee, setPaypalFee] = useState(0);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [successMsg, setSuccessMsg] = useState(null);
  const [total, setTotal] = useState(0);

  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: specificDataError } = useApiSpecificData();
  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId);

  const loading = specificdataLoading || participantLoading || isSaving;
  const error = [
    errorMsg,
    emailStatus.error,
    participantError,
    specificDataError,
  ].filter(Boolean);
 

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

  const is_early_bird = new Date() < new Date(cd.deadlines.early_birds);

  const nextStep = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (formData) => {
    setisSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/register_online.php`;

      const formattedData = {
        ...formData,
        is_early_bird: is_early_bird.toString(),
        is_online: "true",
        talks: formData.talks || [],
        total_due: total,
        paypal_fee: paypalFee?.toFixed(2) || 0,
      }; 

      const response = await axios.post(apiUrl, formattedData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccessMsg(`Registration successful! (ID: ${response.data.participant_id}) `);
        setParticipantId(response.data.participant_id);
        setPassword(response.data.password);
      } else {
        setErrorMsg(response.data.message || "Something went wrong.");
        setSuccessMsg("Registration successful but we couldn't send you an email");
      }
    } catch (error) {
      setErrorMsg("Failed to submit the form. Please try again.");
    } finally {
      setisSaving(false);
    }
  };

  useEffect(() => {
    if (!participant || !password) return;

    const sendEmails = async () => {
      try {
        const emailToTeam = registrationEmailToTeam(participant, workshops, paymentMethods, registrationTypes, sessions);
        const emailToParticipant = registrationEmailToParticipant(participant, workshops, paymentMethods, registrationTypes, sessions, password);
        const attendingWorkshops = participant.workshops?.filter((workshop) => workshop.attending === "1") || [];

        const bccRecipients = process.env.REACT_APP_BCC_ALL
          ? process.env.REACT_APP_BCC_ALL.split(",").map((email) => ({ email, name: "BCC Recipient" }))
          : [];

        const workshopEmailPromises = attendingWorkshops.map(async (workshop) => {
          return sendEmail({
            subject: `Workshop Registration`,
            message: `Hey ${workshop.responsible_name.split(" ")[0]},<br><br>
                      ${participant.participant.first_name} ${participant.participant.last_name} (${participant.participant.email})
                      has just registered for the "${workshop.title}" (<b>ONLINE version</b>).<br>See you,<br>V./<br>`,
            to: workshop.responsible_email,
            toName: workshop.responsible_name,
            fromName: "IMC 2025",
            replyTo: participant.participant.email,
            replyName: participant.participant.first_name + " " + participant.participant.last_name,
            bcc: bccRecipients,
          });
        });

        const responseEmailTeam = await sendEmail({
          subject: "New ONLINE IMC Registration",
          message: emailToTeam,
          to: process.env.REACT_APP_CONTACT_EMAIL,
          toName: process.env.REACT_APP_CONTACT_NAME,
          fromName: "IMC 2025",
          replyTo: "no-reply@imc.net",
          replyName: "Do not reply",
          bcc: bccRecipients,
        });

        const responseEmailParticipant = await sendEmail({
          subject: "New ONLINE IMC Registration",
          message: emailToParticipant,
          to: participant.participant.email,
          toName: `${participant.participant.first_name} ${participant.participant.last_name}`,
          fromName: "IMC 2025",
          replyTo: "no-reply@imc.net",
          replyName: "Do not reply",
          bcc: bccRecipients,
        });

        await Promise.all(workshopEmailPromises);

        setEmailStatus({
          teamEmailSent: responseEmailTeam,
          participantEmailSent: responseEmailParticipant,
          error: null,
        });
      } catch (error) {
        setEmailStatus({ teamEmailSent: null, participantEmailSent: null, error: error.message || "Failed to send emails" });
      }
    };

    sendEmails();
  }, [participant, workshops, password]);


    if (!isDebugMode && false) {
      return <PageContain title="Register Onsite">Come back soon…</PageContain>;
    }

  if (loading) return <Loader />;

  return (
    <PageContain title="Register Online" showRegBtn={false}>
      {error.length > 0 && (
        <div className="alert alert-danger fw-bolder">
          <ul className="mb-0">
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
          <div className="mt-2">
            If you think this is a mistake please try again or {' '} <Link
              aria-label="Contact"
              to="/contact"
              title="Contact"
            >
              contact us
            </Link>.
          </div>
        </div>
      )}

      {step === totalStep && (
        <>
          {participant && (
            <>
              <h2>{cd.thank_you}</h2>
              {successMsg && !errorMsg && <div className="alert alert-success fw-bolder">{successMsg}</div>}
              <p className="fw-bolder">
                We just sent you an email with some instructions. This email contains a summary of your information as well as the password
                required to eventually update your talks.
                If you do not receive this email within the next 20 minutes{' '}
                <Link
                  aria-label="Contact"
                  to="/contact"
                  title="Contact"
                >
                  contact us
                </Link>{' '} immediately.
              </p>

              <div className="d-flex flex-column flex-md-row gap-3">
                <div className="flex-grow-1">
                  <p className="fw-bolder text-danger">The IMC fee is due without any delay.</p>

                  {getPaymentMethodById(participant.participant.payment_method_id, paymentMethods) === "paypal" ? (
                    <div className="mb-3">
                      <p >Click the button below to pay immediately with Paypal.</p>
                      <PayPalForm amount={(total + paypalFee)} year={cd.year} />
                    </div>
                  ) : (
                    <>
                      <p><strong>  Please, transfer the total amount of {total}€ to confirm your registration immediately.</strong></p>
                      <blockquote className="border rounded-2 p-3">
                        International Meteor Organization, Jozef Mattheessensstraat 60, 2540 Hove, Belgium<br />
                        Bank account at BNP Paribas Fortis Bank Belgium<br />
                        BIC bank code: GEBABEBB<br />
                        IBAN account number: BE30 0014 7327 5911<br />
                        e-mail: treasurer@imo.net
                      </blockquote>
                    </>
                  )}
                </div>

                <StaticSummary
                  isOnline={true}
                  conferenceData={cd}
                  participantData={participant}
                  workshops={workshops}
                  registrationTypes={registrationTypes}
                  paymentMethods={paymentMethods}
                />

              </div>
            </>
          )}
        </>
      )}


      {!participant && !loading && (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-grow-1 flex-column position-relative">
   {isSaving && <Loader />}

   <input name="is_online" type="hidden" value="false" {...register("is_online")} />

          {step === 1 && (
            <Identity
              register={register}
              errors={errors}
              isOnline={true}
              isDebugMode={isDebugMode}
              step={step}
              stepTotal={totalStep}
              setValue={setValue}
              trigger={trigger}
            />
          )}

          {step === 2 && (
            <Contribution
              conferenceData={cd}
              control={control}
              register={register}
              isDebugMode={isDebugMode}
              isOnline={true}
              errors={errors}
              step={step}
              stepTotal={totalStep}
              getValues={getValues}
              setValue={setValue}
              sessions={sessions}
              trigger={trigger}
              watch={watch}
            />
          )}

          {step === 3 && cd?.workshops?.length > 0 && (
            <Workshops
              conferenceData={cd}
              register={register}
              errors={errors}
              isDebugMode={isDebugMode}
              isOnline={true}
              step={step}
              stepTotal={totalStep}
              setValue={setValue}
              trigger={trigger}
              watch={watch}
              workshops={workshops}
            />
          )}

          {step === 4 &&
            <Accomodation
              isOnline={true}
              conferenceData={cd}
              control={control}
              register={register}
              isDebugMode={isDebugMode}
              isEarlyBird={is_early_bird}
              paymentMethods={paymentMethods}
              errors={errors}
              registrationTypes={registrationTypes}
              step={step}
              stepTotal={totalStep}
              setValue={setValue}
              trigger={trigger}
            />
          }


          {step === 5 && !successMsg && (
            <Summary
              isOnline={true}
              getValues={getValues}
              isEarlyBird={is_early_bird}
              conferenceData={cd}
              setTotal={setTotal}
              setPaypalFee={setPaypalFee}
              showInfo={!successMsg}
              workshops={workshops}
              registrationTypes={registrationTypes}
              paymentMethods={paymentMethods}
              watch={watch}
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
      )}

    </PageContain >
  );
};

export default MainForm;
