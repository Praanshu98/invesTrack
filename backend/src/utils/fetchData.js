import fs from "fs";
import csv from "csv-parser";

const parseWeekDayDate = (date) => {
  // If date is not passed set date to today
  try {
    if (!date) {
      date = new Date();
    }

    // If day is Sunday or Monday, set date to a day or two prior respectively
    const weekday = Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);

    if (weekday === "Sun") {
      date.setDate(date.getDate() - 1);
    } else if (weekday === "Mon") {
      date.setDate(date.getDate() - 2);
    }

    // Set date to a day prior since NAV's are available for the previous day
    date.setDate(date.getDate() - 1);

    // Adjust time offset to UTC
    date.setTime(date.getTime() + date.getTimezoneOffset() * -1 * 60 * 1000);

    const [month, day, year] = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
      .format(date)
      .replace(",", "")
      .split(" ");

    return [day, month, year];
  } catch (error) {
    throw new Error(error);
  }
};

const fetchData = async (date) => {
  try {
    const [day, month, year] = parseWeekDayDate(date);

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
      const [day, month, year] = parseWeekDayDate(date);
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
