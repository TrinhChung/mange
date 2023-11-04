import axios from '../../config/axios';

export const getHistories = () => {
  return axios.get(`/api/me/history`);
};

export const getRecommendation = () => {
  return axios.get('/api/me/recommendation');
};

export const mangaBookmark = (id) => {
  return axios.post(`/api/mangas/bookmark/${id}`);
};

export const getMangasBookmark = () => {
  return axios.get('/api/mangas/bookmarked');
};
