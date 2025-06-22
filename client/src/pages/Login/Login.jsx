import { useState } from "react";
import api from "../../services/api";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { username, password });
      setAuth(res.data.token, res.data.role);
      navigate("/");
    } catch (err) {
      alert("Sai thông tin đăng nhập");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
        <input
          className="w-full p-2 border mb-3"
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border mb-3"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
