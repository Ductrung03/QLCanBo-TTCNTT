//client/src/pages/BangCapList.jsx
import { useEffect, useState } from "react";
import api from "../../services/bangcap.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import ConfirmDialog from "../../components/ConfirmDialog";
import BangCapLichSuDialog from "../../components/BangCapLichSuDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const statusClass = {
  "Đã duyệt": "text-green-600 font-medium",
  "Cập nhật": "text-yellow-600 font-medium",
  "Từ chối": "text-red-600 font-medium",
};

const BangCapList = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openHistory, setOpenHistory] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [filters, setFilters] = useState({ keyword: "", dv: "", type: "" });
  const [donViList, setDonViList] = useState([]);
  const [loaiBangList, setLoaiBangList] = useState([]);

  const navigate = useNavigate();

  const fetchBangCap = async () => {
    try {
      const res = await api.getAll();
      setData(res.data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    }
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (await api.remove(idToDelete)) {
      toast.success("Xoa thanh cong!");
    }
    fetchBangCap();
    setShowConfirm(false);
  };

  useEffect(() => {
    fetchBangCap();
  }, []);
  useEffect(() => {
    const delay = setTimeout(() => {
      api.getAllFiltered(filters).then((res) => setData(res.data));
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [filters]);
  useEffect(() => {
    const fetchFilters = async () => {
      const [dvRes, lbRes] = await Promise.all([
        api.getDonVi(),
        api.getLoaiBang(),
      ]);
      setDonViList(dvRes.data);
      setLoaiBangList(lbRes.data);
    };
    fetchFilters();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-blue-700">
          QUẢN LÝ TRÌNH ĐỘ CHUYÊN MÔN
        </h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => navigate("/bangcap/form")}
        >
          <Plus className="w-4 h-4 mr-1" /> Thêm mới
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Nhập từ khóa tìm kiếm..."
          className="max-w-sm"
          value={filters.keyword}
          onChange={(e) =>
            setFilters((f) => ({ ...f, keyword: e.target.value }))
          }
        />
        <Select onValueChange={(v) => setFilters((f) => ({ ...f, dv: v }))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Đơn vị" />
          </SelectTrigger>
          <SelectContent>
            {donViList.map((dv) => (
              <SelectItem key={dv.MaDV} value={dv.TenDV}>
                {dv.TenDV}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => setFilters((f) => ({ ...f, type: v }))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Loại văn bằng" />
          </SelectTrigger>
          <SelectContent>
            {loaiBangList.map((lb) => (
              <SelectItem key={lb.MaLBC} value={lb.LoaiBangCap}>
                {lb.LoaiBangCap}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Mã BC</th>
            <th className="border p-2">Họ và tên</th>
            <th className="border p-2">Số hiệu VB</th>
            <th className="border p-2">Loại VB</th>
            <th className="border p-2">Ngày cấp</th>
            <th className="border p-2">Chuyên ngành</th>
            <th className="border p-2">Trường cấp</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.MaBC}>
              <td className="border p-2">{`BC${row.MaBC.toString().padStart(
                3,
                "0"
              )}`}</td>
              <td className="border p-2">{row.HoTen}</td>
              <td className="border p-2">{row.SoHieuVanBan}</td>
              <td className="border p-2">{row.LoaiBangCap}</td>
              <td className="border p-2">{row.NgayCap}</td>
              <td className="border p-2">{row.ChuyenNganh}</td>
              <td className="border p-2">{row.TruongCapBang}</td>
              <td className={`border p-2 ${statusClass[row.TrangThai] || ""}`}>
                {row.TrangThai}
              </td>
              <td className="border p-2 space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/bangcap/view/${row.MaBC}`)}
                >
                  Xem
                </Button>

                <Button
                  className="bg-blue-600 text-white"
                  size="sm"
                  onClick={() => navigate("/bangcap/form", { state: row })}
                >
                  Sửa
                </Button>
                <Button
                  className="bg-red-600 text-white"
                  size="sm"
                  onClick={() => handleDeleteClick(row.MaBC)}
                >
                  Xoá
                </Button>

                <Button
                  className="bg-green-600 text-white"
                  size="sm"
                  onClick={() => {
                    setSelected(row);
                    setOpenHistory(true);
                  }}
                >
                  Lịch sử
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={showConfirm}
        title="XÁC NHẬN"
        message="Bạn có chắc chắn muốn xóa không?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />

      {openHistory && (
        <BangCapLichSuDialog
          bangCap={selected}
          onClose={() => setOpenHistory(false)}
        />
      )}
    </div>
  );
};

export default BangCapList;
