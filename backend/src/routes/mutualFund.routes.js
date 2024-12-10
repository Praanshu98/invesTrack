import Router from "express";

// Controller Imports
import { updateMutualFundsList } from "../controllers/mutualFund.controller.js";

const router = Router();

router.get("/admin/update-mutual-fund-list", updateMutualFundsList);

export default router;
