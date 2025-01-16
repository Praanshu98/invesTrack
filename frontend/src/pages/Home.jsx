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
  const [selectedMutualFund, setSelectedMutualFund] = useState(null);

  useEffect(() => {
    async function getData(isin) {
      const fetchData = await getListOfAllNAVsOfMutualFund(isin);
      setNavs(fetchData.navs);
    }
    if (selectedMutualFund) getData(selectedMutualFund.isin);
  }, [selectedMutualFund]);

  return user ? (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  ) : (
    <div className="mt-24 flex h-screen flex-col items-center">
      <SearchBar setSelectedMutualFund={setSelectedMutualFund} />
      {selectedMutualFund ? (
        <NAVChart
          selectedMutualFund={selectedMutualFund}
          navs={navs}
          classNames={"mt-24"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
