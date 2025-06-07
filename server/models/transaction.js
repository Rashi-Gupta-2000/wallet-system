const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    walletId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "wallets",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    balance: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      validate: {
        min: 0,
        isDecimal: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("CREDIT", "DEBIT"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transactions",
    indexes: [
      {
        fields: ["walletId", "createdAt"],
      },
      {
        fields: ["type"],
      },
    ],
  }
);

module.exports = Transaction;
