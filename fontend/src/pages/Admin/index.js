import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from '../Guest/home';
import DetailManga from '../Guest/DetailManga';
import DetailChapter from '../Guest/DetailChapter';
import History from '../Guest/History';
import Search from '../Guest/Search';
import LinkCustom from '../../components/layout/LinkCustom';
import HomeLayout from '../../layouts/HomeLayout';
import Management from './Management';

const Admin = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: 'home',
    },
    {
      label: <LinkCustom to={'/history'} label="Lịch sử" />,
      key: 'history',
    },
    {
      label: <LinkCustom to={'/follow'} label="Theo dõi" />,
      key: 'follow',
    },
    {
      label: <LinkCustom to={'/search'} label="Tìm kiếm" />,
      key: 'search',
    },
    {
      label: <LinkCustom to={'/category'} label="Thể loại" />,
      key: 'category',
    },
  ];

  return (
    <HomeLayout menu={items}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-manga/:name" element={<DetailManga />} />
        <Route path="/live-manga/:name/:id" element={<DetailChapter />} />
        <Route path="/profile/*" element={<Management />} />
        <Route path="/history" element={<History />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </HomeLayout>
  );
};

export default Admin;
