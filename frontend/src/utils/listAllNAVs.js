export default async function getListOfAllNAVsOfMutualFund(
  isinId,
  week = "",
  month = "",
  year = "",
) {
  const response = await fetch(
    `api/v1/mutualfund/mutual-fund-navs?isinId=${isinId}&week=${week}&month=${month}&year=${year}`,
  );
  const data = await response.json();
  return data;
}
