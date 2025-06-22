import axios from "./api"; // đã cấu hình axios với token

const API = {
  getAll: () => axios.get("/bangcap"),
  create: (data) => axios.post("/bangcap", data),
  update: (id, data) => axios.put(`/bangcap/${id}`, data),
  remove: (id) => axios.delete(`/bangcap/${id}`),
  getLichSu: (id) => axios.get(`/bangcap/lichsu/${id}`),
  getAllFiltered: (params) => axios.get("/bangcap", { params }),
  getDonVi: () => axios.get("/canbo/donvi"),
  getById: (id) => axios.get(`/bangcap/view/${id}`),
  getCanBo: () => axios.get("/canbo"),
  getLoaiBang: () => axios.get("/loaibc"),
};

export default API;
