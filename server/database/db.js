const { Sequelize } = require("sequelize");
const { DB } = require("../config/config");

const sequelize = new Sequelize(DB.NAME, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: DB.DIALECT,
  port: DB.PORT,
  logging: false,
});

module.exports = sequelize;
