import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";

import fetchLatestNAV from "./utils/fetchLatestNAV.js";

// Server initialization
const app = express();
app.use(cors());

// MIDDLEWARES
// For parsing application/json
app.use(express.json());

// For parsing cookies
app.use(cookieParser());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Route Imports
import userRoutes from "./routes/user.routes.js";
import mutualFundRoutes from "./routes/mutualFund.routes.js";
import investmentRoutes from "./routes/investment.routes.js";

// Route Definitions
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users/investment", investmentRoutes);
app.use("/api/v1/mutualfund", mutualFundRoutes);

cron.schedule("0 5 0 * * 2-6", fetchLatestNAV);

export default app;
