import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorAlert = ({ title, message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title || "Có lỗi xảy ra"}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-red-400 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;