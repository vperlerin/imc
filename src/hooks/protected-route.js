import { authSelectors, fetchUser } from 'store/auth';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(authSelectors.isAdmin);
  const isAuthenticated = useSelector(authSelectors.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const host = window.location.host;
  
  useEffect(() => {
    dispatch(fetchUser()).finally(() => setLoading(false));   
  }, [dispatch]);

  if (loading) return <div className="position-absolute top-0 start-0 end-0 bottom-0 fw-bolder d-flex align-items-center justify-content-center">Security check...</div>;  // Prevent access before API response
 

  if(host === 'localhost:3000') {
    return <>{children}</>
  }

  return isAuthenticated && isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
