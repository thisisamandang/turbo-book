// import Sequelize from "sequelize";
const Sequelize = require("sequelize");
import sequelize from "../utils/database";

const Events = sequelize.define("event", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availableSlots: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Events;
