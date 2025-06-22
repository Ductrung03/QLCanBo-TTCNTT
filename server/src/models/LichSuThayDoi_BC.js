// //server/src/models/LichSuThayDoi_BC.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LichSuThayDoi_BC = sequelize.define(
  "LichSuThayDoi_BC",
  {
    MaLSTD: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaBC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NoiDungThayDoi: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    ThoiGianThayDoi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("GETDATE()"), 
    },
  },
  {
    tableName: "LichSuThayDoi_BC",
    timestamps: false, 
  }
);

module.exports = LichSuThayDoi_BC;
