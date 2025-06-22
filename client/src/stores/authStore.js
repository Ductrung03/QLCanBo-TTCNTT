import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  setAuth: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    set({ token, role });
  },
  logout: () => {
    localStorage.clear();
    set({ token: null, role: null });
  },
}));

export default useAuthStore;
