import { useEffect, useState } from "react";
import getListOfAllMutualFunds from "../utils/listAllMutualfunds";

const SearchBar = ({ setSelectedMutualFund }) => {
  const [mutualFundList, setMutualFundList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMutualFunds, setfilteredMutualFunds] = useState([]);

  useEffect(() => {
    async function getAllMutualFunds() {
      const data = await getListOfAllMutualFunds();
      setMutualFundList(data);
    }

    getAllMutualFunds();
  }, []);

  const filteredList = mutualFundList.filter((mutualFund) => {
    return (
      searchTerm.length > 2 &&
      mutualFund.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    setfilteredMutualFunds(filteredList);
  }, [searchTerm]);

  return (
    <div className="w-3/4 md:w-4/5">
      {/* Search Input */}
      <input
        type="text"
        className={`focus:shadow-outline h-16 w-full rounded-xl border-none bg-purssian-blue-400 px-5 text-xl shadow-none outline-none placeholder:font-light placeholder:text-slate-400 focus:outline-none focus:outline-transparent focus:ring-transparent md:text-2xl ${filteredMutualFunds?.length !== 0 ? "rounded-b-none" : ""}`}
        placeholder="Search Mutual Funds"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        value={searchTerm}
      />
      {/* Search Result */}
      {filteredMutualFunds.length !== 0 ? (
        <ul className="max-h-52 overflow-y-auto rounded-b-xl bg-purssian-blue-200 py-2 text-lg font-light text-slate-100">
          {filteredMutualFunds.map((mutualFund) => (
            <li
              key={mutualFund.isin}
              className="mx-5 truncate py-1"
              onClick={() => {
                setSearchTerm("");
                setfilteredMutualFunds([]);
                setSelectedMutualFund(mutualFund);
              }}
            >
              {mutualFund.name}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
