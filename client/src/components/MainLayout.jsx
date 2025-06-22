import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Toaster position="top-right" />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
