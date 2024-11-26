import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME || "postgres",
  port: process.env.DB_PORT || 5432,
});

try {
  await sequelize.authenticate();
  console.log(`============= DB CONNECTION SUCCESS =============`);
} catch (error) {
  console.error(`
    ============= DB ERROR =============
    Unable to connect to the database:
    ${error}
    ============= DB ERROR =============
    `);
}

export default sequelize;
