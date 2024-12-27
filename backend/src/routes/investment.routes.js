import { Router } from "express";

// Controller Imports
import {
  buyMutualFund,
  sellMutualFund,
  getAllInvestment,
} from "../controllers/investment.controller.js";

const router = Router();

// Investment Routes

router.get("/", getAllInvestment);
router.post("/buy", buyMutualFund);
router.post("/sell", sellMutualFund);

export default router;
