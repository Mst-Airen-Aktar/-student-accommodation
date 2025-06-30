import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, userRole, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && userRole !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
}
