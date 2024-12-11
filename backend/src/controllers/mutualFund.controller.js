import { fetchData, parseCSV } from "../utils/fetchData.js";
import prisma from "../db_connect.js";
import addNewISIN from "../utils/addNewMutualFund.js";
import updateNAV from "../utils/nav.js";
import fs from "fs";
import { correctTimezoneOffset } from "../utils/formatDate.js";

const updateMutualFundsList = async (req, res) => {
  try {
    const [day, month, year] = parseWeekDayDate();

    // Checking if latest mutual fund data is fetched or not.
    if (!fs.existsSync(`temp/${day}_${month}_${year}.csv`)) {
      await fetchData();
    }

    // Parsing the fetched data
    const parsedCSVData = await parseCSV();

    for (let scheme of parsedCSVData) {
      await addNewISIN(scheme);
    }

    return res.status(200).json({
      message: "Mutual Funds List updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating Mutual Funds List",
      error: error.message,
    });
  }
};

const updateLatestNAV = async (req, res) => {
  try {
    // 1. Check if today's NAV is already updated, if yes return with message
    // 2. If not, fetch today's mutual fund NAV data
    // 3. For all the scheme object in the data
    // 4. Check if the ISIN exists in the database
    // 5. If it does, update the latest NAV
    // 6. If not, add the ISIN to the database and update the latest NAV
    // 7. Return with a success message try {

    const [day, month, year] = parseWeekDayDate();

    const latestDate = correctTimezoneOffset(new Date([year, month, day]));
    console.log(latestDate);

    // Checking if today's nav is already updated
    const todayNAVExist = await prisma.NAV.findMany({
      where: {
        date: latestDate,
      },
    });

    console.log(todayNAVExist);
    if (todayNAVExist.length > 0) {
      return res.status(200).json({
        message: "Latest NAV are already updated",
        todayNAVExist,
      });
    }

    // Checking if latest mutual fund data is fetched or not.
    if (!fs.existsSync(`temp/${day}_${month}_${year}.csv`)) {
      await fetchData();
    }

    // Parsing the fetched data
    const parsedCSVData = await parseCSV();

    // Updating the NAV for each scheme
    for (let scheme of parsedCSVData) {
      // Check if ISIN exists in database, if not add new ISIN

      if (
        !scheme["ISIN Div Payout/ISIN Growth"] &&
        !scheme["ISIN Div Reinvestment"]
      ) {
        continue;
      }

      const isinPayoutExist = await prisma.ISIN.findUnique({
        where: {
          isin: scheme["ISIN Div Payout/ISIN Growth"],
        },
      });

      const isinReinvestExist = await prisma.ISIN.findUnique({
        where: {
          isin: scheme["ISIN Div Reinvestment"],
        },
      });

      if (!isinPayoutExist || !isinReinvestExist) {
        console.log(
          "Adding new ISIN ",
          scheme["ISIN Div Payout/ISIN Growth"]
            ? scheme["ISIN Div Payout/ISIN Growth"]
            : scheme["ISIN Div Reinvestment"],
        );
        await addNewISIN(scheme);
      }

      // Update NAV
      await updateNAV(scheme);
    }

    return res.status(200).json({
      message: "NAV updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating NAV",
      error: error.message,
    });
  }
};

export { updateMutualFundsList, updateLatestNAV };
