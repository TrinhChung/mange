import axios from '../../config/axios';

export const getMangaNewUpdate = ({ page = 1, query = '' }) => {
  return axios.get(`/api/mangas?page=${page}&per_page=30` + query);
};

export const getMangaDetail = (id) => {
  return axios.get(`/api/mangas/${id}`);
};

export const getChapterDetail = (id) => {
  return axios.get(`/api/chapters/${id}`);
};

export const getCategories = () => {
  return axios.get(`/api/categories`);
};
