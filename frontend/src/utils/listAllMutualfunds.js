export default async function getListOfAllMutualFunds() {
  const response = await fetch("api/v1/mutualfund/list-all");
  const data = await response.json();
  return data;
}
