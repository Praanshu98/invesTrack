import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

// Route Definitions
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/mutualfund", mutualFundRoutes);

export default app;
