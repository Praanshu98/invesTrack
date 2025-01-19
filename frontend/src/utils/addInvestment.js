export default async function addUserInvestment(
  userId,
  isinId,
  amount,
  purchaseDate,
  navigate,
) {
  const response = await fetch("api/v1/users/investment/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      isinId,
      amount,
      purchaseDate,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.totalUnits) navigate("/dashboard");
  return data;
}
