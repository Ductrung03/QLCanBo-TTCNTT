import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import api from '../services/api';

const UserFormDialog = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    PassWord: '',
    RoleId: '',
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, PassWord: '', RoleId: user.RoleId });
    } else {
      setFormData({ UserName: '', Email: '', PassWord: '', RoleId: '' });
    }
  }, [user]);

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await api.get('/roles');
      setRoles(res.data);
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (user) {
        await api.put(`/users/${user.UserId}`, formData);
      } else {
        await api.post('/users', formData);
      }
      onSuccess();
    } catch (err) {
      alert('Lỗi khi lưu người dùng!');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="UserName">Tên đăng nhập</Label>
        <Input
          name="UserName"
          value={formData.UserName}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="Email">Email</Label>
        <Input
          name="Email"
          type="email"
          value={formData.Email}
          onChange={handleChange}
        />
      </div>
      {!user && (
        <div>
          <Label htmlFor="PassWord">Mật khẩu</Label>
          <Input
            name="PassWord"
            type="password"
            value={formData.PassWord}
            onChange={handleChange}
          />
        </div>
      )}
      <div>
        <Label>Vai trò</Label>
        <select
          name="RoleId"
          value={formData.RoleId}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded text-sm"
        >
          <option value="">-- Chọn vai trò --</option>
          {roles.map((r) => (
            <option key={r.roleId} value={r.roleId}>
              {r.roleName}
            </option>
          ))}
        </select>
      </div>

      <Button className="w-full mt-4" onClick={handleSubmit}>
        {user ? 'Cập nhật' : 'Tạo mới'}
      </Button>
    </div>
  );
};

export default UserFormDialog;
