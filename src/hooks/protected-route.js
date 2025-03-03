import { authSelectors, fetchUser } from 'store/auth';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(authSelectors.isAdmin);
  const isAuthenticated = useSelector(authSelectors.isLoggedIn);
  const [loading, setLoading] = useState(false);
  const host = window.location.host;
  
  console.log("IS ADMIN? ", isAdmin);
  console.log("IS isAuthenticated? ", isAuthenticated);

  useEffect(() => {
    if(loading) {
      return;
    }
    setLoading(true);
    dispatch(fetchUser()).finally(() => setLoading(false));   
  }, [dispatch]);

  if (loading) return <></>;  // Prevent access before API response
  
  // To remove on prod
  if(host === 'localhost:3000') {
    return <>{children}</>
  }



  return isAuthenticated && isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
