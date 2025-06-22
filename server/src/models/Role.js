// //server/src/models/Role.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "Role",
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "Role",
    timestamps: true,
    createdAt: "createDate",
    updatedAt: false,
  }
);

module.exports = Role;
