import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useState } from "react";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  let { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);

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

  user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
