import prisma from "../db_connect.js";

const addNewISIN = async (schemeObject) => {
  try {
    // Check if ISIN exists in database
    let ISINPayout, ISINReinvest;

    schemeObject["ISIN Div Payout/ISIN Growth"] != ""
      ? (ISINPayout = await prisma.ISIN.findUnique({
          where: {
            isin: schemeObject["ISIN Div Payout/ISIN Growth"],
          },
        }))
      : null;

    schemeObject["ISIN Div Reinvestment"] != ""
      ? (ISINReinvest = await prisma.ISIN.findUnique({
          where: {
            isin: schemeObject["ISIN Div Reinvestment"],
          },
        }))
      : null;

    // If ISIN exist in database, throw error
    if (ISINPayout && ISINReinvest) {
      return;
    }

    // Get return type of scheme
    let schemeReturnType = schemeObject["Scheme Name"]
      .toLowerCase()
      .replace("-", " ")
      .split(" ");

    let ISINPayoutReturnType, isisReinvestReturnType;

    if (!ISINPayout) {
      if (schemeReturnType.includes("dividend")) {
        schemeReturnType = "dividend-payout";
      } else if (schemeReturnType.includes("growth")) {
        schemeReturnType = "growth";
      } else {
        schemeReturnType = "Not Found";
      }
      ISINPayoutReturnType = await getReturnType(schemeReturnType);
    }
    if (!ISINReinvest) {
      schemeReturnType = "dividend-reinvestment";
      isisReinvestReturnType = await getReturnType(schemeReturnType);
    }

    // Get plan type of scheme
    let schemePlanType = schemeObject["Scheme Name"]
      .toLowerCase()
      .replace("-", " ")
      .split(" ");

    if (schemePlanType.includes("direct")) {
      schemePlanType = "direct";
    } else if (schemePlanType.includes("regular")) {
      schemePlanType = "regular";
    } else {
      schemePlanType = "Not Found";
    }

    const planType = await getPlanType(schemePlanType);

    // Get scheme id from schemeObject
    const inputSchemeId = schemeObject["Scheme Code"];

    const scheme = await getScheme(inputSchemeId);
    const schemeCode = scheme.code;

    // Add new ISIN
    const newISINs = [];

    !ISINPayout && schemeObject["ISIN Div Payout/ISIN Growth"].length > 0
      ? newISINs.push(
          await prisma.ISIN.create({
            data: {
              isin: schemeObject["ISIN Div Payout/ISIN Growth"],
              name: schemeObject["Scheme Name"],
              plan_type: parseInt(planType.id) || 0,
              return_type: parseInt(ISINPayoutReturnType.id) || 0,
              scheme_id: schemeCode || 0,
            },
          }),
        )
      : null;

    !ISINReinvest && schemeObject["ISIN Div Reinvestment"].length > 0
      ? newISINs.push(
          await prisma.ISIN.create({
            data: {
              isin: schemeObject["ISIN Div Reinvestment"],
              name: schemeObject["Scheme Name"],
              plan_type: parseInt(planType.id) || 0,
              return_type: parseInt(isisReinvestReturnType.id) || 0,
              scheme_id: schemeCode || 0,
            },
          }),
        )
      : null;

    return newISINs;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};

const getReturnType = async (returnTypeInput) => {
  try {
    // Check and add return type to database
    const returnType = await prisma.return_type.upsert({
      where: { name: returnTypeInput },
      update: {}, // No updates needed, only ensure existence
      create: {
        name: returnTypeInput,
      },
    });

    return returnType;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};

const getPlanType = async (planTypeInput) => {
  try {
    // Check and add plan type to database
    const planType = await prisma.plan_type.upsert({
      where: {
        name: planTypeInput,
      },
      update: {}, // No updates needed, only ensure existence
      create: {
        name: planTypeInput,
      },
    });

    return planType;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};

const getScheme = async (schemeCodeInput) => {
  try {
    // Check if scheme exists in database
    const scheme = await prisma.scheme.findUnique({
      where: {
        code: parseInt(schemeCodeInput),
      },
    });

    // If scheme does not exist in database, add new scheme
    let newScheme;
    if (!scheme) {
      newScheme = await prisma.scheme.create({
        data: {
          code: parseInt(schemeCodeInput),
        },
      });
    }

    return scheme ? scheme : newScheme;
  } catch (error) {
    // Handle error
    throw new Error(error);
  }
};

export default addNewISIN;
export { getScheme, getReturnType, getPlanType };
