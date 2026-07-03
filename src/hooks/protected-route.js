import { authSelectors, fetchUser } from "store/auth";
import { useSelector, useDispatch } from "react-redux";
import { createElement, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  loginMessage = null,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(authSelectors.isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUser()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null; // Prevents redirection before API call completes

  if (!isAuthenticated) {
    return createElement(Navigate, {
      to: "/login",
      replace: true,
      state: { from: location, message: loginMessage },
    });
  }

  // Redirect if user doesn't have the correct role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return createElement(Navigate, { to: "/login", replace: true });
  }

  return children;
};

export default ProtectedRoute;
