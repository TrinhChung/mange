import {
  Avatar,
  Col,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';
import { LockOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import tableColumns from './TableColumns';
import { getAllUsers } from '../../../../services/Admin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý tài khoản',
    href: '/profile/management-account',
  },
];
const AccountManagement = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers(page);
      console.log('data', res);
      if (res && res.status === 200) {
        setTotal(res.data.total);
        setUsers(
          res.data?.data
            ?.filter((user) => user.role === 'user')
            .map((user) => {
              return {
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                status: user.active ? (
                  <span style={{ color: '#45B3B4' }}>đã kích hoạt</span>
                ) : (
                  <span style={{ color: '#F54558' }}>chưa kích hoạt</span>
                ),
                action: (
                  <>
                    <EyeOutlined />
                    <EditOutlined />
                    <LockOutlined style={{ color: '#F54558' }} />
                  </>
                ),
              };
            })
        );
      }
    } catch (error) {
      toast.error('Không tìm thấy dữ liệu');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [page]);

  return (
    <Row className="box-content">
      <TitleTopLeft title="Quản lý người dùng" itemList={breadcrumbData} />

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
        dataSource={users}
        pagination={false}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 15,
        }}
      >
        <Pagination
          pageSize={10}
          showSizeChanger={false}
          defaultCurrent={1}
          total={total}
          onChange={(page) => setPage(page)}
        />
      </div>
    </Row>
  );
};

export default AccountManagement;
