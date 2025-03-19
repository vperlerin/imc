import { authSelectors, fetchUser } from "store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelectors.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role); 
  const [loading, setLoading] = useState(true);
  const host = window.location.host;

  useEffect(() => {
   // if (host === "localhost:3000") return;
    dispatch(fetchUser()).finally(() => setLoading(false));
  }, [dispatch]);

 // if (host === "localhost:3000") return <>{children}</>;

  if (loading) return <></>; // Prevents redirection before API call completes

  // Redirect if user is not authenticated or doesn't have the correct role
  if (!isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }
 
  return children;
};

export default ProtectedRoute;
