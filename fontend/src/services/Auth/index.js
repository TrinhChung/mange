import axios from "../../config/axios";

export const loginService = (data) => {
  return axios.post("/api/auth/login", data);
};

export const loginMe = () => {
  return axios.get("/api/me");
};

export const logoutService = () => {
  return axios.delete("/api/auth/logout");
};

export const forgotService = (data) => {
  return axios.put("/api/auth/reset/password", data);
};
