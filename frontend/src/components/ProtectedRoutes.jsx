import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

const ProtectedRoutes = () => {
  let { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
