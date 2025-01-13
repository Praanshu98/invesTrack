const SearchBar = () => {
  return (
    <div className="w-3/4 md:w-4/5">
      {/* Search Input */}
      <input
        type="text"
        className="h-16 w-full rounded-xl rounded-b-none bg-purssian-blue-400 px-5 text-xl placeholder:font-light placeholder:text-slate-400 md:text-2xl"
        placeholder="Search Mutual Funds"
      />

      {/* Search Result */}
      <div className="truncate rounded-b-xl bg-purssian-blue-200 py-2 text-slate-100">
        <ul className="text-lg font-light">
          <div className="truncate px-5 py-1">
            <li>Fund 1</li>
          </div>
          <div className="ml-5 mr-2 truncate py-1">
            <li>
              Fund 2 Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund
              Fund Fund Fund Fund
            </li>
          </div>
          <div className="truncate px-5 py-1">
            <li>Fund 3</li>
          </div>
          <div className="ml-5 mr-2 truncate py-1">
            <li>
              Fund 4 Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund Fund
              Fund Fund Fund Fund
            </li>
          </div>
          <div className="truncate px-5 py-1">
            <li>Fund 5</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
