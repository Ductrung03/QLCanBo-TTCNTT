const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BangLuong = sequelize.define(
  "BangLuong",
  {
    MaBL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaCB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ThangNam: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    LuongCoBan: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    PhuCapChucVu: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    PhuCapCapBac: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    PhuCapKhac: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    ThuongThang: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    KhauTru: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    ThucLanh: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },
    TrangThai: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    NgayTao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("GETDATE()"),
    },
    NgayDuyet: {
      type: DataTypes.DATE,
    },
    NgayChiTra: {
      type: DataTypes.DATE,
    },
    MaNguoiTao: {
      type: DataTypes.INTEGER,
    },
    MaNguoiDuyet: {
      type: DataTypes.INTEGER,
    },
    GhiChu: {
      type: DataTypes.STRING(500),
    },
  },
  {
    tableName: "BangLuong",
    timestamps: false,
  }
);

module.exports = BangLuong;