import Router from "express";

// Controller Imports
import {
  updateMutualFundsList,
  updateLatestNAV,
} from "../controllers/mutualFund.controller.js";

const router = Router();

router.get("/admin/update-mutual-fund-list", updateMutualFundsList);
router.get("/admin/update-latest-nav", updateLatestNAV);

export default router;
