const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    balance: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
        isDecimal: true,
      },
    },
  },
  {
    tableName: "wallets",
    indexes: [
      {
        fields: ["id"],
      },
    ],
  }
);

module.exports = Wallet;
