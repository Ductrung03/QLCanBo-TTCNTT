//server/src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserName: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING },
    PassWord: { type: DataTypes.STRING, allowNull: false },
    createDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "User",
    timestamps: false,
    createdAt: "createDate",
    updatedAt: false,
  }
);

module.exports = User;
