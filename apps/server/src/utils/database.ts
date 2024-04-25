// import { Sequelize } from "sequelize";
const Sequelize = require("sequelize");

const sequelize = new Sequelize("grouple_db", "root", "Amandang", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
