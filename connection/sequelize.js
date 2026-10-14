import { Sequelize } from "sequelize";
import { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } from "../config/config.js";

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: "163.176.204.90",
    dialect: "mssql"
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize