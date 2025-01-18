import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import CustomButton from "../components/customButtons";
import CustomInput from "../components/customInput";
import NAVChart from "../components/NAVChart";

import getListOfAllNAVsOfMutualFund from "../utils/listAllNAVs";

export default function Buy() {
  const [selectedMutualFund, setSelectedMutualFund] = useState(null);
  const [navs, setNavs] = useState([]);

  useEffect(() => {
    async function getData(isin) {
      const fetchData = await getListOfAllNAVsOfMutualFund(isin);
      setNavs(fetchData.navs);
    }
    if (selectedMutualFund) getData(selectedMutualFund.isin);
  }, [selectedMutualFund]);

  return (
    <div className="mt-24 flex h-screen flex-col items-center gap-4">
      <SearchBar setSelectedMutualFund={setSelectedMutualFund} />
      {selectedMutualFund && (
        <div className="flex w-full flex-col items-center">
          <div>
            <CustomInput inputType={"date"} />
            <CustomButton customValue={"Add"} className={"h-12 w-16 p-3"} />
          </div>
          <NAVChart
            selectedMutualFund={selectedMutualFund}
            navs={navs}
            classNames={"mt-24"}
          />{" "}
        </div>
      )}
    </div>
  );
}
