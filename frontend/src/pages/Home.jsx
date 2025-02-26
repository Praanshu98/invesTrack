import { useUserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import NAVChart from "../components/NAVChart";

import getListOfAllNAVsOfMutualFund from "../utils/listAllNAVs";

import login from "../utils/login";

const Home = () => {
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const [navs, setNavs] = useState([]);
  const [selectedMutualFund, setSelectedMutualFund] = useState(null);
  const [timeDuration, setTimeDuration] = useState({
    week: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    async function getData(isin, timeDuration) {
      const { week, month, year } = timeDuration;
      const fetchData = await getListOfAllNAVsOfMutualFund(
        isin,
        week,
        month,
        year,
      );
      setNavs(fetchData.navs);
    }
    if (selectedMutualFund) getData(selectedMutualFund.isin, timeDuration);
  }, [selectedMutualFund, timeDuration]);

  useEffect(() => {
    if (!user) {
      login({ email: "test@user.com", password: "Abc@123" })
        .then(async (response) => {
          if (response.status === 200) {
            const user = await response.json();
            setUser(user.user);
            localStorage.setItem("user", JSON.stringify(user.user));
            Navigate("/dashboard");
          }
        })
        .catch((error) => {
          console.log("error => ", error);
        });
    }
  }, []);

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
          setTimeDuration={setTimeDuration}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
