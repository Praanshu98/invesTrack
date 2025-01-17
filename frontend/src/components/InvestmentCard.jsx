const InvestmentCard = ({ name, units, nav, value, classNames }) => {
  function formatValue(value, currency = false) {
    let postfix = null;
    if (value / 10000000 >= 1) {
      value = value / 10000000;
      postfix = " Crores";
    }
    if (value / 100000 >= 1) {
      value = value / 100000;
      postfix = " Lakhs";
    }
    return `${new Intl.NumberFormat("en-IN", {
      // Conditionally providing values
      ...(currency && { currency: "INR", style: "currency" }),
      maximumFractionDigits: postfix ? 2 : 0,
      roundingMode: "trunc",
      trailingZeroDisplay: "stripIfInteger",
    }).format(value)} ${postfix ? postfix : ""}`;
  }

  return (
    <div
      className={`flex h-32 w-96 flex-col justify-between text-pretty rounded border-2 border-purssian-blue-200 bg-purssian-blue-700 p-3 ${classNames}`}
    >
      <p className=""> {name} </p>
      <div className="flex justify-between">
        <p className="place-content-center text-4xl">
          {formatValue(value, true)}
        </p>
        <div className="flex flex-col justify-between text-xs">
          <p>
            Units: <span className="text-base"> {formatValue(units)} </span>
          </p>
          <p>
            Nav: <span className="text-base"> {nav} </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
