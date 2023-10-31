import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Guest/home';
import HomeLayout from '../../layouts/HomeLayout';
import DetailManga from '../Guest/DetailManga';
import Profile from './Profile';
import LinkCustom from '../../components/layout/LinkCustom';
import DetailChapter from '../Guest/DetailChapter';
import History from '../Guest/History';

const User = () => {
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
      label: <LinkCustom to={'/category/'} label="Thể loại" />,
      key: 'category',
    },
  ];
  return (
    <HomeLayout menu={items}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail-manga/:name" element={<DetailManga />} />
        <Route path="/live-manga/:name/:id" element={<DetailChapter />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </HomeLayout>
  );
};

export default User;
