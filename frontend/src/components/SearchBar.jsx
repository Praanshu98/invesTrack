import { useEffect, useState } from "react";
import getListOfAllMutualFunds from "../utils/listAllMutualfunds";

const SearchBar = () => {
  const [mutualFundList, setMutualFundList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAllMutualFunds() {
      const data = await getListOfAllMutualFunds();
      setMutualFundList(data);
    }

    getAllMutualFunds();
  }, []);

  const filteredMutualFunds = mutualFundList?.filter((mutualFund) => {
    return (
      searchTerm.length > 3 &&
      mutualFund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  console.log("filteredMutualFunds => ", filteredMutualFunds);

  return (
    <div className="w-3/4 md:w-4/5">
      {/* Search Input */}
      <input
        type="text"
        className={`focus:shadow-outline h-16 w-full rounded-xl border-none bg-purssian-blue-400 px-5 text-xl shadow-none outline-none placeholder:font-light placeholder:text-slate-400 focus:outline-none focus:outline-transparent focus:ring-transparent md:text-2xl ${filteredMutualFunds?.length > 0 ? "rounded-b-none" : ""}`}
        placeholder="Search Mutual Funds"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          console.log(searchTerm);
        }}
      />
      {/* Search Result */}
      {filteredMutualFunds?.length != 0 ? (
        <div className="truncate rounded-b-xl bg-purssian-blue-200 text-slate-100">
          <ul className="max-h-52 overflow-y-auto py-2 text-lg font-light">
            {filteredMutualFunds?.map((mutualFund) => (
              <div key={mutualFund.isin} className="mx-5 truncate py-1">
                <li>{mutualFund.name}</li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
