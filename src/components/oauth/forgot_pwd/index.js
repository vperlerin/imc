import classNames from "classnames";
import css from '../index.module.scss';
import cssForm from "styles/components/form.module.scss";
import Loader from "components/loader";
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot_password.php`, { email });

      if (response.data.success) {
        setMessage(response.data.message || "Password reset email sent successfully.");
        setEmail("");
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Error sending reset email. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
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
