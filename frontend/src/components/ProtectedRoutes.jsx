import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { useUserContext } from "../context/userContext";

const ProtectedRoutes = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
