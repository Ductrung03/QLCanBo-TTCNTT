// //server/src/models/RoleUser.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role_User = sequelize.define(
  "Role_User",
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN, // Sequelize map thành BIT trong MSSQL
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Role_User",
    timestamps: false,
  }
);

module.exports = Role_User;
