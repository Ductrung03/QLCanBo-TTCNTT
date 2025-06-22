// client/src/pages/BangCapDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/bangcap.api";
import { Button } from "@/components/ui/button";

const BangCapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getById(id).then((res) => setData(res.data)).catch(() => {
      alert("Không tìm thấy bằng cấp!");
      navigate("/bangcap");
    });
  }, [id]);

  if (!data) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">
        Thông tin chi tiết bằng cấp
      </h1>
      <div className="border rounded p-4 shadow bg-white space-y-2 text-sm">
        <p><strong>Mã:</strong> BC{String(data.MaBC).padStart(3, "0")}</p>
        <p><strong>Họ tên:</strong> {data.HoTen}</p>
        <p><strong>Loại bằng cấp:</strong> {data.LoaiBangCap}</p>
        <p><strong>Số hiệu:</strong> {data.SoHieuVanBan}</p>
        <p><strong>Chuyên ngành:</strong> {data.ChuyenNganh}</p>
        <p><strong>Năm tốt nghiệp:</strong> {data.NamTotNghiep}</p>
        <p><strong>Trường cấp:</strong> {data.TruongCapBang}</p>
        <p><strong>Hệ đào tạo:</strong> {data.HeDaoTao}</p>
        <p><strong>Ngày cấp:</strong> {data.NgayCap}</p>
        <p><strong>Trạng thái:</strong> {data.TrangThai}</p>
      </div>

      <Button variant="outline" onClick={() => navigate("/bangcap")}>
        Quay lại danh sách
      </Button>
    </div>
  );
};

export default BangCapDetail;
