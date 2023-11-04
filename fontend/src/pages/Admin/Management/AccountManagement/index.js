import { Avatar, Col, Input, Radio, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';
import { LockOutlined, EyeOutlined } from '@ant-design/icons';
import tableColumns from './TableColumns';

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

const data = [
  {
    avatar:
      'https://i.pinimg.com/736x/51/49/72/514972e25d1c76189370487711117de1.jpg',
    displayName: 'Tran Tu',
    username: 'tuchan',
    email: 'trananhtu12345@gmail.com',
    status: <span style={{ color: '#45B3B4' }}>đã kích hoạt</span>,
    action: (
      <>
        <EyeOutlined />
        <LockOutlined style={{ color: '#F54558' }} />
      </>
    ),
    role: 'user'
  },
  {
    avatar:
      'https://i.pinimg.com/736x/51/49/72/514972e25d1c76189370487711117de1.jpg',
    displayName: 'Trinh Van Chung',
    username: 'tuchan',
    email: 'trananhtu12345@gmail.com',
    status: <span style={{ color: '#F54558' }}>chờ duyệt</span>,
    action: (
      <>
        <EyeOutlined />
        <LockOutlined style={{ color: '#F54558' }} />
      </>
    ), role: 'translator'
  },
  {
    avatar:
      'https://i.pinimg.com/736x/51/49/72/514972e25d1c76189370487711117de1.jpg',
    displayName: 'Nguyen Bach',
    username: 'tuchan',
    email: 'trananhtu12345@gmail.com',
    status: <span style={{ color: '#F54558' }}>chưa kích hoạt</span>,
    action: (
      <>
        <EyeOutlined />
        <LockOutlined style={{ color: '#F54558' }} />
      </>
    ), role: 'user'
  },
  {
    avatar:
      'https://i.pinimg.com/736x/51/49/72/514972e25d1c76189370487711117de1.jpg',
    displayName: 'Dao Duc Hiep',
    username: 'tuchan',
    email: 'trananhtu12345@gmail.com',
    status: <span style={{ color: '#9F73C1' }}>đã duyệt</span>,
    action: (
      <>
        <EyeOutlined />
        <LockOutlined style={{ color: '#F54558' }} />
      </>
    ), role: 'translator'
  },
];
const optionsData = [
  { label: 'Người dùng', value: 'user' },
  { label: 'Dịch giả', value: 'translator' },
];

const AccountManagement = () => {
  const [roleOptionValue, setRoleOptionValue] = useState('user');
  const onChangeRoleOptionValue = ({ target: { value } }) => {
    setRoleOptionValue(value);
  };

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
        <Radio.Group
          options={optionsData}
          optionType="button"
          buttonStyle="solid"
          defaultValue={"user"}
          value={roleOptionValue}
          onChange={onChangeRoleOptionValue}
        />
      </Col>

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
            style={{ width: 150 }}
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

      <Table
        style={{ width: '100%' }}
        columns={tableColumns}
        dataSource={data.filter(item => item.role === roleOptionValue)}
        pagination={false}
      />
    </Row>
  );
};

export default AccountManagement;
