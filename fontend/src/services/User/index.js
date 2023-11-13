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

export const createCommentChapter = ({
  id = 1,
  comment = {},
  type = 'chapters',
}) => {
  return axios.post(`/api/${type}/${id}/comment`, comment);
};

export const getCommentChapter = ({ id = 1, type = 'chapters', page = 1 }) => {
  return axios.get(`/api/${type}/${id}/comments?page=${page}`);
};

export const reportComment = ({ id: id }) => {
  return axios.post(`/api/report/comment/${id}`);
};

export const voteManga = ({ id: id, score: score }) => {
  return axios.post(`/api/mangas/${id}/vote`, { score: score });
};
