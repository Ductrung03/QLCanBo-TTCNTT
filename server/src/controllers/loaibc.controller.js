//server/src/controllers/loaibc.controller.js
const { Loai_BC } = require("../models/init");

exports.getAllLoaiBC = async (req, res) => {
  const list = await Loai_BC.findAll({ attributes: ["MaLBC", "LoaiBangCap"] });
  res.json(list);
};
