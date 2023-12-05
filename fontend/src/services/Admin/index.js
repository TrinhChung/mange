import axios from '../../config/axios';

export const getAllUsers = (page = 1) => {
  return axios.get(`/api/users?page=${page}`);
};
