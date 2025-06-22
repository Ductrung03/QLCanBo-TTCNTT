import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/bangluong.api";
import { toast } from "react-hot-toast";

const BangLuongFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // chứa data nếu đang sửa

  const [form, setForm] = useState({
    MaCB: "",
    ThangNam: "",
    LuongCoBan: "",
    PhuCapChucVu: "",
    PhuCapCapBac: "",
    PhuCapKhac: "",
    ThuongThang: "",
    KhauTru: "",
    GhiChu: "",
  });

  const [canBoList, setCanBoList] = useState([]);
  const [selectedCanBo, setSelectedCanBo] = useState(null);

  useEffect(() => {
    if (state) {
      setForm({
        MaCB: state.MaCB || "",
        ThangNam: state.ThangNam || "",
        LuongCoBan: state.LuongCoBan || "",
        PhuCapChucVu: state.PhuCapChucVu || "",
        PhuCapCapBac: state.PhuCapCapBac || "",
        PhuCapKhac: state.PhuCapKhac || "",
        ThuongThang: state.ThuongThang || "",
        KhauTru: state.KhauTru || "",
        GhiChu: state.GhiChu || "",
      });
    } else {
      // Set default month to current month
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      setForm(prev => ({ ...prev, ThangNam: currentMonth }));
    }
  }, [state]);

  useEffect(() => {
    const fetchCanBo = async () => {
      try {
        const res = await api.getCanBo();
        setCanBoList(res.data);
      } catch (err) {
        toast.error("Không thể tải danh sách cán bộ.");
      }
    };
    fetchCanBo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Nếu chọn cán bộ, lấy thông tin chi tiết
    if (name === "MaCB") {
      const canbo = canBoList.find(cb => cb.MaCB == value);
      setSelectedCanBo(canbo);
    }
  };

  const calculateThucLanh = () => {
    const luongCB = parseFloat(form.LuongCoBan) || 0;
    const phuCapCV = parseFloat(form.PhuCapChucVu) || 0;
    const phuCapCB = parseFloat(form.PhuCapCapBac) || 0;
    const phuCapKhac = parseFloat(form.PhuCapKhac) || 0;
    const thuong = parseFloat(form.ThuongThang) || 0;
    const khauTru = parseFloat(form.KhauTru) || 0;

    return luongCB + phuCapCV + phuCapCB + phuCapKhac + thuong - khauTru;
  };

  const handleSubmit = async () => {
  if (!form.MaCB || !form.ThangNam) {
    toast.error("Vui lòng chọn cán bộ và tháng năm!");
    return;
  }

  const submitData = {
    ...form,
    LuongCoBan: parseFloat(form.LuongCoBan) || 0,
    PhuCapChucVu: parseFloat(form.PhuCapChucVu) || 0,
    PhuCapCapBac: parseFloat(form.PhuCapCapBac) || 0,
    PhuCapKhac: parseFloat(form.PhuCapKhac) || 0,
    ThuongThang: parseFloat(form.ThuongThang) || 0,
    KhauTru: parseFloat(form.KhauTru) || 0,
  };

  try {
    if (state?.MaBL) {
      await api.update(state.MaBL, submitData);
      toast.success("Cập nhật bảng lương thành công!");
    } else {
      await api.create(submitData);
      toast.success("Thêm mới bảng lương thành công!");
    }
    navigate("/bangluong");
  } catch (err) {
    console.error("Lỗi khi lưu:", err);
    
    // Hiển thị lỗi từ server
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else if (err.response?.status === 400) {
      toast.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!");
    } else if (err.response?.status === 500) {
      toast.error("Lỗi hệ thống. Vui lòng thử lại sau!");
    } else {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  }
};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">
        {state ? "Cập nhật bảng lương" : "Thêm mới bảng lương"}
      </h1>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-4">
          <div>
            <Label>
              Cán bộ <span className="text-red-500">*</span>
            </Label>
            <select
              name="MaCB"
              value={form.MaCB}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              disabled={!!state}
            >
              <option value="">-- Chọn cán bộ --</option>
              {canBoList.map((cb) => (
                <option key={cb.MaCB} value={cb.MaCB}>
                  {cb.HoTenKhaiSinh} - {cb.CapBac} - {cb.DonVi?.TenDV}
                </option>
              ))}
            </select>
          </div>

          {selectedCanBo && (
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-medium text-blue-700 mb-2">Thông tin cán bộ:</h4>
              <p><strong>Họ tên:</strong> {selectedCanBo.HoTenKhaiSinh}</p>
              <p><strong>Cấp bậc:</strong> {selectedCanBo.CapBac}</p>
              <p><strong>Chức vụ:</strong> {selectedCanBo.ChucVu}</p>
              <p><strong>Đơn vị:</strong> {selectedCanBo.DonVi?.TenDV}</p>
            </div>
          )}

          <div>
            <Label>
              Tháng năm <span className="text-red-500">*</span>
            </Label>
            <Input
              type="month"
              name="ThangNam"
              value={form.ThangNam}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Lương cơ bản</Label>
            <Input
              type="number"
              name="LuongCoBan"
              value={form.LuongCoBan}
              onChange={handleChange}
              placeholder="Sẽ được tính tự động"
            />
          </div>

          <div>
            <Label>Phụ cấp chức vụ</Label>
            <Input
              type="number"
              name="PhuCapChucVu"
              value={form.PhuCapChucVu}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Phụ cấp cấp bậc</Label>
            <Input
              type="number"
              name="PhuCapCapBac"
              value={form.PhuCapCapBac}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Phụ cấp khác</Label>
            <Input
              type="number"
              name="PhuCapKhac"
              value={form.PhuCapKhac}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Thưởng tháng</Label>
            <Input
              type="number"
              name="ThuongThang"
              value={form.ThuongThang}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Khấu trừ</Label>
            <Input
              type="number"
              name="KhauTru"
              value={form.KhauTru}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Ghi chú</Label>
            <textarea
              name="GhiChu"
              value={form.GhiChu}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              rows="3"
              placeholder="Nhập ghi chú"
            />
          </div>

          {/* Hiển thị tổng thực lãnh */}
          <div className="bg-green-50 p-3 rounded">
            <h4 className="font-medium text-green-700 mb-2">Tổng thực lãnh:</h4>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(calculateThucLanh())} VNĐ
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/bangluong")}>
          Đóng
        </Button>
        <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
          {state ? "Cập nhật" : "Lưu"}
        </Button>
      </div>
    </div>
  );
};

export default BangLuongFormPage;