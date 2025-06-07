require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,

  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    DIALECT: "mysql",
    PORT: process.env.DB_PORT || 3306,
  },
};
