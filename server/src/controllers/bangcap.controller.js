//server/src/controllers/bangcap/js
const bangcapService = require("../services/bangcap.service");

exports.getAll = async (req, res) => {
  try {
    const result = await bangcapService.getAllBangCap(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi truy vấn", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await bangcapService.createBangCap(
      req.body,
      req.file?.path,
      req.user?.fullname
    );
    res.json(record);
  } catch (error) {
    console.error("Lỗi tạo BC:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi tạo bằng cấp", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    await bangcapService.updateBangCap(req.params.id, req.body, req.file?.path);
    res.json({ message: "Đã cập nhật" });
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const message = await bangcapService.deleteBangCap(req.params.id);
    res.json({ message });
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi xóa", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const bc = await bangcapService.getBangCapById(req.params.id);
    res.json(bc);
  } catch (error) {
    const status = error.message === "NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: "Lỗi chi tiết", error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await bangcapService.getBangCapHistory(req.params.id);
    res.json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy lịch sử", error: error.message });
  }
};
