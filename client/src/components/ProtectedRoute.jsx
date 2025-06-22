import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuthStore();

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  return children;
};

export default ProtectedRoute;
