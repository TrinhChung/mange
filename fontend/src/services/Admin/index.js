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

export const createManga = (formData) => {
  console.log('createManga', formData);
  return axios.post(`/api/mangas`, formData);
};

export const editManga = (mangaId, formData) => {
  return axios.post(`/api/mangas/${mangaId}`, formData);
}

export const createChapter = (mangaId, formData) => {
  return axios.post(`/api/mangas/${mangaId}/chapter`, formData);
};

export const editChapter = (chapterId, formData) => {
  return axios.patch(`/api/chapters/${chapterId}`, formData);
};


export const updateActiveStatusUser = (userId, status) => {
  return axios.patch(`/api/users/${userId}`, { active: status });
};
