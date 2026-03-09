import { Navigate, Outlet } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = () => {
  return auth.isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
