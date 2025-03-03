import PageContain from "@/admin/components/page-contain";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Loader from "components/loader";
import cssForm from "styles/components/form.module.scss";
import classNames from "classnames";
import StaticSummary from "components/billing/static_summary";
import { useParams } from "react-router-dom";
import { conferenceData as cd } from "data/conference-data";

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
  const [adminNote, setAdminNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const hasFetchedData = useRef(false);
  const hasFetchedParticipant = useRef(false);

  // Fetch available payment methods, workshops, and registration types
  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;
    setLoading(true);

    axios.get(`${process.env.REACT_APP_API_URL}/get_specific_data.php`)
      .then(response => {
        if (response.data.success) {
          setWorkshops(response.data.data.workshops || []);
          setPaymentMethods(response.data.data.payment_methods || []);
          setRegistrationTypes(response.data.data.registration_types || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch data.");
        }
      })
      .catch(err => setError(err.message || "An error occurred while fetching data."))
      .finally(() => setLoading(false));
  }, []);

  // Fetch participant data
  useEffect(() => {
    if (hasFetchedParticipant.current || !participantId) return;
    hasFetchedParticipant.current = true;
    setLoading(true);

    axios.get(`${process.env.REACT_APP_API_URL}/admin/participant.php?id=${participantId}`)
      .then(response => {
        if (response.data.success) {
          setParticipant(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch participant data.");
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [participantId]);

  // Fetch participant's payments
  useEffect(() => {
    if (!participantId) return;

    axios.get(`${process.env.REACT_APP_API_URL}/get_participant_payments.php?id=${participantId}`)
      .then(response => {
        if (response.data.success) {
          setPayments(response.data.data.payments || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch payments.");
        }
      })
      .catch(err => setError(err.message));
  }, [participantId]);

  // Handle form submission to add or update a payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }
    if (!paymentMethodId) {
      setError("Please select a payment method.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccessMsg(null);

    try {
      let response;
      if (editingPayment) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/update_payment.php`,
          {
            payment_id: editingPayment.id,
            amount: parseFloat(amount),
            payment_method_id: paymentMethodId,
            admin_note: adminNote || null,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/add_payment.php`,
          {
            participant_id: participantId,
            amount: parseFloat(amount),
            payment_method_id: paymentMethodId,
            admin_note: adminNote || null,
          },
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
    } finally {
      setSubmitting(false);
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
    setAmount("");
    setPaymentMethodId("");
    setAdminNote("");
    setEditingPayment(null);
  };

  const isOnline = participant?.participant?.is_online === "1";
  const breadcrumb = [
    { url: `/admin/participants/${isOnline ? 'online' : 'onsite'}`, name: isOnline ? "Online Participants" : "Onsite Participants" },
    { url: `/admin/participants/${isOnline ? 'online' : 'onsite'}/payment/${participantId}`, name: `${participant?.participant?.first_name || "Participant"} ${participant?.participant?.last_name || ""}'s Payments` }
  ];


  return (
    <PageContain breadcrumb={breadcrumb}>
      {loading && <Loader />}
      {!loading && error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}


      {!loading && participant && (
        <div className="d-flex flex-column flex-md-row gap-3 align-items-start">

          <div className="flex-grow-1">

            <div className="border p-3 rounded-2">
              <h4 className="mb-3">{editingPayment ? "Edit Payment" : "Add a New Payment"}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label className="col-sm-3 col-form-label fw-bold">Amount (€)</label>
                  <div className="col-sm-5">
                    <input
                      type="number"
                      className={classNames('form-control', cssForm.md50)}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.01"
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
                <div className="mb-3">
                  <label className="form-label fw-bold">Admin Note (Optional)</label>
                  <textarea
                    className="form-control"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows="2"
                  />
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-outline-primary fw-bolder">{submitting ? "Processing..." : editingPayment ? "Update Payment" : "Add Payment"}</button>
                </div>
              </form>
            </div>

            <h5 className="mt-4 border-bottom pb-2">Add a New Payment</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Amount (€)</label>
                <div className="col-sm-5">
                  <input
                    type="number"
                    className={classNames('form-control', cssForm.md50)}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label fw-bold">Payment Method</label>
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



              <button type="submit" className="btn btn-outline-primary fw-bolder" disabled={submitting}>
                {submitting ? "Adding Payment..." : "Add Payment"}
              </button>

            </form>


            <h5 className="mt-4">Previous Payments</h5>
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
              <p>No payments recorded.</p>
            )}

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
      )}
    </PageContain >
  );
};

export default Payments;
