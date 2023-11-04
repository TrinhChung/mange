import React from 'react'
import AvatarArea from '../../../components/profile/AvatarArea';
import NavigationArea from '../../../components/profile/NavigationArea';
import {
  InfoCircleOutlined,
  KeyOutlined,
  LogoutOutlined,  ReadOutlined,
} from '@ant-design/icons';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Col, Row } from 'antd';
import AccountManagement from './AccountManagement';
import StoryManagement from './StoryManagement';

const menu = [
  {
    content: 'Thông tin chung',
    path: null,
    icon: <InfoCircleOutlined />,
  },
  { content: 'Quản lý người dùng', path: '/management/account', icon: <ReadOutlined /> },
  { content: 'Quản lý truyện', path: '/management/story', icon: <ReadOutlined /> },
  { content: 'Đổi mật khẩu', path: null, icon: <KeyOutlined /> },
  { content: 'Đăng xuất', path: null, icon: <LogoutOutlined /> },
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
              <Route path="account" element={<AccountManagement />} />
              <Route path="story" element={<StoryManagement />} />
            </Routes>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Management