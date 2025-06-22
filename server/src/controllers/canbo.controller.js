//server/src/controllers/canbo.controller.js
const { CanBo, DonVi } = require("../models/init");

exports.getAllCanBo = async (req, res) => {
  const list = await CanBo.findAll({
    attributes: ["MaCB", "HoTenKhaiSinh", "CapBac", "GioiTinh"],
    include: {
      model: DonVi,
      attributes: ["TenDV"],
    },
    order: [["HoTenKhaiSinh", "ASC"]],
  });

  res.json(list);
};
exports.getAllDonVi = async (req, res) => {
  const list = await DonVi.findAll({ attributes: ["MaDV", "TenDV"] });
  res.json(list);
};
