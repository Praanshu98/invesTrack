import "../db_connect.js";
import prisma from "../db_connect.js";
import { correctTimezoneOffset } from "../utils/formatDate.js";

const invest = async (req, res) => {
  try {
    let { units } = req.body;
    const { userId, isinId, purchaseDate, amount } = req.body;

    // Check if all required fields are provided
    if (!userId || !isinId || !purchaseDate || (!units && !amount)) {
      return res.status(400).json({
        message: " Please provide all the required fields",
      });
    }

    // If units and amount both are provided return an error
    if (units && amount) {
      return res.status(400).json({
        message: "Please provide either units or amount",
      });
    }

    // Check if purchase date is not in future
    if (new Date(purchaseDate) > new Date()) {
      return res.status(400).json({
        message: "Purchase date cannot be in the future",
      });
    }

    // Check if units is a positive number
    if (units <= 0) {
      return res.status(400).json({
        message: "Units should be a positive number",
      });
    }

    // Check if amount is a positive number
    if (amount && amount <= 0) {
      return res.status(400).json({
        message: "Amount should be a positive number",
      });
    }

    // Format the purchase date
    const updatePurchaseDate = correctTimezoneOffset(purchaseDate);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the isin exists
    const isin = await prisma.iSIN.findUnique({
      where: {
        isin: isinId,
      },
    });

    if (!isin) {
      return res.status(404).json({
        message: "ISIN not found",
      });
    }

    // If amount is provided, calculate the units
    if (amount) {
      const nav = await prisma.nAV.findUnique({
        where: {
          isin_date: {
            isin: isinId,
            date: updatePurchaseDate,
          },
        },
      });

      if (!nav) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      units = amount / nav.nav;
    }

    // Add the investment
    const investment = await prisma.investments.create({
      data: {
        user_id: user.id,
        isin_id: isin.id,
        units,
        purchase_date: updatePurchaseDate,
      },
    });

    let userInvestments = await prisma.investments.findMany({
      where: {
        user_id: user.id,
        isin_id: isin.id,
      },
    });

    let totalUnits = userInvestments.reduce((totalUnits, units) => {
      return totalUnits + units.units;
    }, 0);

    return res.status(201).json({
      message: "Investment purchased successfully",
      totalUnits,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { invest };
