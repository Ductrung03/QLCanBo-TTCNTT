import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/bangluong.api";
import { Button } from "@/components/ui/button";

const BangLuongDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getById(id).then((res) => setData(res.data.data)).catch(() => {
      alert("Không tìm thấy bảng lương!");
      navigate("/bangluong");
    });
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const getStatusText = (status) => {
    const statusMap = {
      1: "Chưa duyệt",
      2: "Đã duyệt", 
      0: "Từ chối",
    };
    return statusMap[status] || "Không xác định";
  };

  const getStatusClass = (status) => {
    const classMap = {
      1: "text-yellow-600 bg-yellow-100",
      2: "text-green-600 bg-green-100",
      0: "text-red-600 bg-red-100",
    };
    return classMap[status] || "";
  };

  if (!data) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        Chi tiết bảng lương tháng {data.ThangNam}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Thông tin cán bộ */}
        <div className="border rounded p-4 shadow bg-white">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Thông tin cán bộ</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Mã cán bộ:</strong> CB{String(data.MaCB).padStart(3, "0")}</p>
            <p><strong>Họ và tên:</strong> {data.CanBo?.HoTenKhaiSinh}</p>
            <p><strong>Cấp bậc:</strong> {data.CanBo?.CapBac}</p>
            <p><strong>Chức vụ:</strong> {data.CanBo?.ChucVu}</p>
            <p><strong>Đơn vị:</strong> {data.CanBo?.DonVi?.TenDV}</p>
          </div>
        </div>

        {/* Thông tin lương */}
        <div className="border rounded p-4 shadow bg-white">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Chi tiết lương</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Tháng/Năm:</strong> {data.ThangNam}</p>
            <p><strong>Lương cơ bản:</strong> {formatCurrency(data.LuongCoBan)} VNĐ</p>
            <p><strong>Phụ cấp chức vụ:</strong> {formatCurrency(data.PhuCapChucVu)} VNĐ</p>
            <p><strong>Phụ cấp cấp bậc:</strong> {formatCurrency(data.PhuCapCapBac)} VNĐ</p>
            <p><strong>Phụ cấp khác:</strong> {formatCurrency(data.PhuCapKhac)} VNĐ</p>
          </div>
        </div>

        {/* Thưởng và khấu trừ */}
        <div className="border rounded p-4 shadow bg-white">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Thưởng & Khấu trừ</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Thưởng tháng:</strong> <span className="text-green-600">+{formatCurrency(data.ThuongThang)} VNĐ</span></p>
            <p><strong>Khấu trừ:</strong> <span className="text-red-600">-{formatCurrency(data.KhauTru)} VNĐ</span></p>
            <div className="pt-2 border-t">
              <p className="text-lg"><strong>Thực lãnh:</strong> <span className="text-green-700 font-bold">{formatCurrency(data.ThucLanh)} VNĐ</span></p>
            </div>
          </div>
        </div>

        {/* Trạng thái và ghi chú */}
        <div className="border rounded p-4 shadow bg-white">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Trạng thái & Ghi chú</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Trạng thái:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusClass(data.TrangThai)}`}>
                {getStatusText(data.TrangThai)}
              </span>
            </p>
            <p><strong>Ngày tạo:</strong> {new Date(data.NgayTao).toLocaleDateString('vi-VN')}</p>
            {data.NgayDuyet && (
              <p><strong>Ngày duyệt:</strong> {new Date(data.NgayDuyet).toLocaleDateString('vi-VN')}</p>
            )}
            {data.GhiChu && (
              <div>
                <strong>Ghi chú:</strong>
                <p className="mt-1 p-2 bg-gray-50 rounded">{data.GhiChu}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/bangluong")}>
          Quay lại danh sách
        </Button>
        <Button 
          className="bg-blue-600 text-white" 
          onClick={() => navigate("/bangluong/form", { state: data })}
        >
          Chỉnh sửa
        </Button>
      </div>
    </div>
  );
};

export default BangLuongDetail;