import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import CustomButton from "../components/customButtons";
import CustomInput from "../components/customInput";
import NAVChart from "../components/NAVChart";

import getListOfAllNAVsOfMutualFund from "../utils/listAllNAVs";
import formatDate from "../utils/formatDate";
import addUserInvestment from "../utils/addInvestment";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router";

export default function Buy() {
  const { user } = useUserContext();
  const [selectedMutualFund, setSelectedMutualFund] = useState(null);
  const [navs, setNavs] = useState([]);
  const [addInvestment, setAddInvestment] = useState(null);
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  // Get all navs for selected mutual fund.
  useEffect(() => {
    async function getData(isin) {
      const fetchData = await getListOfAllNAVsOfMutualFund(isin);
      setNavs(fetchData.navs);
    }
    if (selectedMutualFund) getData(selectedMutualFund.isin);
  }, [selectedMutualFund]);

  // Add new Investment
  useEffect(() => {
    if (!amount || !addInvestment) return;

    const response = addUserInvestment(
      user.id,
      addInvestment.isin,
      addInvestment.amount,
      date,
      navigate,
    );
  }, [addInvestment]);

  return (
    <div className="mt-14 flex h-screen flex-col items-center gap-4">
      <SearchBar setSelectedMutualFund={setSelectedMutualFund} />
      {selectedMutualFund && (
        <div className="flex w-full flex-col items-center">
          <div>
            <CustomInput
              placeholderText={"Amount"}
              inputType={"number"}
              classNames={"text-xl onScroll"}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              value={amount}
              min={0}
            />
            <CustomInput
              inputType={"date"}
              onFocus={(event) => {
                event.target.showPicker();
              }}
              classNames={"text-xl"}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <CustomButton
              customValue={"Add"}
              className={"h-12 w-16 p-3"}
              onClick={() => {
                if (!amount) return alert("Please add amount greater than 0");

                let formatedDate = formatDate(date || new Date());
                setDate(Object.values(formatedDate).join("-"));

                setAddInvestment({
                  isin: selectedMutualFund.isin,
                  date,
                  amount: parseInt(amount),
                });
              }}
            />
          </div>
          <NAVChart
            selectedMutualFund={selectedMutualFund}
            navs={navs}
            classNames={"mt-24"}
          />
        </div>
      )}
    </div>
  );
}
