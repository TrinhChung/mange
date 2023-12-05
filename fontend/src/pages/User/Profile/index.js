import { Col, Row } from 'antd';
import React from 'react';
import NavigationArea from '../../../components/profile/NavigationArea';
import { useLocation, Routes, Route } from 'react-router-dom';
import GeneralComponent from './UserMainComponent/GeneralComponent';
import ChangePasswordComponent from './UserMainComponent/ChangePasswordComponent';
import FollowingComponent from './UserMainComponent/FollowingComponent';
import PostedComponent from './UserMainComponent/PostedComponent';
import AvatarArea from '../../../components/profile/AvatarArea';
import {
  InfoCircleOutlined,
  UserOutlined,
  KeyOutlined,
  ReadOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import PostManga from './UserMainComponent/PostManga';
import History from '../../Guest/History';

const menu = [
  {
    content: 'Thông tin chung',
    path: '/profile',
    icon: <InfoCircleOutlined />,
  },
  // { content: 'Hồ sơ cá nhân', path: '/profile/', icon: <UserOutlined /> },
  {
    content: 'Truyện đang theo dõi',
    path: '/profile/following',
    icon: <ReadOutlined />,
  },
  {
    content: 'Truyện đã đăng',
    path: '/profile/posted',
    icon: <ReadOutlined />,
  },
  // { content: 'Tải truyện lên', path: '/profile/post', icon: <KeyOutlined /> },
  {
    content: 'Đổi mật khẩu',
    path: '/profile/change-password',
    icon: <KeyOutlined />,
  },
];

const Profile = () => {
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
              <Route path="following" element={<FollowingComponent />} />
              <Route path="posted" element={<PostedComponent />} />
              <Route
                path="change-password"
                element={<ChangePasswordComponent />}
              />
              <Route path="post" element={<PostManga />} />
            </Routes>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Profile;
