import { Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import InputGroupContainer from './InputGroupContainer';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'User',
  },
  {
    title: 'Đổi mật khẩu',
    href: '/profile/change-password',
  },
];
const ChangePasswordComponent = () => {
  const [userInfoData, setUserInfoData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onChangeUserInfoData = (e) => {
    setUserInfoData({ ...userInfoData, [e.target.name]: e.target.value });
  };

  return (
    <Row className="box-content">
      <TitleTopLeft title="Đổi mật khẩu" itemList={breadcrumbData} />
      <Col span={24} style={{ marginBottom: 16 }}>
        <InputGroupContainer title={'Mật khẩu hiện tại:'}>
          <Input
            onChange={onChangeUserInfoData}
            name="username"
            value={userInfoData.username}
            placeholder="Nhập Mật khẩu hiện tại"
          />
        </InputGroupContainer>
        <InputGroupContainer title={'Mật khẩu mới:'}>
          <Input
            onChange={onChangeUserInfoData}
            name="email"
            value={userInfoData.email}
            placeholder="Nhập Mật khẩu mới"
          />
        </InputGroupContainer>
        <InputGroupContainer title={'Xác nhận mật khẩu:'}>
          <Input
            onChange={onChangeUserInfoData}
            name="email"
            value={userInfoData.email}
            placeholder="Xác nhận mật khẩu mới"
          />
        </InputGroupContainer>
      </Col>
      <Col className="button-view bg-color-jade">Cập nhật</Col>
    </Row>
  );
};

export default ChangePasswordComponent;
