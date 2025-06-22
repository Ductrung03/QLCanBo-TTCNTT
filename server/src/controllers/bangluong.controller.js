const bangluongService = require("../services/bangluong.service");

exports.getAll = async (req, res) => {
  try {
    const result = await bangluongService.getAllBangLuong(req.query);
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi truy vấn dữ liệu", 
      error: error.message 
    });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await bangluongService.createBangLuong(req.body);
    res.json({ 
      data: record, 
      message: "Tạo bảng lương thành công" 
    });
  } catch (error) {
    console.error("Lỗi tạo BL:", error);
    
    // Xử lý các loại lỗi khác nhau
    if (error.message === "Đã có bảng lương cho tháng này") {
      return res.status(400).json({ 
        message: "Đã có bảng lương cho tháng này. Vui lòng chọn tháng khác hoặc chỉnh sửa bảng lương hiện có.",
        error: "DUPLICATE_SALARY"
      });
    }
    
    if (error.message.includes("findOne is not a function")) {
      return res.status(500).json({ 
        message: "Lỗi hệ thống: Không thể truy cập dữ liệu mức lương. Vui lòng liên hệ quản trị viên.",
        error: "SYSTEM_ERROR"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi tạo bảng lương. Vui lòng thử lại.",
      error: error.message 
    });
  }
};

exports.update = async (req, res) => {
  try {
    await bangluongService.updateBangLuong(req.params.id, req.body);
    res.json({ message: "Cập nhật bảng lương thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật BL:", error);
    
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ 
        message: "Không tìm thấy bảng lương cần cập nhật",
        error: "NOT_FOUND"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi cập nhật bảng lương. Vui lòng thử lại.",
      error: error.message 
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const message = await bangluongService.deleteBangLuong(req.params.id);
    res.json({ message });
  } catch (error) {
    console.error("Lỗi xóa BL:", error);
    
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ 
        message: "Không tìm thấy bảng lương cần xóa",
        error: "NOT_FOUND"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi xóa bảng lương. Vui lòng thử lại.",
      error: error.message 
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const bl = await bangluongService.getBangLuongById(req.params.id);
    res.json({ data: bl });
  } catch (error) {
    console.error("Lỗi lấy chi tiết BL:", error);
    
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ 
        message: "Không tìm thấy bảng lương",
        error: "NOT_FOUND"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi lấy thông tin chi tiết",
      error: error.message 
    });
  }
};

exports.tinhLuong = async (req, res) => {
  try {
    const { thangNam, donViId } = req.body;
    
    if (!thangNam) {
      return res.status(400).json({ 
        message: "Vui lòng chọn tháng năm để tính lương",
        error: "MISSING_MONTH"
      });
    }
    
    const result = await bangluongService.tinhLuongTheoThang(thangNam, donViId);
    res.json({ 
      data: result, 
      message: `Đã tính lương thành công cho ${result.length} cán bộ` 
    });
  } catch (error) {
    console.error("Lỗi tính lương:", error);
    res.status(500).json({ 
      message: "Lỗi khi tính lương tự động. Vui lòng thử lại.",
      error: error.message 
    });
  }
};

exports.approve = async (req, res) => {
  try {
    const message = await bangluongService.approveBangLuong(req.params.id, req.user?.id || 1);
    res.json({ message });
  } catch (error) {
    console.error("Lỗi phê duyệt BL:", error);
    
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ 
        message: "Không tìm thấy bảng lương cần phê duyệt",
        error: "NOT_FOUND"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi phê duyệt bảng lương",
      error: error.message 
    });
  }
};

exports.reject = async (req, res) => {
  try {
    const message = await bangluongService.rejectBangLuong(req.params.id, req.user?.id || 1);
    res.json({ message });
  } catch (error) {
    console.error("Lỗi từ chối BL:", error);
    
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ 
        message: "Không tìm thấy bảng lương cần từ chối",
        error: "NOT_FOUND"
      });
    }
    
    res.status(500).json({ 
      message: "Lỗi khi từ chối bảng lương",
      error: error.message 
    });
  }
};