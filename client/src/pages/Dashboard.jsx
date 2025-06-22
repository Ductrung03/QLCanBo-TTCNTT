import useAuthStore from "../stores/authStore";

const Dashboard = () => {
  const { role, logout } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Chào mừng bạn đến hệ thống!</h1>
      <h1 className="text-3xl font-bold text-gray-700">
        Hệ thống đang phát triển
      </h1>
      <p>Vai trò: {role}</p>
      <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
};

export default Dashboard;
