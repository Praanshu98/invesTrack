export default async function sellUserInvestment(
  userId,
  isinId,
  amount,
  saleDate,
  navigate,
) {
  const response = await fetch("api/v1/users/investment/sell", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      isinId,
      amount,
      saleDate,
    }),
  });
  const data = await response.json();
  let error = false;
  if (response.status >= 400) {
    error = true;
  }
  if (data.totalUnits) navigate("/dashboard");
  return {
    ...data,
    error: error,
  };
}
