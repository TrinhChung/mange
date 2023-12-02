import axios from '../../config/axios';

export const loginService = (data) => {
  return axios.post('/api/auth/login', data);
};

export const loginMe = () => {
  return axios.get('/api/me');
};

export const logoutService = () => {
  return axios.delete('/api/auth/logout');
};

export const signupService = (data) => {
  return axios.post('/api/auth/signup', data);
};

export const forgotPasswordService = (data) => {
  return axios.post('/api/auth/reset_password', data);
};

export const resetPasswordService = (data) => {
  return axios.post('/api/auth/new_password', data);
};
