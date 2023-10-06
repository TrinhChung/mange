import axios from '../../config/axios';

export const getMangaNewUpdate = ({ page = 1 }) => {
  return axios.get(`/api/mangas?page=${page}&per_page=30`);
};
