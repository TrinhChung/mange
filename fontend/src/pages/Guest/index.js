import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import HomeLayout from '../../layouts/HomeLayout';
import LinkCustom from '../../components/layout/LinkCustom';
import DetailManga from './DetailManga';
import DetailChapter from './DetailChapter';
import Auth from '../Auth';

const Guest = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: 'home',
    },
    {
      label: <LinkCustom to={'/job'} label="Mới ra mắt" />,
      key: 'job',
    },
    {
      label: <LinkCustom to={'/company'} label="Phổ biến" />,
      key: 'company',
    },
    {
      label: <LinkCustom to={'/category/'} label="Thể loại" />,
      key: 'category',
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
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/*" element={wrapLayout(<div>Chua dinh nghia</div>)} />
    </Routes>
  );
};

export default Guest;
