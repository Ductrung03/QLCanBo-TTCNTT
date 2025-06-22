import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-[300px] p-0 overflow-hidden">
        <DialogHeader className="bg-blue-600 text-white p-3">
          <DialogTitle className="text-sm">{title || "XÁC NHẬN"}</DialogTitle>
        </DialogHeader>

        <div className="p-4 text-center">
          <DialogDescription className="mb-4 text-base">
            {message || "Bạn có chắc chắn muốn xóa không?"}
          </DialogDescription>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={onCancel}>
              Đóng
            </Button>
            <Button className="bg-red-600 text-white" onClick={onConfirm}>
              Xóa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
