import React from 'react';
import AvatarArea from '../../../components/profile/AvatarArea';
import NavigationArea from '../../../components/profile/NavigationArea';
import {
  InfoCircleOutlined,
  KeyOutlined,
  LogoutOutlined,
  FlagOutlined,
  ReadOutlined,
} from '@ant-design/icons';

import { Route, Routes, useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import AccountManagement from './AccountManagement';
import StoryManagement from './StoryManagement';
import CommentManagement from './CommentManagement';
import GeneralComponent from '../../User/Profile/UserMainComponent/GeneralComponent';
import ChangePasswordComponent from '../../User/Profile/UserMainComponent/ChangePasswordComponent';
import PostedComponent from '../../User/Profile/UserMainComponent/PostedComponent';
import PostManga from '../../User/Profile/UserMainComponent/PostManga';

const menu = [
  {
    content: 'Thông tin chung',
    path: '/profile/',
    icon: <InfoCircleOutlined />,
  },
  {
    content: 'Quản lý người dùng',
    path: '/profile/management-account',
    icon: <ReadOutlined />,
  },
  {
    content: 'Bình luận bị báo cáo',
    path: '/profile/management-comment',
    icon: <FlagOutlined />,
  },
  {
    content: 'Quản lý truyện',
    path: '/profile/management-story',
    icon: <ReadOutlined />,
  },
  {
    content: 'Truyện đã đăng',
    path: '/profile/posted',
    icon: <ReadOutlined />,
  },
  {
    content: 'Đổi mật khẩu',
    path: '/profile/change-password',
    icon: <KeyOutlined />,
  },
];

const Management = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Row style={{ justifyContent: 'center', marginTop: 20 }}>
      <Col span={18}>
        <Row>
          <Col span={8}>
            <AvatarArea />
            <NavigationArea menu={menu} />
          </Col>
          <Col span={16}>
            <Routes>
              <Route path="/" element={<GeneralComponent />} />
              <Route
                path="management-account"
                element={<AccountManagement />}
              />
              <Route
                path="management-comment"
                element={<CommentManagement />}
              />
              <Route path="management-story" element={<StoryManagement />} />
              <Route path="posted" element={<PostedComponent />} />
              <Route path="post" element={<PostManga />} />
              <Route
                path="change-password"
                element={<ChangePasswordComponent />}
              />
            </Routes>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Management;