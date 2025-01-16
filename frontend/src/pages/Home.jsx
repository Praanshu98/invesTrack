import { useUserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import NAVChart from "../components/NAVChart";

import getListOfAllNAVsOfMutualFund from "../utils/listAllNAVs";

const Home = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const [navs, setNavs] = useState([]);

  useEffect(() => {
    async function getData() {
      const fetchData = await getListOfAllNAVsOfMutualFund("INF179KC1BV9");
      setNavs(fetchData.navs);
    }
    getData();
  }, []);

  return user ? (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  ) : (
    <div className="mt-52 flex h-screen flex-col items-center">
      <SearchBar />
      <NAVChart navs={navs} classNames={"mt-24"} />
    </div>
  );
};

export default Home;
