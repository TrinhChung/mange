import React from 'react';
import { Col, Row } from 'antd';
import NavigationItem from '../layout/NavigationItem';
import {
  InfoCircleOutlined,
  UserOutlined,
  KeyOutlined,
  ReadOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NavigationArea = ({ menu = [] }) => {
  const navigate = useNavigate();

  return (
    <Row
      className="box-content"
      style={{ justifyContent: 'center', marginRight: 10 }}
    >
      {menu.length > 0 &&
        menu.map((item) => {
          return (
            <NavigationItem
              startIcon={item.icon}
              content={item.content}
              action={() => navigate(item.path)}
            />
          );
        })}
    </Row>
  );
};

export default NavigationArea;
