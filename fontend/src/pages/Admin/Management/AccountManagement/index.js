import { Col, Input, Row, Select } from 'antd';
import React from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý tài khoản',
    href: '/management/account',
  },
];
const AccountManagement = () => {
  return (
    <Row className="box-content">
      <TitleTopLeft title="Quản lý bình luận" itemList={breadcrumbData} />
      <Col
        span={24}
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 10,
          marginTop: 25,
        }}
      >
        BỘ LỌC
      </Col>
      <Col
        span={24}
        style={{
          marginBottom: 16,
          display: 'flex',
          gap: 20,
        }}
      >
        <InputGroup title={'Username'}>
          <Input name="username" placeholder="Nhập username" />
        </InputGroup>
        <InputGroup title={'Trình trạng'}>
          <Select
            defaultValue="activated"
            style={{ width: 120 }}
            options={[
              { value: 'activated', label: 'Đã kích hoạt' },
              { value: 'not-activated', label: 'Chưa kích hoạt' },
            ]}
          />
        </InputGroup>
        <InputGroup title={'Trạng thái'}>
          <Select
            defaultValue="locked"
            style={{ width: 120 }}
            options={[{ value: 'locked', label: 'Đã bị khóa' }]}
          />
        </InputGroup>
        <Row
          className="button-view bg-color-gray"
          style={{ alignSelf: 'flex-end' }}
        >
          Lọc
        </Row>
      </Col>
    </Row>
  );
};

export default AccountManagement;
