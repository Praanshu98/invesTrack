import Router from "express";

// Controller Imports
import {
  updateMutualFundsList,
  updateLatestNAV,
  getAllMutualFunds,
  getMutualFundNAVs,
} from "../controllers/mutualFund.controller.js";

const router = Router();

router.get("/admin/update-mutual-fund-list", updateMutualFundsList);
router.get("/admin/update-latest-nav", updateLatestNAV);
router.get("/list-all", getAllMutualFunds);
router.get("/mutual-fund-navs", getMutualFundNAVs);

export default router;
