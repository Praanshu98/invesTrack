import express from "express";

// Server initialization
const app = express();

// MIDDLEWARES
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Route Imports
import userRoutes from "./routes/user.routes.js";

// Route Definitions
app.use("/api/v1/users", userRoutes);

export default app;
