import { Col, Input, Row, message } from 'antd';
import React, { useContext, useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import InputGroupContainer from './InputGroupContainer';
import { toast } from 'react-toastify';
import { changePasswordMe } from '../../../../../services/User';
import { AuthContext } from '../../../../../providers/authProvider';

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
  const { authUser } = useContext(AuthContext);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onChangePasswordData = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const onSubmitPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận phải trùng khớp.');
      return;
    }

    try {
      const data = await changePasswordMe({
        email: authUser.email,
        password: passwordData.newPassword,
      });
      if (data.status === 200) {
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Row className="box-content">
      <TitleTopLeft title="Đổi mật khẩu" itemList={breadcrumbData} />
      <Col span={24} style={{ marginBottom: 16 }}>
        <InputGroupContainer title={'Mật khẩu hiện tại:'}>
          <Input.Password
            onChange={onChangePasswordData}
            name="currentPassword"
            value={passwordData.username}
            placeholder="Nhập Mật khẩu hiện tại"
          />
        </InputGroupContainer>
        <InputGroupContainer title={'Mật khẩu mới:'}>
          <Input.Password
            onChange={onChangePasswordData}
            name="newPassword"
            value={passwordData.email}
            placeholder="Nhập Mật khẩu mới"
          />
        </InputGroupContainer>
        <InputGroupContainer title={'Xác nhận mật khẩu:'}>
          <Input.Password
            onChange={onChangePasswordData}
            name="confirmPassword"
            value={passwordData.email}
            placeholder="Xác nhận mật khẩu mới"
          />
        </InputGroupContainer>
      </Col>
      <Col className="button-view bg-color-jade" onClick={onSubmitPassword}>
        Cập nhật
      </Col>
    </Row>
  );
};

export default ChangePasswordComponent;
