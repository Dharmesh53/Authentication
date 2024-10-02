import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const location = useLocation();
  const { auth } = useAuth();

  const hasAccess = auth?.roles?.some(role => allowedRoles.includes(role));

  return (
    hasAccess ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  );
};

interface RequireAuthProps {
  allowedRoles: Array<number>;
}

export default RequireAuth;

