const { BangLuong, CanBo, DonVi, MucLuongCapBac } = require("../models/init");
const { Op } = require("sequelize");

const getAllBangLuong = async (filters) => {
  const { thangNam = "", donVi = "" } = filters;
  const whereClause = {};
  
  if (thangNam) {
    whereClause.ThangNam = thangNam;
  }

  const includeClause = [
    {
      model: CanBo,
      attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "ChucVu"],
      include: donVi
        ? [{ model: DonVi, attributes: ["TenDV"], where: { TenDV: { [Op.like]: `%${donVi}%` } } }]
        : [{ model: DonVi, attributes: ["TenDV"] }],
    },
  ];

  const list = await BangLuong.findAll({
    where: whereClause,
    include: includeClause,
    order: [["NgayTao", "DESC"]],
  });

  return list.map((bl) => ({
    MaBL: bl.MaBL,
    MaCB: bl.MaCB,
    ThangNam: bl.ThangNam,
    LuongCoBan: bl.LuongCoBan,
    PhuCapChucVu: bl.PhuCapChucVu,
    PhuCapCapBac: bl.PhuCapCapBac,
    PhuCapKhac: bl.PhuCapKhac,
    ThuongThang: bl.ThuongThang,
    KhauTru: bl.KhauTru,
    ThucLanh: bl.ThucLanh,
    TrangThai: bl.TrangThai,
    GhiChu: bl.GhiChu,
    HoTen: bl.CanBo?.HoTenKhaiSinh,
    CapBac: bl.CanBo?.CapBac,
    ChucVu: bl.CanBo?.ChucVu,
    DonVi: bl.CanBo?.DonVi?.TenDV,
  }));
};

const createBangLuong = async (data) => {
  // Kiểm tra đã có bảng lương tháng này chưa
  const existing = await BangLuong.findOne({
    where: { MaCB: data.MaCB, ThangNam: data.ThangNam }
  });

  if (existing) {
    throw new Error("Đã có bảng lương cho tháng này");
  }

  // Tính toán lương tự động nếu chưa có
  let luongCoBan = data.LuongCoBan;
  if (!luongCoBan || luongCoBan == 0) {
    const canbo = await CanBo.findByPk(data.MaCB);
    const mucLuong = await MucLuongCapBac.findOne({
      where: { 
        CapBac: canbo.CapBac,
        TrangThai: "Đang áp dụng"
      }
    });
    luongCoBan = mucLuong ? mucLuong.HeSoLuong * mucLuong.LuongCoBan : 0;
  }

  const thucLanh = luongCoBan + (data.PhuCapChucVu || 0) + (data.PhuCapCapBac || 0) + 
                   (data.PhuCapKhac || 0) + (data.ThuongThang || 0) - (data.KhauTru || 0);

  const record = await BangLuong.create({
    ...data,
    LuongCoBan: luongCoBan,
    ThucLanh: thucLanh,
    TrangThai: 1, // Chưa duyệt
    MaNguoiTao: 1, // TODO: lấy từ user đang login
  });

  return record;
};

const updateBangLuong = async (id, data) => {
  const old = await BangLuong.findByPk(id);
  if (!old) throw new Error("NOT_FOUND");

  // Tính toán lại lương
  const thucLanh = (data.LuongCoBan !== undefined ? data.LuongCoBan : old.LuongCoBan) + 
                   (data.PhuCapChucVu !== undefined ? data.PhuCapChucVu : old.PhuCapChucVu) + 
                   (data.PhuCapCapBac !== undefined ? data.PhuCapCapBac : old.PhuCapCapBac) + 
                   (data.PhuCapKhac !== undefined ? data.PhuCapKhac : old.PhuCapKhac) + 
                   (data.ThuongThang !== undefined ? data.ThuongThang : old.ThuongThang) - 
                   (data.KhauTru !== undefined ? data.KhauTru : old.KhauTru);

  await BangLuong.update({ ...data, ThucLanh: thucLanh }, { where: { MaBL: id } });
};

const deleteBangLuong = async (id) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.destroy({ where: { MaBL: id } });
  return "Đã xóa bảng lương";
};

const getBangLuongById = async (id) => {
  const bl = await BangLuong.findByPk(id, {
    include: [
      { 
        model: CanBo, 
        attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "ChucVu"],
        include: [{ model: DonVi, attributes: ["TenDV"] }]
      },
    ],
  });

  if (!bl) throw new Error("NOT_FOUND");
  return bl;
};

const tinhLuongTheoThang = async (thangNam, donViId = null) => {
  const whereClause = donViId ? { MaDV: donViId } : {};
  
  const danhSachCanBo = await CanBo.findAll({
    where: whereClause,
    include: [{ model: DonVi, attributes: ["TenDV"] }]
  });

  const ketQua = [];
  
  for (const canbo of danhSachCanBo) {
    // Kiểm tra đã có bảng lương tháng này chưa
    const existing = await BangLuong.findOne({
      where: { MaCB: canbo.MaCB, ThangNam: thangNam }
    });

    if (!existing) {
      const mucLuong = await MucLuongCapBac.findOne({
        where: { 
          CapBac: canbo.CapBac,
          TrangThai: "Đang áp dụng"
        }
      });

      const luongCoBan = mucLuong ? mucLuong.HeSoLuong * mucLuong.LuongCoBan : 0;
      
      await BangLuong.create({
        MaCB: canbo.MaCB,
        ThangNam: thangNam,
        LuongCoBan: luongCoBan,
        PhuCapChucVu: 0,
        PhuCapCapBac: 0,
        PhuCapKhac: 0,
        ThuongThang: 0,
        KhauTru: 0,
        ThucLanh: luongCoBan,
        TrangThai: 1,
        MaNguoiTao: 1,
      });
    }

    ketQua.push({
      MaCB: canbo.MaCB,
      HoTen: canbo.HoTenKhaiSinh,
      CapBac: canbo.CapBac,
      ChucVu: canbo.ChucVu,
      DonVi: canbo.DonVi?.TenDV,
      LuongCoBan: existing?.LuongCoBan || luongCoBan,
      ThucLanh: existing?.ThucLanh || luongCoBan,
    });
  }

  return ketQua;
};

const approveBangLuong = async (id, nguoiDuyet) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.update({
    TrangThai: 2, // Đã duyệt
    NgayDuyet: new Date(),
    MaNguoiDuyet: nguoiDuyet
  }, { where: { MaBL: id } });

  return "Đã phê duyệt bảng lương";
};

const rejectBangLuong = async (id, nguoiDuyet) => {
  const record = await BangLuong.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await BangLuong.update({
    TrangThai: 0, // Từ chối
    NgayDuyet: new Date(),
    MaNguoiDuyet: nguoiDuyet
  }, { where: { MaBL: id } });

  return "Đã từ chối bảng lương";
};

module.exports = {
  getAllBangLuong,
  createBangLuong,
  updateBangLuong,
  deleteBangLuong,
  getBangLuongById,
  tinhLuongTheoThang,
  approveBangLuong,
  rejectBangLuong,
};