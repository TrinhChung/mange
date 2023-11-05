import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Guest/home';
import HomeLayout from '../../layouts/HomeLayout';
import DetailManga from '../Guest/DetailManga';
import Profile from './Profile';
import LinkCustom from '../../components/layout/LinkCustom';
import DetailChapter from '../Guest/DetailChapter';
import History from '../Guest/History';
import Search from '../Guest/Search';
import Follow from '../Guest/Follow';
import { DownOutlined } from '@ant-design/icons';
import WrapCategory from '../../components/layout/WrapCategory';

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
      label: <LinkCustom to={'/search'} label={<WrapCategory />} />,
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
        <Route path="/search" element={<Search />} />
        <Route path="/follow" element={<Follow />} />
      </Routes>
    </HomeLayout>
  );
};

export default User;
