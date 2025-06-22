// //server/src/models/CanBo.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CanBo = sequelize.define(
  "CanBo",
  {
    MaCB: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HoTenKhaiSinh: DataTypes.STRING(50),
    HoTenThuongDung: DataTypes.STRING(50),
    BiDanh: DataTypes.STRING(50),
    GioiTinh: DataTypes.STRING(3),
    CapBac: DataTypes.STRING(20),
    ChucVu: DataTypes.STRING(50),
    MaDV: DataTypes.INTEGER,
    NgaySinh: DataTypes.DATEONLY,
    NoiSinh: DataTypes.STRING(500),
    QueQuan: DataTypes.STRING(500),
    NoiDKHK: DataTypes.STRING(500),
    NoiTamTru: DataTypes.STRING(500),
    DanToc: DataTypes.STRING(15),
    TonGiao: DataTypes.STRING(20),
    ThanhPhanGD: DataTypes.STRING(50),
    NgheNghiep: DataTypes.STRING(50),
    Ngayvaodang: DataTypes.DATEONLY,
    Ngaychinhthuc: DataTypes.DATEONLY,
    Chibo: DataTypes.STRING(50),
    Ngayvaodoan: DataTypes.DATEONLY,
    Noiketnap: DataTypes.STRING(50),
    Trangthaidang: DataTypes.STRING(50),
    QuaTrinhPhanDau: DataTypes.STRING(500),
    NgayNhapNgu: DataTypes.DATEONLY,
    NgayCongTac: DataTypes.DATEONLY,
    ThamGiaTCXH: DataTypes.STRING(50),
    NgayThamGiaCM: DataTypes.DATEONLY,
    GDPT: DataTypes.STRING(20),
    ChuyenMonNV: DataTypes.STRING(50),
    LyLuanCT: DataTypes.STRING(50),
    NgoaiNgu: DataTypes.STRING(50),
    HocHam: DataTypes.STRING(50),
    HocVi: DataTypes.STRING(50),
    CongTacDangLam: DataTypes.STRING(100),
    SoCCCD: DataTypes.CHAR(12),
    Anh: DataTypes.BLOB, // MSSQL 'image' → Sequelize 'BLOB'
    TrangThai: DataTypes.STRING(20),
    NgayTao: DataTypes.DATE,
    NgaySua: DataTypes.DATE,
  },
  {
    tableName: "CanBo",
    timestamps: false,
  }
);

module.exports = CanBo;
