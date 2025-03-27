import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem("role");

  if (!userRole || (role && userRole !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
