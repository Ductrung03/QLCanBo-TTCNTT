
// module.exports = BangCap;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BangCap = sequelize.define(
  "BangCap",
  {
    MaBC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaGV: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    MaLBC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NguoiTao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    SoHieuVanBan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ChuyenNganh: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    NamTotNghiep: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    TruongCapBang: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    HeDaoTao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    NgayCap: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    FileScan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    TrangThai: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Chờ duyệt",
      validate: {
        isIn: [["Chờ duyệt", "Đã duyệt", "Bị từ chối"]],
      },
    },
    ThoiGianTao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "BangCap",
    timestamps: false,
    createdAt: "ThoiGianTao",
    updatedAt: false,
  }
);

module.exports = BangCap;
