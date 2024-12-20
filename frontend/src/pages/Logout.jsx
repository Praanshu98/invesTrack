import { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import logout from "../utils/logout";

const Logout = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      console.log("Logout");
      const response = await logout();

      if (response.status === 200) {
        setUser({ isLoggedIn: false });
        navigate("/");
      }
    };

    performLogout();
  }, [setUser, navigate]);

  return null;
};

export default Logout;
