import { useUserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user ? (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  ) : (
    <div className="mt-52 flex h-screen w-screen justify-center">
      <SearchBar />
    </div>
  );
};

export default Home;
