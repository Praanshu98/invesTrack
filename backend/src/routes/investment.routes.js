import { Router } from "express";

// Controller Imports
import { invest } from "../controllers/investment.controller.js";

const router = Router();

// Investment Routes

router.post("/buy", invest);

export default router;
