import { useNavigate } from "react-router-dom";

import logout from "../utils/logout";

const Logout = () => {
  const navigate = useNavigate();
  logout(navigate);
};

export default Logout;
