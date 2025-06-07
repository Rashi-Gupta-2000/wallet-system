const Wallet = require("./wallet");
const Transaction = require("./transaction");

// Define associations
Wallet.hasMany(Transaction, {
  foreignKey: "walletId",
  as: "transactions",
});

Transaction.belongsTo(Wallet, {
  foreignKey: "walletId",
  as: "wallet",
});

module.exports = {
  Wallet,
  Transaction,
};
