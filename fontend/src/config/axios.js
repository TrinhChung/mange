import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

const instance = axios.create({
  baseURL:
    NODE_ENV === 'production'
      ? 'https://api.mange.uetvnu.id.vn'
      : 'http://localhost:8000',
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    console.log(token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return { ...response.data, status: response.status };
  },
  (error) => {
    if (error.response?.data) return Promise.reject(error.response?.data);
    else return error;
  }
);

export default instance;
