import axios from "./api";

const API = {
  getAll: (params) => axios.get("/bangluong", { params }),
  create: (data) => axios.post("/bangluong", data),
  update: (id, data) => axios.put(`/bangluong/${id}`, data),
  remove: (id) => axios.delete(`/bangluong/${id}`),
  getById: (id) => axios.get(`/bangluong/view/${id}`),
  tinhLuong: (data) => axios.post("/bangluong/tinh-luong", data),
  approve: (id) => axios.put(`/bangluong/${id}/approve`),
  reject: (id) => axios.put(`/bangluong/${id}/reject`),
  getCanBo: () => axios.get("/canbo"),
  getDonVi: () => axios.get("/canbo/donvi"),
};

// Interceptor để log lỗi
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      error: error.response?.data?.error
    });
    return Promise.reject(error);
  }
);

export default API;