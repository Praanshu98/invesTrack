import fs from "fs";
import csv from "csv-parser";
import { parseWeekDayDate } from "./formatDate.js";

const fetchData = async (date) => {
  try {
    let day, month, year;
    if (!date) {
      [day, month, year] = parseWeekDayDate();
    } else {
      [day, month, year] = parseWeekDayDate(new Date(date));
    }
    // Check if file exists (ie, data has already been fetched)
    if (fs.existsSync(`temp/${day}_${month}_${year}.csv`)) {
      return;
    }

    // Fetch data from AMFI
    const rawData = await fetch(
      `https://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?frmdt=${day}-${month}-${year}`,
    ).then(async (response) => await response.text());

    // Write data to a CSV file
    fs.writeFileSync(`temp/${day}_${month}_${year}.csv`, rawData);
  } catch (error) {
    throw new Error(error);
  }
};

const parseCSV = async (date) => {
  return new Promise((resolve, rejects) => {
    try {
      let day, month, year;
      if (!date) {
        [day, month, year] = parseWeekDayDate();
      } else {
        [day, month, year] = parseWeekDayDate(new Date(date));
      }
      const csvData = [];

      // Parse CSV file
      fs.createReadStream(`temp/${day}_${month}_${year}.csv`)
        .pipe(
          csv({
            separator: ";",
          }),
        )
        .on("data", (data) => {
          if (Object.keys(data).length > 1) {
            csvData.push(data);
          }
        })
        .on("end", () => {
          resolve(csvData);
        });
    } catch (error) {
      console.log(`========== Error parsing CSV ==========`);
      rejects(error);
    }
  });
};

export { fetchData, parseCSV };
