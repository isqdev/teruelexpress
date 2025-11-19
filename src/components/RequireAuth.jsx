import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export function RequireAuth({ children }) {
  const isAuthenticated = Cookies.get('token') ? true : true;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
