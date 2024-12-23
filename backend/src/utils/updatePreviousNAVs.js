import prisma from "../db_connect.js";
import { parseWeekDayDate } from "./formatDate.js";

const addPreviousDates = async () => {
  try {
    const toUpdateDate = await prisma.date_Scrapped.findMany({
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

    const [date, month, year] = parseWeekDayDate(toUpdateDate[0].date);

    const response = await fetch(
      `http://localhost:3000/api/v1/mutualfund/admin/update-latest-nav?date=${Number(date) + 1}&month=${month}&year=${year}`,
    );

    console.log(response);

    if (response.status === 200) {
      await prisma.date_Scrapped.update({
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

// addPreviousDates();

for (let i = 0; i < 10; i++) {
  await addPreviousDates();
}
