// //server/src/models/Loai_BC.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Loai_BC = sequelize.define(
  "Loai_BC",
  {
    MaLBC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LoaiBangCap: {
      type: DataTypes.STRING(255), // rõ độ dài để MSSQL ánh xạ NVARCHAR(255)
      allowNull: false,
    },
  },
  {
    tableName: "Loai_BC",
    timestamps: false,
  }
);

module.exports = Loai_BC;
