// //server/src/models/QuaTrinhCongTac.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QuaTrinhCongTac = sequelize.define(
  "QuaTrinhCongTac",
  {
    MaQTCT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaCB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ChucVu: {
      type: DataTypes.STRING(255), 
      allowNull: true,
    },
    ThoiGianBatDau: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ThoiGianKetThuc: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "QuaTrinhCongTac",
    timestamps: false,
  }
);

module.exports = QuaTrinhCongTac;
