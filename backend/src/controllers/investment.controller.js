import "../db_connect.js";
import prisma from "../db_connect.js";
import { correctTimezoneOffset, getDayMonthYear } from "../utils/formatDate.js";

const buyMutualFund = async (req, res) => {
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

/*

Expected functionality:
- Sell mutual fund with units
- Sell mutual fund with amount
- Accept either units or amount
- Accept sale date of the current date or past date
- If successfully sold, return the remaining amount of units
*/

const sellMutualFund = async (req, res) => {
  try {
    let { units } = req.body;
    const { userId, isinId, saleDate, amount } = req.body;

    // Check if all required fields are provided
    if (!userId || !isinId || !saleDate || (!units && !amount)) {
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
    if (new Date(saleDate) > new Date()) {
      return res.status(400).json({
        message: "Sell date cannot be in the future",
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

    // Format the sale date
    let updateSellDate = correctTimezoneOffset(saleDate);

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
        id: isinId,
      },
    });

    console.log("new isin => ", isin);

    if (!isin) {
      return res.status(404).json({
        message: "ISIN not found",
      });
    }

    // Check if date is same or in future of the first investment of the mutual fund.
    let userInvestments = await prisma.investments.findMany({
      where: {
        user_id: user.id,
        isin_id: isin.id,
      },
      orderBy: {
        purchase_date: "asc",
      },
      include: {
        isin: true,
      },
    });

    console.log("user Investment from backend => ", userInvestments);

    const firstInvestmentDate = userInvestments[0].purchase_date;

    console.log({
      firstInvestmentDate,
      updateSellDate,
    });

    if (firstInvestmentDate >= updateSellDate) {
      return res.status(400).json({
        message: "Sale date can not be less than purchase date",
      });
    }

    console.log(userInvestments[0].isin.isin);

    // If amount is provided, calculate the units
    if (amount) {
      let nav = await prisma.nAV.findUnique({
        where: {
          isin_date: {
            isin: userInvestments[0].isin.isin,
            date: updateSellDate,
          },
        },
      });

      console.log("Amount => ", nav);

      if (!nav) {
        return res.status(404).json({
          message:
            "NAV not available for the sell date, please try again for a different date",
        });
      }

      units = amount / nav.nav;
    }

    let totalUnits = userInvestments.reduce((totalUnits, units) => {
      return totalUnits + units.units;
    }, 0);

    if (totalUnits < units) {
      return res.status(400).json({
        message: "You do not have enough units to sell",
      });
    }

    // Sell the investment
    const investment = await prisma.investments.create({
      data: {
        user_id: user.id,
        isin_id: isin.id,
        units: -units,
        sale_date: updateSellDate,
      },
    });

    userInvestments = await prisma.investments.findMany({
      where: {
        user_id: user.id,
        isin_id: isin.id,
      },
    });

    totalUnits = userInvestments.reduce((totalUnits, units) => {
      return totalUnits + units.units;
    }, 0);

    return res.status(201).json({
      message: "Investment sold successfully",
      totalUnits,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*

Expected functionality:
- Get all investments of the user
- Return a list of all the investments of the user.

*/

const getAllInvestment = async (req, res) => {
  const { userId } = req.query;

  // Check if all required fields are provided
  if (!userId) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Get all investments of the user
  const investments = await prisma.investments.groupBy({
    by: ["isin_id"],
    where: {
      user_id: parseInt(userId),
    },
    _sum: {
      units: true,
    },
  });

  // List out all the user investments
  let userInvestments = [];

  for (const investment of investments) {
    let latestNAV = await prisma.nAV.findMany({
      where: {
        isin_id: {
          id: investment.isin_id,
        },
      },
      orderBy: {
        date: "desc",
      },
      include: {
        isin_id: true,
      },
      take: 1,
    });

    userInvestments.push({
      isin_id: investment.isin_id,
      name: latestNAV[0].isin_id.name,
      units: Math.round(investment._sum.units),
      nav: Math.round(latestNAV[0].nav),
      value: Math.round(investment._sum.units * latestNAV[0].nav),
    });
  }

  return res.status(200).json(userInvestments);
};

export { buyMutualFund, sellMutualFund, getAllInvestment };
