import axios from "axios";
import React, { useState } from "react";
import Loader from "components/loader";
import PasswordInput from "components/form/pwd";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { authActions } from "store/auth";
import classNames from "classnames";
import css from "./index.module.scss";
import cssForm from "styles/components/form.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loginMessage = location.state?.message;
  const from = location.state?.from;
  const redirectPath = from
    ? `${from.pathname || ""}${from.search || ""}${from.hash || ""}`
    : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login.php`,
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Invalid response from server");
      }

      dispatch(authActions.setSession("authenticated"));
      await dispatch(authActions.fetchUser());

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }

      // Redirect user based on role
      switch (response.data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "soc":
          navigate("/admin/contributions/talks");
          break;
        case "loc":
          navigate("/admin/accomodations");
          break;
        default:
          navigate("/update-registration");
          break;
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={classNames(css.login, "flex-grow-1 d-flex flex-column h-100 align-items-center justify-content-center position-relative")}>

      {loginMessage &&
        <>
          <p className="fw-bolder text-start w-100">
            In the context of climate change and the need to reduce fossil-fuel use, we strongly encourage participants to choose lower-carbon travel options whenever possible, including carpooling.
          </p>

          <p className="text-start w-100">
            Our Carpooling System allows you to either offer a ride or contact a driver offering a ride to the conference venue.
          </p>
          <div className="alert alert-info fw-bolder">{loginMessage}</div>
        </>
      }


      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className={classNames(cssForm.xSmallW, "w-100 border p-3 rounded-2")}>
        {error && <div className="alert alert-danger fw-bolder">{error}</div>}


        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input
            autoFocus
            disabled={isLoading}
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <PasswordInput
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-100"
            required
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Link to="/forgot-password" className="text-decoration-none">Forgot your password?</Link>
          <button
            disabled={isLoading || !email.trim() || !password.trim()}
            type="submit"
            className="btn btn-outline-primary fw-bolder"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
