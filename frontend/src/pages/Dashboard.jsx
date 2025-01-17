import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";

import InvestmentCard from "../components/InvestmentCard";

import greetings from "../utils/greetings";
import getUserInvestments from "../utils/getUserInvestments";

const Dashboard = () => {
  const { user } = useUserContext();
  const [userInvestments, setUserInvestments] = useState([]);
  useEffect(() => {
    async function getInvestments() {
      const userInvestmentList = await getUserInvestments(user.id);
      setUserInvestments(userInvestmentList);
    }
    getInvestments();
  }, []);

  return (
    <div className="m-5 flex flex-col">
      <p className="mt-5 text-2xl font-bold">
        {greetings()} {user.firstName}
      </p>
      <div className="mt-5 flex flex-wrap gap-4">
        {userInvestments.map((investment) => {
          return <InvestmentCard key={investment.isin_id} {...investment} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
