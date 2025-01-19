import { correctTimezoneOffset } from "./formatDate.js";

export default async function fetchLatestNAV() {
  const today = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(correctTimezoneOffset(new Date()));

  console.log(` ============= Updating NAVs for ${today} =============`);

  const response = await fetch(
    "http://localhost:3000/api/v1/mutualfund/admin/update-latest-nav",
  );

  if (response.status === 200) {
    console.log(
      ` ============= Successfully updated NAVs for ${today} =============`,
    );
  } else {
    console.log(
      ` ============= Error while updating NAVs for ${today} ============= \n`,
      response,
    );
  }
}
