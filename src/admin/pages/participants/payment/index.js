import { IoIosMail } from "react-icons/io";
import AdminTable from "@/admin/components/admin-table";
import css from './index.module.scss';
import classNames from "classnames";
import PageContain from "@/admin/components/page-contain";
import React, { useEffect, useState } from "react";
import Loader from "components/loader";
import cssForm from "styles/components/form.module.scss";
import StaticSummary from "components/billing/static_summary";
import { useParams } from "react-router-dom";
import { conferenceData as cd } from "data/conference-data";
import { useForm } from "react-hook-form";
import { useApiPayments } from "@/admin/api/payments";
import { useApiAddPayment } from "@/admin/api/payments/add";
import { useApiSpecificData } from "api/specific-data";
import { useApiParticipant } from "api/participants";
import { useApiConfirmParticipant } from '@/admin/api/participants/confirm';
import { formatFullDate } from "utils/date";
import { sendEmail } from "hooks/send-email";



const Payments = ({ isCurOnline = false }) => {
  const { participantId } = useParams();
  const [wantToAddMessage, setWantToAddMessage] = useState(false);
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const [_confirmError, set_ConfirmError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [fetchParticipantTrigger, setFetchParticipantTrigger] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [confirmingEmail, setIsConfirmingEmail] = useState(false);

  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: specificDataError } = useApiSpecificData();
  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId, isCurOnline, fetchParticipantTrigger);
  const { payments, loading: paymenstLoading, error: paymentsError, refetchPayments } = useApiPayments(participantId);
  const { addPayment } = useApiAddPayment(participantId);
  const { confirmParticipant, isConfirming, errorConfirm } = useApiConfirmParticipant();


  const {
    formState: { errors },
    register,
    handleSubmit,
    isSubmitting,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      amount: "",
      paymentMethodId: "",
      paymentDate: new Date().toISOString().split("T")[0],
      adminNote: "",
    },
  });


  const loading = specificdataLoading || participantLoading || isSubmitting || paymenstLoading;
  const error = participantError || specificDataError || paymentsError || formErrors;
  const paymentMethodId = watch("paymentMethodId");

  

  useEffect(() => {
    if (participant && participant.accommodation) {
      setValue("paymentMethodId", participant.accommodation.payment_method_id || "");
    }
  }, [paymentMethodId, participant, setValue]);

  useEffect(() => {
    if (participant?.participant) {
      const dueAmount = participant.participant.payment_method_name
        ? parseFloat(participant.participant.total_due) + parseFloat(participant.participant.paypal_fee) - parseFloat(participant.participant.total_paid)
        : parseFloat(participant.participant.total_due) - parseFloat(participant.participant.total_paid);
      setValue("amount", dueAmount.toFixed(2));
    }
  }, [paymentMethodId, participant, setValue]);


  const submitForm = async (data) => {
    setSuccessMsg(null);
    setFormErrors(null);

    const payload = {
      participant_id: participantId,
      amount: parseFloat(data.amount),
      payment_method_id: data.paymentMethodId,
      payment_date: data.paymentDate,
      admin_note: data.adminNote || null,
    };

    const result = await addPayment(payload);

    if (result.success) {
      setSuccessMsg("Payment added successfully!");
      resetForm();

      await refetchPayments();
    } else {
      setFormErrors(result.message);
    }
  };

  useEffect(() => {
    setFetchParticipantTrigger(prev => !prev);
  }, [payments]);

  // Confirm
  const handleConfirmClick = () => {
    const amountDue = (() => {
      if (!participant?.participant) return 0;
      const totalDue = parseFloat(participant.participant.total_due);
      const totalPaid = parseFloat(participant.participant.total_paid);
      return totalDue - totalPaid;
    })();

    if (amountDue > 0) {
      const name = `${participant?.participant?.first_name} ${participant?.participant?.last_name}`;
      let message = `Marc, you are about to confirm ${name} <strong>${isOnline ? "ONLINE" : "ONSITE"}</strong> registration.`;
      message += ` <div class="text-danger fw-bolder border rounded-2 p-2 m-3 border-danger">${participant?.participant?.first_name} still needs to pay ${amountDue.toFixed(2)}€</div>`;
      message += `<p>Are you sure you want to continue?</p>`;
      setModalContent(message);
      setShowConfirmModal(true);
    } else {
      setShowConfirmationModal(true);
    }

  };


  // Reset form fields 
  const resetForm = () => {
    reset({
      amount: "",
      paymentMethodId: "",
      paymentDate: new Date().toISOString().split("T")[0],
      adminNote: "",
    });
    setEditingPayment(null);
  };


  const isOnline = participant?.participant?.is_online === "1";
  const breadcrumb = [
    { url: `/admin/participants/${isOnline ? 'online' : 'onsite'}`, name: isOnline ? "Online Participants" : "Onsite Participants" },
    { url: `/admin/participants/${isOnline ? 'online' : 'onsite'}/payment/${participantId}`, name: `${participant?.participant?.first_name || "Participant"} ${participant?.participant?.last_name || ""}'s Payments` }
  ];

  const confirmationMessage = `
    Dear ${participant?.participant?.first_name} ${participant?.participant?.last_name},<br><br>
    Your participation in the IMC ${cd.year} has now been confirmed.<br><br>
    Should your plans change, please contact us immediately: https://imc${cd.year}.imo.net/contact<br> 
    Notice that in such a case, the cancellation policy of the Disclaimer and Service Agreement applies: https://imc${cd.year}.imo.net/disclaimer<br><br>
    ${additionalMessage}
    Thank you!<br>
    We look forward to meeting you at ${cd.location}.<br><br>
    The IMC ${cd.year} Team.
  `;


  const handleConfirm = async () => {
    setIsConfirmingEmail(true);

    try {
      await confirmParticipant(participantId, { confirmation_date: true });
      setShowConfirmModal(false);
      setShowConfirmationModal(false);
    } catch (error) {
      set_ConfirmError("Failed to confirm the participant. Pleaase, try again later.");
    } finally {
      setIsConfirmingEmail(false);
    }
  };

  const handleConfirmAndSend = async () => {
    if (!wantToAddMessage) {
      setWantToAddMessage(true);
      return;
    }

    const finalMessage = `${confirmationMessage}<br><br>${additionalMessage}`;
    setIsConfirmingEmail(true);

    try {
      const emailResponse = await sendEmail({
        subject: `IMC ${cd.year} Confirmation`,
        message: finalMessage,
        to: participant.participant.email,
        toName: "IMC Confirmed Participant",
        fromName: "IMC 2025",
        replyTo: "no-reply@imc2025.imo.net",
        replyName: "no-reply",
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
      });

      if (!emailResponse.success) {
        set_ConfirmError("Impossible to send the an email for the moment. Please, try again later");
        return;
      }

      await confirmParticipant(participantId, { confirmation_sent: true, confirmation_date: true });
      setShowConfirmModal(false);
      setShowConfirmationModal(false);
    } catch (error) {
      set_ConfirmError("Failed to confirm the participant. Pleaase, try again later.");
    } finally {
      setIsConfirmingEmail(false);
    }
  };

  const handleSendOnly = async () => {
    if (!wantToAddMessage) {
      setWantToAddMessage(true);
      return;
    }

    const finalMessage = `${confirmationMessage}<br><br>${additionalMessage}`;
    setIsConfirmingEmail(true);

    try {
      const emailResponse = await sendEmail({
        subject: `IMC ${cd.year} Confirmation`,
        message: finalMessage,
        to: participant.participant.email,
        toName: "IMC Confirmed Participant",
        fromName: "IMC 2025",
        replyTo: "no-reply@imc2025.imo.net",
        replyName: "no-reply",
        bcc: process.env.REACT_APP_BCC_ALL ? process.env.REACT_APP_BCC_ALL.split(',').map(email => ({ email, name: 'BCC Recipient' })) : [],
      });

      if (!emailResponse.success) {
        set_ConfirmError("Impossible to send the an email for the moment. Please, try again later");
        return;
      }

      await confirmParticipant(participantId, { confirmation_date: true });
      setShowConfirmModal(false);
      setShowConfirmationModal(false);
    } catch (error) {
      set_ConfirmError("Failed to confirm the participant. Pleaase, try again later.");
    } finally {
      setIsConfirmingEmail(false);
    }
  };
  
  
  const confirmationSent = (participant?.participant.confirmation_sent !== "0" && participant?.participant.confirmation_sent !== 0);
  const confirmationDate = !!participant?.participant.confirmation_date;

  /*
  confirmation_sent => CONFIRMED
  confirmation_date => EMAILED
  */

  console.log("PARTICIPANT ", participant);
  
  return (
    <PageContain breadcrumb={breadcrumb} isMaxWidth>


      {loading && <Loader />}
      {error && <div className="alert alert-danger fw-bolder">{error}</div>}
      {successMsg && <div className="alert alert-success fw-bolder">{successMsg}</div>}

      {!loading && (
        <>
          {!participantLoading && (
            <AdminTable participants={[participant?.participant]} />
          )}

          {!participantLoading && (
            <div className="table-responsive" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Reg. Date</th>
                    <th>Name</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Method</th>
                    <th>Confirmed</th>
                    <th>Conf. Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={participant.participant.id}>
                    <td>{participant.participant.created_at.split(' ')[0]}</td>
                    <td>{participant.participant.title} {participant.participant.first_name} {participant.participant.last_name}</td>
                    <td>
                      {participant.participant.payment_method_name.toLowerCase() === 'paypal' ? (
                        <>{(parseFloat(participant.participant.total_due) + parseFloat(participant.participant.paypal_fee))}€</>
                      ) : (
                        <>{participant.participant.total_due}€</>
                      )}
                    </td>
                    <td>{participant.participant.total_paid}€</td>
                    <td
                      className={classNames({
                        "text-success": (() => {
                          const totalDue = Number(participant.participant.total_due);
                          const totalPaid = Number(participant.participant.total_paid);
                          const isPaypal = participant.participant.payment_method_name?.toLowerCase() === "paypal";
                          const paypalFee = isPaypal
                            ? (parseFloat(participant?.participant?.total_due || 0) * 0.034 + 0.35).toFixed(2)
                            : 0;
                          const amountDue = isPaypal ? totalDue + paypalFee - totalPaid : totalDue - totalPaid;
                          return amountDue === 0;
                        })(),
                      })}
                    >
                      {participant.participant.payment_method_name?.toLowerCase() === "paypal" ? (
                        <>
                          {(Number(participant.participant.total_due) + Number(participant.participant.paypal_fee) - Number(participant.participant.total_paid)).toFixed(2)}€
                        </>
                      ) : (
                        <>
                          {(Number(participant.participant.total_due) - Number(participant.participant.total_paid)).toFixed(2)}€
                        </>
                      )}
                    </td>
                    <td>{participant.participant.payment_method_name || "n/a"}</td>
                    <td>
                      {confirmationSent ? (
                        <>
                          ✅
                        </>
                      ) : (
                        "❌"
                      )}
                    </td>
                    <td className={classNames(confirmationDate && "text-success")}>
                      {confirmationDate ? formatFullDate(participant.participant.confirmation_date) : "❌"}
                    </td>
                    <td>
                      {!confirmationSent && !confirmationDate && (
                        <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-outline-success fw-bolder" onClick={handleConfirmClick}>
                            CONFIRM
                          </button>
                        </div>
                      )}

                      {confirmationSent && !confirmationDate && (
                        <div className="d-flex gap-2 justify-content-end">
                          <button className="btn btn-outline-success fw-bolder" onClick={handleConfirmClick}>
                            SEND <IoIosMail />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="d-flex flex-column flex-md-row gap-3 align-items-strecht">
            <div className="border p-3 rounded-2 flex-grow-1">
              <h4 className="mb-3">{editingPayment ? "Edit Payment" : "Add a New Payment"}</h4>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Amount (€)</label>
                  <div className="col-sm-5">
                    <input type="number" className={classNames('form-control', cssForm.md50)} {...register("amount", { required: true, min: 0 })} step="0.01" />
                    {errors.amount && <span className="text-danger">Amount is required and must be positive.</span>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Payment Method</label>
                  <div className="col-sm-6">
                    <select className="form-select" {...register("paymentMethodId", { required: true })}>
                      <option value="">Select a payment method</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>{method.method}</option>
                      ))}
                    </select>
                    {errors.paymentMethodId && <span className="text-danger">Payment method is required.</span>}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Payment Date</label>
                  <div className="col-sm-6">
                    <input type="date" className="form-control" {...register("paymentDate", { required: true })} />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Admin Note (Optional)</label>
                  <div className="col-sm-9">
                    <textarea className="form-control" {...register("adminNote")} rows="2" />
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-outline-primary fw-bolder" disabled={isSubmitting}>{isSubmitting ? "Processing..." : editingPayment ? "Update Payment" : "Add Payment"}</button>
                </div>
              </form>
            </div>

            <StaticSummary
              isOnline={isOnline}
              conferenceData={cd}
              participantData={participant}
              workshops={workshops}
              registrationTypes={registrationTypes}
              paymentMethods={paymentMethods}
            />
          </div >

          {payments && payments.length > 0 && !(payments.length === 1 && parseFloat(payments[0].amount) === 0) && (
            <div className="border p-3 rounded-2 mt-3">
              <h4 className="mb-3">Payments in record</h4>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount (€)</th>
                    <th>Method</th>
                    <th>Admin Note</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) =>
                    parseFloat(payment.amount) !== 0 ? (
                      <tr key={payment.id}>
                        <td>{payment.payment_date.split(' ')[0] || "N/A"}</td>
                        <td>{parseFloat(payment.amount).toFixed(2)}</td>
                        <td>{payment.payment_method}</td>
                        <td>{payment.admin_note || "No note"}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}


          {(showConfirmModal || showConfirmationModal) && <div className="modal-backdrop fade show"></div>}

          {showConfirmModal && (
            <div className="modal modal-lg show d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">CONFIRMATION</h5>
                    <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <div dangerouslySetInnerHTML={{ __html: modalContent }} />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-outline-danger fw-bolder" onClick={() => setShowConfirmModal(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-outline-success fw-bolder" onClick={() => { setShowConfirmModal(false); setShowConfirmationModal(true) }}>
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showConfirmationModal && (
            <div className="modal modal-lg show d-block">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">CONFIRMATION</h5>
                    <button type="button" className="btn-close" onClick={() => setShowConfirmationModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    {errorConfirm && <div className="text-danger fw-bolder">{errorConfirm}</div>}
                    {_confirmError && !errorConfirm && <div className="text-danger fw-bolder">{_confirmError}</div>}
                    {isConfirming || confirmingEmail && <Loader />}
                    {!wantToAddMessage && (
                      <>
                        <p className="fw-bolder">Marc, make your choice: </p>
                        <div className="d-flex w-100 gap-3 mt-3">
                          {!confirmationSent && !confirmationDate && (
                            <button className="fw-bolder btn btn-outline-success" onClick={handleConfirmAndSend} disabled={isConfirming}>
                              CONFIRM & SEND <IoIosMail />
                            </button>
                          )}

                          {confirmationSent && !confirmationDate && (
                            <button className="fw-bolder btn btn-outline-success" onClick={handleConfirm} disabled={isConfirming}>
                              CONFIRM
                            </button>
                          )}

                          {!confirmationSent && confirmationDate && (
                            <button className="fw-bolder btn btn-outline-success" onClick={handleSendOnly} disabled={isConfirming}>
                              SEND <IoIosMail />
                            </button>
                          )}
                          {errorConfirm && <div className="text-danger">{errorConfirm}</div>}
                        </div>
                      </>
                    )}

                    {wantToAddMessage && (
                      <>
                        <div>
                          <div className="my-3 d-flex gap-3 align-items-strecht">
                            <div className={css.col}>
                              Below is the email that is going to be sent:
                              <div className="bg-white text-black p-3 rounded mt-2" dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
                            </div>

                            <div className={css.col}>
                              Use the input below if you want to add text
                              <textarea
                                className={`form-control mt-2 ${css.textarea}`}
                                rows="3"
                                value={additionalMessage.replace(/<br>$/, '').replace(/<br>/g, '\n')}
                                onChange={(e) => setAdditionalMessage(e.target.value.replace(/\n/g, '<br>') + '<br>')}
                                placeholder="Add extra message here..."
                              />

                            </div>
                          </div>
                        </div>

                        <div className="d-flex gap-3 justify-content-end">
                          <button className="btn btn-outline-neutral fw-bolder" onClick={() => setWantToAddMessage(false)}>
                            Cancel
                          </button>
                          <button className="btn btn-outline-success fw-bolder" onClick={handleConfirmAndSend} disabled={isConfirming}>
                            SEND NOW <IoIosMail />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </PageContain >
  );
};

export default Payments;
