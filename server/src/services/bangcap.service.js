const {
  BangCap,
  Loai_BC,
  CanBo,
  DonVi,
  LichSuThayDoi_BC,
} = require("../models/init");
const { Op } = require("sequelize");

const getAllBangCap = async (filters) => {
  const { keyword = "", dv = "", type = "" } = filters;
  const whereClause = {};
  const includeClause = [
    {
      model: CanBo,
      as: "NguoiSoHuu",
      attributes: ["MaCB", "HoTenKhaiSinh", "MaDV"],
      include: dv
        ? [{ model: DonVi, attributes: ["TenDV"], where: { TenDV: { [Op.like]: `%${dv}%` } } }]
        : [{ model: DonVi, attributes: ["TenDV"] }],
    },
    {
      model: Loai_BC,
      attributes: ["LoaiBangCap"],
      ...(type && { where: { LoaiBangCap: { [Op.like]: `%${type}%` } } }),
    },
  ];

  if (keyword) {
    whereClause[Op.or] = [
      { SoHieuVanBan: { [Op.like]: `%${keyword}%` } },
      { ChuyenNganh: { [Op.like]: `%${keyword}%` } },
      { TruongCapBang: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const list = await BangCap.findAll({
    where: whereClause,
    include: includeClause,
    order: [["ThoiGianTao", "DESC"]],
  });

  return list.map((b) => ({
    MaBC: b.MaBC,
    MaGV: b.MaGV,
    MaLBC: b.MaLBC,
    SoHieuVanBan: b.SoHieuVanBan,
    ChuyenNganh: b.ChuyenNganh,
    NamTotNghiep: b.NamTotNghiep,
    TruongCapBang: b.TruongCapBang,
    HeDaoTao: b.HeDaoTao,
    NgayCap: b.NgayCap,
    TrangThai: b.TrangThai,
    HoTen: b.NguoiSoHuu?.HoTenKhaiSinh,
    LoaiBangCap: b.Loai_BC?.LoaiBangCap,
  }));
};

const createBangCap = async (data, filePath, createdBy) => {
  const record = await BangCap.create({
    ...data,
    FileScan: filePath,
    NguoiTao: createdBy || "",
  });

  await LichSuThayDoi_BC.create({
    MaBC: record.MaBC,
    NoiDungThayDoi: `Tạo mới bằng cấp với số hiệu: ${data.SoHieuVanBan}`,
  });

  return record;
};

const updateBangCap = async (id, payload, filePath) => {
  const old = await BangCap.findByPk(id);
  if (!old) throw new Error("NOT_FOUND");

  const oldData = old.get({ plain: true });
  const updatePayload = { ...payload, FileScan: filePath || oldData.FileScan };

  const changes = [];
  for (const key in updatePayload) {
    if (key !== "ThoiGianTao" && updatePayload[key] != oldData[key]) {
      changes.push(`${key}: ${oldData[key]} -> ${updatePayload[key]}`);
    }
  }

  await BangCap.update(updatePayload, { where: { MaBC: id } });

  if (changes.length > 0) {
    await LichSuThayDoi_BC.create({
      MaBC: id,
      NoiDungThayDoi: `Cập nhật: ${changes.join(", ")}`,
    });
  }
};

const deleteBangCap = async (id) => {
  const record = await BangCap.findByPk(id);
  if (!record) throw new Error("NOT_FOUND");

  await LichSuThayDoi_BC.destroy({ where: { MaBC: id } });
  await BangCap.destroy({ where: { MaBC: id } });

  return `Đã xóa bằng cấp số hiệu: ${record.SoHieuVanBan}`;
};

const getBangCapById = async (id) => {
  const bc = await BangCap.findByPk(id, {
    include: [
      { model: CanBo, as: "NguoiSoHuu", attributes: ["HoTenKhaiSinh"] },
      { model: Loai_BC, attributes: ["LoaiBangCap"] },
    ],
  });

  if (!bc) throw new Error("NOT_FOUND");

  return {
    ...bc.get(),
    HoTen: bc.NguoiSoHuu?.HoTenKhaiSinh,
    LoaiBangCap: bc.Loai_BC?.LoaiBangCap,
  };
};

const getBangCapHistory = async (id) => {
  return await LichSuThayDoi_BC.findAll({
    where: { MaBC: id },
    order: [["ThoiGianThayDoi", "DESC"]],
  });
};

module.exports = {
  getAllBangCap,
  createBangCap,
  updateBangCap,
  deleteBangCap,
  getBangCapById,
  getBangCapHistory,
};
