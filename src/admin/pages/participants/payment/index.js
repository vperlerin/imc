import PageContain from "@/admin/components/page-contain";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Loader from "components/loader";
import cssForm from "styles/components/form.module.scss";
import classNames from "classnames";
import StaticSummary from "components/billing/static_summary";
import WysiwygEditor from 'utils/wysiwyg-editor.js';
import { getPaymentMethodById } from 'utils/payment_method';
import { useParams } from "react-router-dom";
import { conferenceData as cd } from "data/conference-data";
import { useForm } from "react-hook-form";

const Payments = () => {
  const { participantId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participant, setParticipant] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [registrationTypes, setRegistrationTypes] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [amount, setAmount] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [adminNote, setAdminNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [totalDue, setTotalDue] = useState(null);

  const hasFetchedData = useRef(false);
  const hasFetchedParticipant = useRef(false);
  const hasFetchedParticipantPayments = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: totalDue?.toFixed(2) || "",
      paymentMethodId: paymentMethodId || "",
      paymentDate: new Date().toISOString().split("T")[0],
      adminNote: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      if (hasFetchedData.current) return;
      hasFetchedData.current = true;
      setLoading(true);

      try {
        // Step 1: Fetch Payment Methods, Workshops, and Registration Types
        const specificDataResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get_specific_data.php`);
        if (!specificDataResponse.data.success) throw new Error(specificDataResponse.data.message || "Failed to fetch data.");

        setWorkshops(specificDataResponse.data.data.workshops || []);
        setPaymentMethods(specificDataResponse.data.data.payment_methods || []);
        setRegistrationTypes(specificDataResponse.data.data.registration_types || []);

        // Step 2: Fetch Participant Data (Only after Step 1 completes)
        if (!participantId) return;
        hasFetchedParticipant.current = true;

        const participantResponse = await axios.get(`${process.env.REACT_APP_API_URL}/admin/api/participant.php?id=${participantId}`);
        if (!participantResponse.data.success) throw new Error(participantResponse.data.message || "Failed to fetch participant data.");

        setParticipant(participantResponse.data.data);

        // Step 3: Set Default Payment Method (Only if accommodation data exists)
        if (participantResponse.data.data?.accommodation?.payment_method_id) {
          setPaymentMethodId(participantResponse.data.data.accommodation.payment_method_id);

          const methodType = getPaymentMethodById(participantResponse.data.data.accommodation.payment_method_id, specificDataResponse.data.data.payment_methods);
          const calculatedTotalDue = methodType === 'paypal'
            ? parseFloat(participantResponse.data.data.participant.total_due) + parseFloat(participantResponse.data.data.participant.paypal_fee) - parseFloat(participantResponse.data.data.participant.total_paid)
            : parseFloat(participantResponse.data.data.participant.total_due) - parseFloat(participantResponse.data.data.participant.total_paid);

          setTotalDue(calculatedTotalDue);
        }

        // Step 4: Fetch Payments (Only after Participant Data is fetched)
        const paymentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/get_participant_payments.php?id=${participantId}`);
        if (!paymentsResponse.data.success) throw new Error(paymentsResponse.data.message || "Failed to fetch payments.");

        setPayments(paymentsResponse.data.data.payments || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [participantId]);

  // Step 5: Set default value for amount when totalDue is updated
  useEffect(() => {
    if (totalDue !== null && !editingPayment) {
      setAmount(totalDue.toFixed(2)); // Ensure two decimal places
    }
  }, [totalDue, editingPayment]);


  const submitForm = async (data) => {
    setError(null);
    setSuccessMsg(null);

    try {
      let response;
      const payload = {
        participant_id: participantId,
        amount: parseFloat(data.amount),
        payment_method_id: data.paymentMethodId,
        payment_date: data.paymentDate,
        admin_note: data.adminNote || null,
      };

      if (editingPayment) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/admin/api/update_payment.php`,
          { payment_id: editingPayment.id, ...payload },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/api/add_payment.php`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      if (response.data.success) {
        setSuccessMsg(editingPayment ? "Payment updated successfully!" : "Payment added successfully!");
        setPayments(prev =>
          editingPayment
            ? prev.map(p => (p.id === editingPayment.id ? response.data.new_payment : p))
            : [...prev, response.data.new_payment]
        );
        resetForm();
      } else {
        throw new Error(response.data.message || "Failed to process payment.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a payment
  const handleDelete = async (paymentId) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_payment.php`, {
        data: { payment_id: paymentId },
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccessMsg("Payment deleted successfully!");
        setPayments(prev => prev.filter(p => p.id !== paymentId));
      } else {
        throw new Error(response.data.message || "Failed to delete payment.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset form fields 
  const resetForm = () => {
    reset({
      amount: totalDue?.toFixed(2) || "",
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
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form>
        <WysiwygEditor />

      </form>

      {!loading && participant && (
        <>
          <div className="d-flex flex-column flex-md-row gap-3 align-items-strecht">

            <div className="border p-3 rounded-2 flex-grow-1">
              <h4 className="mb-3">{editingPayment ? "Edit Payment" : "Add a New Payment"}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Amount (€)</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className={classNames('form-control', cssForm.md50)}
                      value={amount.replace(",", ".")}  // Ensure `.` is always displayed
                      inputMode="decimal"
                      pattern="[0-9]*[.]?[0-9]*"
                      onChange={(e) => {
                        let value = e.target.value.replace(",", ".");
                        if (/^[0-9]*[.]?[0-9]*$/.test(value)) {
                          setAmount(value);
                        }
                      }}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Pay. Method</label>
                  <div className="col-sm-6">
                    <select
                      className="form-select"
                      value={paymentMethodId}
                      onChange={(e) => setPaymentMethodId(e.target.value)}
                      required
                    >
                      <option value="">Select a payment method</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Payment Date</label>
                  <div className="col-sm-6">
                    <input type="date" className="form-control" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Marc's Note (Optional)</label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows="2"
                    />
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-outline-primary fw-bolder">{submitting ? "Processing..." : editingPayment ? "Update Payment" : "Add Payment"}</button>
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
          <div className="border p-3 rounded-2 mt-3">
            <h4 className="mb-3">Previous Payments</h4>
            {payments.length > 0 ? (
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
                    <tr key={payment.id}>
                      <td>{payment.payment_date || "N/A"}</td>
                      <td>{parseFloat(payment.amount).toFixed(2)}</td>
                      <td>{payment.payment_method}</td>
                      <td>{payment.admin_note || "No note"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p><i className="text-muted">No payments recorded.</i></p>
            )}
          </div>
        </>
      )}
    </PageContain >
  );
};

export default Payments;
