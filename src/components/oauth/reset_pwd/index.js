import classNames from "classnames";
import css from "../index.module.scss";
import cssForm from "styles/components/form.module.scss";
import Loader from "components/loader";
import React, { useState } from "react";
import axios from "axios";
import PasswordInput from "components/form/pwd"; 
import { useSearchParams, Link } from "react-router-dom";  

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const API_URL = process.env.REACT_APP_API_URL;

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/reset_password.php`, {
        token,
        password,
      });

      if (response.data.success) {
        setMessage(response.data.message || "Your password has been reset successfully.");
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classNames(css.login, "flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative")}>
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit} className={classNames(cssForm.xSmallW, "w-100 border p-3 rounded-2")}>
        {error && <div className="alert alert-danger fw-bolder">{error}</div>}
        {message && (
          <div className="alert alert-success fw-bolder">
            {message}
            <div className="mt-3">
              <Link to="/login" className="btn btn-primary fw-bolder">
                Log in now
              </Link>
            </div>
          </div>
        )}

        <div className="mb-3">
          <PasswordInput
            autoFocus
            disabled={isLoading}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="form-text">
            Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number.
          </p>
        </div>

        <button
          disabled={isLoading || !passwordRegex.test(password)}
          type="submit"
          className="btn btn-outline-primary fw-bolder"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
