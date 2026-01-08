import { Navigate, useLocation , Outlet} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute() {
  const { isAuth, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />
}