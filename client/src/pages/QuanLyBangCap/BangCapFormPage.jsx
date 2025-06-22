import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "../../services/bangcap.api";
import { toast } from "react-hot-toast";

const BangCapFormPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // chứa data nếu đang sửa

  const [form, setForm] = useState({
    MaGV: "",
    MaLBC: "",
    SoHieuVanBan: "",
    ChuyenNganh: "",
    NamTotNghiep: "",
    TruongCapBang: "",
    HeDaoTao: "",
    NgayCap: "",
    FileScan: null,
  });

  const [loaiBangList, setLoaiBangList] = useState([]);
  const [canBoList, setCanBoList] = useState([]);

  useEffect(() => {
    if (state) {
      setForm({
        MaGV: state.MaGV || "",
        MaLBC: state.MaLBC || "",
        SoHieuVanBan: state.SoHieuVanBan || "",
        ChuyenNganh: state.ChuyenNganh || "",
        NamTotNghiep: state.NamTotNghiep || "",
        TruongCapBang: state.TruongCapBang || "",
        HeDaoTao: state.HeDaoTao || "",
        NgayCap: state.NgayCap ? state.NgayCap.slice(0, 10) : "",
        FileScan: null,
      });
    }
  }, [state]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [canboRes, loaibcRes] = await Promise.all([
          api.getCanBo(),
          api.getLoaiBang(),
        ]);
        setCanBoList(canboRes.data);
        setLoaiBangList(loaibcRes.data);
      } catch (err) {
        toast.error("Không thể tải dữ liệu danh sách.");
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (!state?.MaBC) {
      formData.append("MaNguoiTao", localStorage.getItem("userId") || 1);
    }

    try {
      if (state?.MaBC) {
        await api.update(state.MaBC, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await api.create(formData);
        toast.success("Thêm mới thành công!");
      }
      navigate("/bangcap");
    } catch (err) {
      toast.error("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700 mb-6">
        {state ? "Cập nhật bằng cấp" : "Thêm mới bằng cấp"}
      </h1>

      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="space-y-4">
          <div>
            <Label>
              Người sở hữu <span className="text-red-500">*</span>
            </Label>
            <select
              name="MaGV"
              value={form.MaGV}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">-- Chọn cán bộ --</option>
              {canBoList.map((cb) => (
                <option key={cb.MaCB} value={cb.MaCB}>
                  {cb.HoTenKhaiSinh} ({cb.GioiTinh} - {cb.CapBac})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>
              Loại văn bằng <span className="text-red-500">*</span>
            </Label>
            <select
              name="MaLBC"
              value={form.MaLBC}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">-- Chọn loại --</option>
              {loaiBangList.map((item) => (
                <option key={item.MaLBC} value={item.MaLBC}>
                  {item.LoaiBangCap}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>
              Số hiệu văn bằng <span className="text-red-500">*</span>
            </Label>
            <Input
              name="SoHieuVanBan"
              value={form.SoHieuVanBan}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Chuyên ngành <span className="text-red-500">*</span>
            </Label>
            <Input
              name="ChuyenNganh"
              value={form.ChuyenNganh}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Trường cấp <span className="text-red-500">*</span>
            </Label>
            <Input
              name="TruongCapBang"
              value={form.TruongCapBang}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>
              Năm tốt nghiệp <span className="text-red-500">*</span>
            </Label>
            <Input
              name="NamTotNghiep"
              value={form.NamTotNghiep}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>
              Hệ đào tạo <span className="text-red-500">*</span>
            </Label>
            <select
              name="HeDaoTao"
              value={form.HeDaoTao}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">-- Chọn hệ --</option>
              <option value="Chính quy">Chính quy</option>
              <option value="Văn bằng 2">Văn bằng 2</option>
              <option value="Tại chức">Tại chức</option>
            </select>
          </div>
          <div>
            <Label>
              File đính kèm <span className="text-red-500">*</span>
            </Label>
            <Input type="file" name="FileScan" onChange={handleChange} />
          </div>
          <div>
            <Label>
              Ngày cấp <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              name="NgayCap"
              value={form.NgayCap}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/bangcap")}>
          Đóng
        </Button>
        <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
          {state ? "Cập nhật" : "Lưu"}
        </Button>
      </div>
    </div>
  );
};

export default BangCapFormPage;
