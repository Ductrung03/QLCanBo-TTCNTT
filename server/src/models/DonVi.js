// //server/src/models/DonVi.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DonVi = sequelize.define(
  "DonVi",
  {
    MaDV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenDV: {
      type: DataTypes.STRING(255), 
      allowNull: false,
    },
  },
  {
    tableName: "DonVi",
    timestamps: false,
  }
);

module.exports = DonVi;
