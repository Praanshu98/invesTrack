import { Router } from "express";

// Controller Imports
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// User Routes
router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

export default router;
