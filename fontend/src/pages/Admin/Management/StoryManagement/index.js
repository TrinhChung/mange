import { Col, Row } from 'antd';
import React from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý truyện',
    href: '/management/story',
  },
];
const StoryManagement = () => {
  return (
    <Row className="box-content">
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <TitleTopLeft title="Quản lý truyện" itemList={breadcrumbData} />
      </Col>
    </Row>
  );
};

export default StoryManagement;
