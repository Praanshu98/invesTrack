import { useEffect, useState } from "react";
import getListOfAllMutualFunds from "../utils/listAllMutualfunds";

const SearchBar = () => {
  const [mutualFundList, setMutualFundList] = useState(null);

  useEffect(() => {
    async function getAllMutualFunds() {
      const data = await getListOfAllMutualFunds();
      setMutualFundList(data);
    }

    getAllMutualFunds();
  }, []);

  console.log("mutualFundList => ", mutualFundList);

  return (
    <div className="w-3/4 md:w-4/5">
      {/* Search Input */}
      <input
        type="text"
        className="h-16 w-full rounded-xl rounded-b-none bg-purssian-blue-400 px-5 text-xl placeholder:font-light placeholder:text-slate-400 md:text-2xl"
        placeholder="Search Mutual Funds"
      />
      {/* Search Result */}
      {mutualFundList ? (
        <div className="truncate rounded-b-xl bg-purssian-blue-200 py-2 text-slate-100">
          <ul className="max-h-52 overflow-y-auto text-lg font-light">
            {mutualFundList.map((mutualFund) => (
              <div key={mutualFund.isin} className="truncate px-5 py-1">
                <li>{mutualFund.name}</li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <h2> Loading... </h2>
      )}
    </div>
  );
};

export default SearchBar;
