// import dotenv from "dotenv";
import dotenv from "../utils/env.js";

dotenv.config({
  path: "../../.env",
});

export default {
  development: {
    username: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
