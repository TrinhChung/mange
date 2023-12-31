import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import HomeLayout from '../../layouts/HomeLayout';
import LinkCustom from '../../components/layout/LinkCustom';
import DetailManga from './DetailManga';
import DetailChapter from './DetailChapter';
import Auth from '../Auth';
import TestUploadChapter from './TestUploadChapter';
import History from './History';
import Search from './Search';
import Follow from './Follow';
import WrapCategory from '../../components/layout/WrapCategory';

const Guest = () => {
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
      label: <LinkCustom to={'/history'} label={<WrapCategory />} />,
      key: 'category',
    },
    {
      label: <LinkCustom to={'/search'} label="Tìm kiếm" />,
      key: 'search',
    },
  ];

  const wrapLayout = (children) => {
    return <HomeLayout menu={items}>{children}</HomeLayout>;
  };

  return (
    <Routes>
      <Route path="/" element={wrapLayout(<Home />)} />
      <Route path="/detail-manga/:name" element={wrapLayout(<DetailManga />)} />
      <Route
        path="/live-manga/:name/:id"
        element={wrapLayout(<DetailChapter />)}
      />
      <Route
        path="/test-upload-chapter"
        element={wrapLayout(<TestUploadChapter />)}
      />
      <Route path="/auth/*" element={wrapLayout(<Auth />)} />
      <Route path="/history" element={wrapLayout(<History />)} />
      <Route path="/follow" element={wrapLayout(<Follow />)} />
      <Route path="/search" element={wrapLayout(<Search />)} />
      <Route path="/*" element={wrapLayout(<div>Chua dinh nghia</div>)} />
    </Routes>
  );
};

export default Guest;
