import prisma from "../db_connect.js";
import { correctTimezoneOffset } from "./formatDate.js";

const updateNAV = async (schemeObject) => {
  try {
    // Check if ISIN exists in database
    // If ISIN does not exist, throw error
    // If ISIN exists, update the latest NAV
    // Return with a success message

    const isinPayout = schemeObject["ISIN Div Payout/ISIN Growth"];
    const isinReinvest = schemeObject["ISIN Div Reinvestment"];

    if (!isinPayout && !isinReinvest) {
      throw new Error("ISIN does not exist");
    }

    const nav = schemeObject["Net Asset Value"] || null;
    let date = schemeObject["Date"] || null;
    const repurchasePrice = schemeObject["Repurchase Price"] || 0;
    const salePrice = schemeObject["Sale Price"] || 0;

    // If either nav, or date is not present throw error
    if (!nav || !date) {
      throw new Error("NAV or Date not present");
    }

    // Parse date to a valid format
    date = correctTimezoneOffset(date);

    // If ISIN of payout is present, update the NAV
    if (isinPayout) {
      const isinPayoutNAV = await prisma.NAV.create({
        data: {
          isin: isinPayout,
          nav: Number(nav),
          date: date,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
        },
      });
    }

    // If ISIN of reinvest is present, update the NAV
    if (isinReinvest) {
      const isinReinvestNAV = await prisma.NAV.create({
        data: {
          isin: isinReinvest,
          nav: Number(nav),
          date: date,
          repurchase_price: repurchasePrice,
          sale_price: salePrice,
        },
      });
    }

    return;
  } catch (error) {
    throw new Error(error);
  }
};

export default updateNAV;
