export default async function getListOfAllNAVsOfMutualFund(isinId) {
  const response = await fetch(
    `api/v1/mutualfund/mutual-fund-navs?isinId=${isinId}`,
  );
  const data = await response.json();
  return data;
}
