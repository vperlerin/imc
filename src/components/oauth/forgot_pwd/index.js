import classNames from "classnames";
import css from "../index.module.scss";
import cssForm from "styles/components/form.module.scss";
import Loader from "components/loader";
import React, { useState } from "react";
import axios from "axios";
import { sendEmail } from "hooks/send-email";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgot_password.php`,
        { email }
      );

      console.log("RESPONSE ? ", response);

      if (response.data.success && response.data.token && response.data.email) {
        const emailResponse = await sendEmail({
          subject: `IMC ${process.env.YEAR} Password Reset`,
          message: `Click the link below to reset your password: <br>
            <a href="https://imc${process.env.YEAR}.imo.net/reset-password?token=${response.data.token}">
            Reset Password</a>`,
          to: response.data.email,
          toName: "IMC Participant",
          fromName: "IMC 2025",
          replyTo: "no-reply@imc2025.imo.net",
          replyName: "no-reply",
        });

        if (emailResponse.success) {
          setMessage("Password reset email sent successfully.");
        } else {
          setError("Something went wrong. Impossible to send you an email for now. Please try again later.");
        }
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
      setEmail('');
    }
  };

  return (
    <div className={classNames(css.login, "flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative")}>
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit} className={classNames(cssForm.xSmallW, "w-100 border p-3 rounded-2")}>
        {error && <div className="alert alert-danger fw-bolder">{error}</div>}
        {message && <div className="alert alert-success fw-bolder">{message}</div>}

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Enter your email</label>

          <input
            autoFocus
            disabled={isLoading}
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>

        <button
          disabled={isLoading || !email.trim()}
          type="submit"
          className="btn btn-outline-primary fw-bolder"
        >
          Send reset link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
