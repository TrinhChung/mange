import { createContext, useState, useEffect, useContext } from 'react';
import { getMangaNewUpdate, getCategories } from '../../services/Guest/index';
import { AuthContext } from '../authProvider';
import { getHistories } from '../../services/User/index';
import { buildHistories } from '../../utils/commonFunc';

export const MangaContext = createContext();
export default function MangaProvider({ children }) {
  const { authUser } = useContext(AuthContext);
  const [newUpdates, setNewUpdates] = useState({ total: 1, manga: [] });
  const [loadingNewUpdate, setLoadingNewUpdate] = useState(true);
  const [loadingPropose, setLoadingPropose] = useState(true);
  const [proposes, setProposes] = useState([]);
  const [currentPageNewUpdate, setCurrentPageNewUpdate] = useState(1);
  const [histories, setHistories] = useState([]);
  const [historiesAccount, setHistoriesAccount] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topMangaWeek, setTopMangaWeek] = useState([]);
  const [topMangaMonth, setTopMangaMonth] = useState([]);

  const fetchMangaNewUpdate = async ({ page = 1 }) => {
    setLoadingNewUpdate(true);
    setCurrentPageNewUpdate(page);
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data.data) {
      setNewUpdates({ total: data.meta.last_page, manga: data.data });
    }
    setLoadingNewUpdate(false);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    if (data.status === 200 && data.data) {
      setCategories(data.data);
    }
  };

  const fetchMangaPropose = async ({ page = 1 }) => {
    const data = await getMangaNewUpdate({ page: page });
    if (data.status === 200 && data?.data) {
      setProposes(data.data.slice(0, 15));
    }
  };

  const fetchTopManga = async ({ page = 1, per_page = 10 }) => {
    try {
      const query = `&sort=-top_view_count&time=month`;
      const data = await getMangaNewUpdate({
        page: page,
        per_page: per_page,
        query: query,
      });
      if (data.status === 200 && data?.data) {
        setTopMangaMonth(data.data);
      }

      const newQuery = `&sort=-top_view_count&time=week`;
      const dataWeek = await getMangaNewUpdate({
        page: page,
        per_page: per_page,
        query: newQuery,
      });
      if (dataWeek.status === 200 && dataWeek?.data) {
        setTopMangaWeek(dataWeek.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMangaHistory = async () => {
    const histories =
      localStorage.getItem('histories') !== null
        ? JSON.parse(localStorage.getItem('histories'))
        : [];
    setHistories(histories);

    if (authUser) {
      try {
        const data = await getHistories();
        if (data.status === 200 && data?.data) {
          const historyData = buildHistories(data.data);
          setHistoriesAccount([...historyData]);
          const syncHistories = historyData.splice(0, 10);
          if (histories.length === 0) {
            setHistories(syncHistories);
            localStorage.setItem('histories', JSON.stringify(syncHistories));
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    fetchMangaHistory();
  }, [authUser]);

  useEffect(() => {
    fetchMangaNewUpdate({ page: 1 });
    fetchMangaPropose({ page: 1 });
    fetchCategories();
    fetchTopManga({ page: 1 });
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
        categories,
        topMangaWeek,
        topMangaMonth,
        historiesAccount,
        fetchMangaNewUpdate,
        setHistories,
        fetchTopManga,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
}
