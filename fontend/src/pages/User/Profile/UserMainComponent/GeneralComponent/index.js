import { Card, Col, Row } from 'antd';
import React, { useContext } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import { AuthContext } from '../../../../../providers/authProvider';
import moment from 'moment';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'User',
  },
  {
    title: 'Thông tin chung',
    href: '/profile/general',
  },
];
const GeneralComponent = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  return (
    <Row className="box-content">
      <TitleTopLeft title="Thông tin chung" itemList={breadcrumbData} />

      <Col
        span={24}
        style={{ margin: '24px 0', backgroundColor: '#eee', borderRadius: 8 }}
      >
        <Row span={24} style={{ alignItems: 'center', margin: 16 }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Tên tài khoản:</span>
          <div style={{ flexGrow: 1 }}>{authUser?.username}</div>
        </Row>

        <Row span={24} style={{ alignItems: 'center', margin: 16 }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Địa chỉ Email:</span>
          <div style={{ flexGrow: 1 }}>{authUser?.email}</div>
        </Row>

        <Row span={24} style={{ alignItems: 'center', margin: 16 }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Trạng thái:</span>
          <div
            style={{ flexGrow: 1 }}
            className={authUser?.active === 1 ? 'color-jade' : 'color-main'}
          >
            {authUser?.active === 1 ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
          </div>
        </Row>

        <Row span={24} style={{ alignItems: 'center', margin: 16 }}>
          <span style={{ fontSize: 14, minWidth: 130 }}>Ngày kích hoạt:</span>
          <div style={{ flexGrow: 1 }}>
            {moment(authUser?.activated_at).format('DD/MM/YYYY')}
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default GeneralComponent;
