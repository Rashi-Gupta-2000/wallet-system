const sequelize = require("./db");

async function startDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    await sequelize.sync({ alter: true }); // or force: true for dev
    console.log("✅ Models synced");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

module.exports = startDatabase;
