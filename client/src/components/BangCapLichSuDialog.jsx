import { useEffect, useState } from "react";
import api from "../services/bangcap.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BangCapLichSuDialog = ({ bangCap, onClose }) => {
  const [lichSu, setLichSu] = useState([]);

  useEffect(() => {
    if (bangCap?.MaBC) {
      api.getLichSu(bangCap.MaBC).then((res) => setLichSu(res.data));
    }
  }, [bangCap]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Lịch sử cập nhật văn bằng</DialogTitle>
        </DialogHeader>

        <table className="w-full text-sm border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-1/4">Thời gian</th>
              <th className="border p-2">Nội dung thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {lichSu.length > 0 ? (
              lichSu.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">
                    {new Date(item.ThoiGianThayDoi).toLocaleString()}
                  </td>
                  <td className="border p-2 whitespace-pre-line">
                    {item.NoiDungThayDoi}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Không có lịch sử
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default BangCapLichSuDialog;
