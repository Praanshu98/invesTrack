import prisma from "../db_connect.js";
import { parseWeekDayDate, correctTimezoneOffset } from "./formatDate.js";

const dataToFetch = [];
const numberOfDays = (year, month) => new Date(year, month, 0).getDate();

for (let year = 2007; year <= 2024; year++) {
  for (let month = 1; month <= 12; month++) {
    for (let day = 0; day < numberOfDays(year, month); day++) {
      const date = parseWeekDayDate(new Date([year, month, Number(day) + 1]));
      dataToFetch.push(date.join("-"));

      const createdDate = await prisma.date_scrapped.upsert({
        where: {
          date: correctTimezoneOffset(new Date(date)),
        },
        update: {},
        create: {
          date: correctTimezoneOffset(new Date(date)),
        },
      });
    }
  }
}
