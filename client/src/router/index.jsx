import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard";
import Unauthorized from "../pages/Unauthorized";
import UserList from "../pages/UserList";
import BangCapList from "../pages/QuanLyBangCap/BangCapList";
import BangCapFormPage from "../pages/QuanLyBangCap/BangCapFormPage";
import BangCapDetail from "@/pages/QuanLyBangCap/BangCapDetail";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "GiangVien", "PhongDaoTao"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/users", element: <UserList /> },
      { path: "/bangcap", element: <BangCapList /> },
      { path: "/bangcap/form", element: <BangCapFormPage /> },
      { path: "/bangcap/view/:id", element: <BangCapDetail /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);
