export default async function getUserInvestments(userId) {
  const response = await fetch(`api/v1/users/investment/?userId=${userId}`);
  const data = await response.json();
  return data;
}
