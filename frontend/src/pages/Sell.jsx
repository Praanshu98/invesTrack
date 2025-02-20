import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import InvestmentCard from "../components/InvestmentCard";
import CustomInput from "../components/customInput";
import CustomButton from "../components/customButtons";

import getUserInvestments from "../utils/getUserInvestments";
import sellUserInvestment from "../utils/sellInvestment";
import formatDate from "../utils/formatDate";

export default function Sell() {
  const { user } = useUserContext();
  const [userInvestments, setUserInvestments] = useState([]);
  const [inputs, setInputs] = useState({});
  const [sellInvestment, setSellInvestment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getInvestments() {
      const userInvestmentList = await getUserInvestments(user.id);
      setUserInvestments(userInvestmentList);
    }
    getInvestments();
  }, []);

  useEffect(() => {
    if (!sellInvestment) return;

    async function sell() {
      const response = await sellUserInvestment(
        user.id,
        sellInvestment.isin,
        sellInvestment.amount,
        sellInvestment.date,
        navigate,
      );

      console.log(response);

      if (response.error) {
        console.log("error");
        alert(response.message);
        window.location.reload();
      }
    }

    sell();
  }, [sellInvestment]);

  return (
    <div className="m-5 flex flex-col">
      <div className="mt-5 flex flex-wrap gap-4">
        {userInvestments.map((investment) => {
          return (
            <div key={investment.isin_id}>
              <InvestmentCard {...investment} />
              <div className="flex gap-2">
                <CustomInput
                  placeholderText={"Amount"}
                  inputType={"number"}
                  classNames={"text-lg onScroll w-28 mx-1"}
                  value={
                    (inputs[investment.isin_id] &&
                      inputs[investment.isin_id].amount) ||
                    ""
                  }
                  onChange={(event) => {
                    setInputs((prev) => ({
                      ...prev,
                      [investment.isin_id]: {
                        ...prev[investment.isin_id],
                        amount: event.target.value,
                      },
                    }));
                  }}
                  min={0}
                />
                <CustomInput
                  inputType={"date"}
                  classNames={"text-xl w-40 mx-1"}
                  value={
                    (inputs[investment.isin_id] &&
                      inputs[investment.isin_id].date) ||
                    ""
                  }
                  onFocus={(event) => {
                    event.target.showPicker();
                  }}
                  onChange={(event) => {
                    setInputs((prev) => ({
                      ...prev,
                      [investment.isin_id]: {
                        ...prev[investment.isin_id],
                        date: event.target.value,
                      },
                    }));
                  }}
                />
                <CustomButton
                  customValue={"Sell"}
                  className={"mx-1 h-12 w-16 p-3"}
                  onClick={() => {
                    const investmentInputs = inputs[investment.isin_id] || {};
                    const amount = parseInt(investmentInputs.amount);
                    const date = investmentInputs.date;

                    if (!amount || amount <= 0) {
                      return alert("Please add amount greater than 0");
                    }

                    const formatedDate = formatDate(
                      date || new Date().setDate(new Date().getDate() - 1),
                    );
                    const formattedDateStr =
                      Object.values(formatedDate).join("-");

                    setSellInvestment({
                      isin: investment.isin_id,
                      date: formattedDateStr,
                      amount,
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
