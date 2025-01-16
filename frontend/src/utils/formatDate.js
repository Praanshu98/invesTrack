const formatDate = (date) => {
  const [month, day, year] = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
    .format(new Date(date))
    .replace(",", "")
    .split(" ");
  return { day, month, year };
};

export default formatDate;
