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
    //if(host === 'localhost:3000') { return }
    dispatch(fetchUser()).finally(() => setLoading(false));   
  }, [dispatch]);

  //if(host === 'localhost:3000') { return <>{children}</>}

  if (loading) return <></>;  // Prevents redirection before API call completes

  return isAuthenticated && isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;