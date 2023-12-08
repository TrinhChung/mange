import {
  Avatar,
  Col,
  Input,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';
import {
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import tableColumns from './TableColumns';
import {
  getAllUsers,
  updateActiveStatusUser,
} from '../../../../services/Admin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formatAvatarURL } from '../../../../utils/commonFunc';

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
  const [reload, setReload] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeStatusData, setActiveStatusData] = useState({
    userId: null,
    status: false,
  });

  const handleUpdateActiveStatusUser = async (userId, status) => {
    try {
      const res = await updateActiveStatusUser(userId, status);
      toast.success(res.message);
      setReload(!reload);
      setIsOpenModal(false);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await getAllUsers(page);
      if (res && res.status === 200) {
        setTotal(res.data.total);
        setUsers(
          res.data?.data
            ?.filter((user) => user.role === 'user')
            .map((user) => {
              return {
                avatar: formatAvatarURL(user.avatar),
                username: user.username,
                email: user.email,
                status: user.active ? (
                  <span style={{ color: '#45B3B4', fontWeight: 700 }}>
                    đã kích hoạt
                  </span>
                ) : (
                  <span style={{ color: '#F54558', fontWeight: 700 }}>
                    chưa kích hoạt
                  </span>
                ),
                action: (
                  <>
                    <EditOutlined />
                    {user.active ? (
                      <LockOutlined
                        style={{ color: '#F54558' }}
                        onClick={() => {
                          setIsOpenModal(true);
                          setActiveStatusData({ userId: user?.id, status: 0 });
                        }}
                      />
                    ) : (
                      <UnlockOutlined
                        style={{ color: '#45B3B4' }}
                        onClick={() => {
                          setIsOpenModal(true);
                          setActiveStatusData({ userId: user?.id, status: 1 });
                        }}
                      />
                    )}
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
  }, [page, reload]);

  return (
    <>
      <Row className="box-content">
        <TitleTopLeft title="Quản lý người dùng" itemList={breadcrumbData} />

        {/* <Col
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
      </Col> */}

        <Table
          style={{ marginTop: 16, width: '100%' }}
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
      <Modal
        title={`${
          activeStatusData.status === 0 ? 'Khóa' : 'Kích Hoạt'
        } tài khoản.`}
        open={isOpenModal}
        centered={true}
        onOk={() => {
          handleUpdateActiveStatusUser(
            activeStatusData.userId,
            activeStatusData.status
          );
        }}
        onCancel={() => setIsOpenModal(false)}
      >
        <p>{`Bạn có chắc chắc muốn ${
          activeStatusData.status === 0 ? 'Khóa' : 'Kích Hoạt'
        } tài khoản này ?`}</p>
      </Modal>
    </>
  );
};

export default AccountManagement;
