import axios from '../../config/axios';

export const getAllUsers = (page = 1) => {
  return axios.get(`/api/users?page=${page}`);
};

export const getAllReportedComment = () => {
  return axios.get(`/api/comments/reported`);
};

export const deleteComment = (id) => {
  return axios.post(`/api/comments/delete/${id}`);
};

export const getAllMangas = (page = 1) => {
  return axios.get(`/api/mangas?page=${page}`);
};
