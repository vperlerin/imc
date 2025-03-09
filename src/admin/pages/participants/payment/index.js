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

const Payments = () => {
  const { participantId } = useParams();
  const [formErrors, setFormErrors] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [fetchParticipantTrigger, setFetchParticipantTrigger] = useState(false);

  const { workshops, paymentMethods, registrationTypes, loading: specificdataLoading, sessions, error: specificDataError } = useApiSpecificData();
  const { participant, loading: participantLoading, error: participantError } = useApiParticipant(participantId, fetchParticipantTrigger);
  const { payments, loading: paymenstLoading, error: paymentsError, refetchPayments } = useApiPayments(participantId);
  const { addPayment } = useApiAddPayment(participantId);

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
      setFetchParticipantTrigger(prev => !prev);
      await refetchPayments();
    } else {
      setFormErrors(result.message);
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


  return (
    <PageContain breadcrumb={breadcrumb} isMaxWidth>


      {loading && <Loader />}
      {error && <div className="alert alert-danger fw-bolder">{error}</div>}
      {successMsg && <div className="alert alert-success fw-bolder">{successMsg}</div>}

      {!loading && (
        <>
          <div className="table-responsive" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Reg. Date</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Total Paid</th>
                  <th>Amount due</th>
                  <th>Pay. Method</th>
                  <th>Confirmed</th>
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
                      "text-success fw-bolder": (() => {
                        const totalDue = Number(participant.participant.total_due);
                        const totalPaid = Number(participant.participant.total_paid);
                        const paypalFee = Number(participant.participant.paypal_fee || 0);

                        const isPaypal = participant.participant.payment_method_name?.toLowerCase() === "paypal";
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
                    {participant.participant.confirmation_sent === "1" ? (
                      <>
                        ✅ {participant.participant.confirmation_date && formatFullDate(participant.participant.confirmation_date)}
                      </>
                    ) : (
                      "❌"
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-end">

                      <button
                        className="btn btn-sm btn-outline-success fw-bolder"
                      //onClick={() => handleDeleteClick(participant)}
                      >
                        CONFIRM
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>



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
                  {payments.map((payment) => (
                    <>
                      {parseFloat(payment.amount) !== 0 && (
                        <tr key={payment.id}>
                          <td>{payment.payment_date.split(' ')[0] || "N/A"}</td>
                          <td>{parseFloat(payment.amount).toFixed(2)}</td>
                          <td>{payment.payment_method}</td>
                          <td>{payment.admin_note || "No note"}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </PageContain >
  );
};

export default Payments;
