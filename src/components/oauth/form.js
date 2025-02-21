import axios from "axios";
import React, { useState } from "react";
import Loader from "components/loader";
import PasswordInput from 'components/form/pwd';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "store/auth";
import classNames from "classnames";
import css from "./index.module.scss";
import cssForm from "styles/components/form.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login.php`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Invalid response from server");
      }


      dispatch(authActions.setAuth({ oauth: response.data.oauth, user: response.data.user }));

      const user = response.data.user || {};
      navigate(user.is_admin ? "/admin" : "/");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={classNames(css.login, "flex-grow-1 d-flex h-100 align-items-center justify-content-center position-relative")}>
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
            aria-describedby="emailHelp"
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
            disabled={isLoading || !email || !password}
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
