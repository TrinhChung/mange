import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.data) return Promise.reject(error.response?.data);
    else return error;
  }
);

export default instance;
