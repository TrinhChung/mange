import axios from '../../config/axios';

export const getHistories = () => {
  return axios.get(`/api/me/history`);
};
