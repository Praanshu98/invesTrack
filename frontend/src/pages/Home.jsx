import { useUserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";

const Home = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user ? (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  ) : (
    <h1> Home </h1>
  );
};

export default Home;
