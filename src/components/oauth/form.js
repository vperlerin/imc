import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Navigate after login
import { authActions } from "store/auth"; // Import Redux auth actions
import classNames from "classnames";
import css from "./index.module.scss";
import cssForm from "styles/components/form.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();  

    try { 
      const response = await fakeLoginAPI(email, password);

      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }
 
      dispatch(authActions.setAuth(response.data)); 
      navigate("/");  
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className={classNames(css.login, "flex-grow-1 d-flex h-100 align-items-center justify-content-center")}>
      <form onSubmit={handleSubmit} className={classNames(cssForm.xSmallW, "w-100 border p-3 rounded-2")}>
       

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email address</label>
          <input 
            autoFocus 
            type="email" 
            className="form-control" 
            id="emailInput" 
            aria-describedby="emailHelp" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="passwordInput" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}  

 
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/forgot-password" className="text-decoration-none">Forgot your password?</Link>
          <button type="submit" className="btn btn-outline-primary fw-bolder">Login</button>
        </div>
      </form>
    </div>
  );
};
 

export default Login;
