const Sequelize = require("sequelize");
import sequelize from "../utils/database";

const Users = sequelize.define("s3db", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Users;
