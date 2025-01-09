import prisma from "../db_connect.js";
import { correctTimezoneOffset } from "./formatDate.js";
import { reformatISIN } from "./addNewMutualFund.js";

const updateNAV = async (schemeObject) => {
  try {
    // Check if ISIN exists in database
    // If ISIN does not exist, throw error
    // If ISIN exists, update the latest NAV
    // Return with a success message

    // Reformating ISIN to remove any non alphanumeric characters
    schemeObject = {
      ...schemeObject,
      ["ISIN Div Payout/ISIN Growth"]: reformatISIN(
        schemeObject["ISIN Div Payout/ISIN Growth"],
      ),
      ["ISIN Div Reinvestment"]: reformatISIN(
        schemeObject["ISIN Div Reinvestment"],
      ),
    };

    const isinPayout = schemeObject["ISIN Div Payout/ISIN Growth"];
    const isinReinvest = schemeObject["ISIN Div Reinvestment"];

    if (!isinPayout && !isinReinvest) {
      throw new Error("ISIN does not exist");
    }

    // NAV can be zero or greater but not null or empty string
    const nav =
      parseFloat(schemeObject["Net Asset Value"]) >= 0
        ? parseFloat(schemeObject["Net Asset Value"])
        : null;
    let date = schemeObject["Date"] || null;
    const repurchasePrice = parseFloat(schemeObject["Repurchase Price"]) || 0;
    const salePrice = parseFloat(schemeObject["Sale Price"]) || 0;

    // If either nav, or date is not present throw error
    if (nav === null || date === null) {
      await prisma.error_nav_entries.upsert({
        where: {
          isin_payout_isin_reinvest_date: {
            isin_payout: isinPayout,
            isin_reinvest: isinReinvest,
            date: date,
          },
        },
        update: {
          scheme_code: schemeObject["Scheme Code"],
          scheme_name: schemeObject["Scheme Name"],
          isin_payout: isinPayout,
          isin_reinvest: isinReinvest,
          nav: schemeObject["Net Asset Value"],
          repurchase_price: schemeObject["Repurchase Price"],
          sale_price: schemeObject["Sale Price"],
          date: date,
        },
        create: {
          scheme_code: schemeObject["Scheme Code"],
          scheme_name: schemeObject["Scheme Name"],
          isin_payout: isinPayout,
          isin_reinvest: isinReinvest,
          nav: schemeObject["Net Asset Value"],
          repurchase_price: schemeObject["Repurchase Price"],
          sale_price: schemeObject["Sale Price"],
          date: date,
        },
      });
      console.log("Skipping ==> ", schemeObject);
      return;
    }

    // Parse date to a valid format
    date = correctTimezoneOffset(date);

    // If ISIN of payout is present, update the NAV
    if (isinPayout) {
      const isinPayoutNAV = await prisma.NAV.upsert({
        where: {
          isin_date: {
            isin: isinPayout,
            date: date,
          },
        },
        update: {
          nav: nav,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
        },
        create: {
          nav: nav,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
          date: date,
          isin_id: {
            connect: {
              isin: isinPayout,
            },
          },
        },
      });
    }

    // If ISIN of reinvest is present, update the NAV
    if (isinReinvest) {
      const isinReinvestNAV = await prisma.NAV.upsert({
        where: {
          isin_date: {
            isin: isinReinvest,
            date: date,
          },
        },
        update: {
          nav: nav,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
        },
        create: {
          nav: nav,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
          date: date,
          isin_id: {
            connect: {
              isin: isinReinvest,
            },
          },
        },
      });
    }

    return;
  } catch (error) {
    console.error("Error while Inserting/Updating NAV ==> \n", error);
    throw new Error(error);
  }
};

export default updateNAV;
