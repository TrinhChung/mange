import { createContext, useState, useEffect } from 'react';
import { getMangaNewUpdate } from '../../services/Guest/index';
import { proposes } from '../../pages/Guest/home/index';

export const MangaContext = createContext();
export default function MangaProvider({ children }) {
  const [newUpdates, setNewUpdates] = useState({ total: 1, manga: [] });
  const [loadingNewUpdate, setLoadingNewUpdate] = useState(true);
  const [loadingPropose, setLoadingPropose] = useState(true);
  const [proposes, setProposes] = useState([]);
  const [currentPageNewUpdate, setCurrentPageNewUpdate] = useState(1);
  const [histories, setHistories] = useState([]);

  const fetchMangaNewUpdate = async ({ page = 1 }) => {
    setLoadingNewUpdate(true);
    setCurrentPageNewUpdate(page);
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data.data) {
      setNewUpdates({ total: data.total, manga: data.data });
    }
    setLoadingNewUpdate(false);
  };

  const fetchMangaPropose = async ({ page = 1 }) => {
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data.data) {
      setProposes(data.data.slice(0, 15));
    }
  };

  const fetchMangaHistory = () => {
    const histories =
      localStorage.getItem('histories') !== null
        ? JSON.parse(localStorage.getItem('histories'))
        : [];
    setHistories(histories);
  };

  useEffect(() => {
    fetchMangaNewUpdate({ page: 1 });
    fetchMangaPropose({ page: 1 });
    fetchMangaHistory();
  }, []);

  return (
    <MangaContext.Provider
      value={{
        loadingPropose,
        loadingNewUpdate,
        proposes,
        currentPageNewUpdate,
        newUpdates,
        histories,
        fetchMangaNewUpdate,
        setHistories,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}
