import { useEffect, useState } from "react";
import api from "../services/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import UserFormDialog from "../components/UserFormDialog";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      await api.delete(`/users/${userId}`);
      fetchUsers();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Quản lý người dùng</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setSelectedUser(null)}
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? "Cập nhật người dùng" : "Thêm mới người dùng"}
              </DialogTitle>
            </DialogHeader>
            <UserFormDialog
              user={selectedUser}
              onSuccess={() => {
                fetchUsers();
                setOpenDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-blue-200">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">
                Tên đăng nhập
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.UserId} className="hover:bg-blue-50">
                  <td className="px-4 py-3 border-b">{u.UserId}</td>
                  <td className="px-4 py-3 border-b">{u.UserName}</td>
                  <td className="px-4 py-3 border-b">{u.Email}</td>
                  <td className="px-4 py-3 border-b flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-400"
                      onClick={() => handleEdit(u)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(u.UserId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Không có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
