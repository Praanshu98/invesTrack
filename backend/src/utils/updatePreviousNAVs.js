import prisma from "../db_connect.js";
import { parseWeekDayDate } from "./formatDate.js";

const addPreviousDates = async () => {
  try {
    const toUpdateDate = await prisma.date_scrapped.findMany({
      where: {
        status: false,
      },
      orderBy: {
        date: "desc",
      },
      skip: 0,
      take: 1,
    });

    console.log(toUpdateDate[0]);

    const [date, month, year] = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
      .format(toUpdateDate[0].date)
      .replace(",", "")
      .split(" ");

    console.log(date, month, year);

    const response = await fetch(
      `http://localhost:3000/api/v1/mutualfund/admin/update-latest-nav?date=${date}&month=${month}&year=${year}`,
    );

    console.log(response);

    if (response.status === 200) {
      await prisma.date_scrapped.update({
        where: {
          id: toUpdateDate[0].id,
        },
        data: {
          status: true,
        },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

addPreviousDates();

// for (let i = 0; i < 10; i++) {
//   await addPreviousDates();
// }
