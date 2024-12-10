import { fetchData, parseCSV } from "../utils/fetchData.js";
import prisma from "../db_connect.js";
import addNewISIN from "../utils/addNewMutualFund.js";

const updateMutualFundsList = async (req, res) => {
  try {
    // Get today's Mutual Funds List
    await fetchData(new Date());
    const parsedCSVData = await parseCSV(new Date());

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

export { updateMutualFundsList };
