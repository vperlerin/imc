import { authSelectors } from 'store/auth';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdmin = useSelector(authSelectors.isAdmin); 
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;