import { fetchData, parseCSV } from "../utils/fetchData.js";
import prisma from "../db_connect.js";
import addNewISIN, { reformatISIN } from "../utils/addNewMutualFund.js";
import updateNAV from "../utils/nav.js";
import fs from "fs";
import { correctTimezoneOffset } from "../utils/formatDate.js";
import { parseWeekDayDate } from "../utils/formatDate.js";

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
    // Steps:
    //  Parse the date from the query params
    //  If date is not passed, set date to today
    //  Check if today's NAV is already updated, if yes return with message
    //  If not, fetch today's mutual fund NAV data
    //  For all the scheme object in the data
    //  Check if the ISIN exists in the database
    //  If it does, update the latest NAV
    //  If not, add the ISIN to the database and update the latest NAV
    //  Return with a success message try {

    const { date: inputDate, month: inputMonth, year: inputYear } = req.query;

    let day, month, year, newDate;

    if (inputDate && inputMonth && inputYear) {
      [day, month, year] = parseWeekDayDate(
        new Date([inputYear, inputMonth, inputDate]),
      );
      newDate = correctTimezoneOffset(
        new Date(
          new Date([year, month, day]).setDate(
            new Date([year, month, day]).getDate() + 1,
          ),
        ),
      );
    } else {
      [day, month, year] = parseWeekDayDate();
    }

    // Checking if latest mutual fund data is fetched or not.

    if (!fs.existsSync(`temp/${day}_${month}_${year}.csv`)) {
      await fetchData(newDate);
    }

    // Parsing the fetched data
    const parsedCSVData = await parseCSV(newDate);

    // Updating the NAV for each scheme
    for (let scheme of parsedCSVData) {
      // Reformating ISIN to remove any non alphanumeric characters
      scheme = {
        ...scheme,
        ["ISIN Div Payout/ISIN Growth"]: reformatISIN(
          scheme["ISIN Div Payout/ISIN Growth"],
        ),
        ["ISIN Div Reinvestment"]: reformatISIN(
          scheme["ISIN Div Reinvestment"],
        ),
      };

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

      if (
        (!isinPayoutExist && scheme["ISIN Div Payout/ISIN Growth"] != "") ||
        (!isinReinvestExist && scheme["ISIN Div Reinvestment"] != "")
      ) {
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

const getAllMutualFunds = async (req, res) => {
  try {
    const mutualFundList = await prisma.iSIN.findMany({
      select: {
        isin: true,
        name: true,
      },
    });

    res.status(200).json(mutualFundList);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const getMutualFundNAVs = async (req, res) => {
  // Function requires mandoatory field ISIN id.
  //
  // Execution:
  // 1. Check if ISIN id is provided else return error.
  // 2. Check if ISIN id is correct, else return error.
  // 3. Fetch NAVs from table from date till today.

  try {
    const {
      isinId,
      week: deltaWeek,
      month: deltaMonth,
      year: deltaYear,
    } = req.query;

    console.log({ deltaWeek, deltaMonth, deltaYear });

    if (!isinId) {
      throw new Error("ISIN id is required.");
    }

    const isinCheck = await prisma.iSIN.findUnique({
      where: {
        isin: isinId,
      },
    });

    if (!isinCheck) {
      throw new Error("Invalid ISIN id provided");
    }

    const today = new Date();
    let deltaDate;

    if (deltaWeek) {
      deltaDate = new Date(today.setDate(today.getDate() - 7));
    }

    if (deltaMonth) {
      deltaDate = new Date(
        today.setMonth(today.getMonth() - parseInt(deltaMonth)),
      );
    }

    if (deltaYear) {
      deltaDate = new Date(
        today.setFullYear(today.getFullYear() - parseInt(deltaYear)),
      );
    }

    if (!deltaYear && !deltaMonth && !deltaWeek) {
      deltaDate = new Date(today.setDate(today.getDate() - 7));
    }

    const navList = await prisma.nAV.findMany({
      where: {
        AND: [
          { isin: isinId },
          {
            date: {
              gte: new Date(deltaDate),
            },
          },
        ],
      },
      orderBy: {
        date: "asc",
      },
    });

    res.status(200).json({ navs: navList });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export {
  updateMutualFundsList,
  updateLatestNAV,
  getAllMutualFunds,
  getMutualFundNAVs,
};
