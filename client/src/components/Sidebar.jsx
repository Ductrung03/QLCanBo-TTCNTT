import { NavLink } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const { role, logout } = useAuthStore();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUserInfo(res.data);
      } catch (err) {
        console.error("Không lấy được thông tin người dùng", err);
      }
    };
    fetchProfile();
  }, []);
  const navItems = [
    { path: "/users", label: "Quản lý tài khoản" },
    { path: "/", label: "Quản lý thông tin cá nhân" },
    { path: "/", label: "Quản lý thân nhân" },
    { path: "/", label: "Quản lý  nghỉ phép" },
    { path: "/", label: "Quản lý đào tạo cán bộ" },
    { path: "/", label: "Quản lý khen thưởng" },
    { path: "/", label: "Quản lý kỷ luật cán bộ" },
    { path: "/", label: "Quản lý quá trình công tác" },
    { path: "/", label: "Quản lý hồ sơ chính trị và đảng viên" },
    { path: "/", label: "Quản lý biến động nhân sự" },
    { path: "/", label: "Quản lý đào tạo cán bộ" },
    { path: "/bangcap", label: "Quản lý trình độ chuyên môn" },
    { path: "/", label: "Quản lý hoạt động giảng dạy" },
    { path: "/", label: "Quản lý hoạt động NCKH" },
    { path: "/", label: "Quản lý y tế, sức khỏe cán bộ" },
    { path: "/bangluong", label: "Quản lý tiền lương theo bậc, chức vụ" },
  ];
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-4">
      <NavLink to="/" className="text-xl font-bold mb-6 block hover:underline">
        Quản Lý Cán Bộ
      </NavLink>

      <ul className="space-y-2 text-sm">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded hover:bg-blue-800 ${
                  isActive ? "bg-white text-blue-700 font-bold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-10 left-3 z-50 text-sm text-white">
        <div className="relative">
          {/* Nút chính */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-full shadow-lg transition duration-200"
          >
            <span className="text-cyan-300 text-lg">👤</span>
            <span className="font-medium text-white">
              {userInfo?.FullName || "Chưa đăng nhập"}
            </span>
            <span className="text-gray-200 text-xs">
              {userInfo?.UserType || ""}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute left-6 w-36 bg-white text-black rounded-md shadow-lg z-50">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
