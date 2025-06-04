import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }) {
  const isAuthenticated = true;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}