import { Router } from "express";

// Controller Imports
import {
  buyMutualFund,
  sellMutualFund,
} from "../controllers/investment.controller.js";

const router = Router();

// Investment Routes

router.post("/buy", buyMutualFund);
router.post("/sell", sellMutualFund);

export default router;
