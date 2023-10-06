import { createContext, useState, useEffect } from 'react';
import { getMangaNewUpdate } from '../../services/Guest/index';
import { proposes } from '../../pages/Guest/home/index';

export const MangaContext = createContext();
export default function MangaProvider({ children }) {
  const [newUpdates, setNewUpdates] = useState({ total: 1, manga: [] });
  const [proposes, setProposes] = useState([]);

  const fetchMangaNewUpdate = async ({ page = 1 }) => {
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data.data) {
      setNewUpdates({ total: data.total, manga: data.data });
    }
  };

  const fetchMangaPropose = async ({ page = 1 }) => {
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data.data) {
      setProposes(data.data.slice(0, 15));
    }
  };

  useEffect(() => {
    fetchMangaNewUpdate({ page: 1 });
    fetchMangaPropose({ page: 1 });
  }, []);

  return (
    <MangaContext.Provider
      value={{
        proposes,
        newUpdates,
        fetchMangaNewUpdate,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}
