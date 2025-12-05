import api from "./axiosInstance";

export const loginApi = async (data) => {
  const res = await api.post("/Auth/login", data);
  return res.data;
};
