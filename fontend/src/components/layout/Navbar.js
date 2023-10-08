import { useState, useEffect, useContext, memo } from 'react';
import { Layout, Row, Col, Dropdown, Modal, Input } from 'antd';
import {
  BellFilled,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/authProvider';
import { logoutService } from '../../services/Auth';

const { Header } = Layout;
const Navbar = ({ data }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [key, setKey] = useState(
    searchParams.get('searchInput') ? searchParams.get('searchInput') : ''
  );

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    if (pathname) {
      const pathArr = pathname.split('/');
      if (pathArr[1] === '') {
        pathArr[1] = 'home';
      }
      setCurrent(pathArr[1]);
    }
  }, [pathname]);

  const onLogout = async () => {
    try {
      const res = await logoutService();
      if (res.status === 200) {
        toast.success('Đã đăng xuất');
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authUser');
    setAuthUser(null);
    setIsOpenModal(false);

    navigate('/');
  };

  const items = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      setIsOpenModal(true);
    } else {
      navigate(`/${e.key}/`);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header
      style={{
        backgroundColor: 'var(--color-main)',
        padding: 0,
        margin: 0,
        position: 'sticky',
        top: 0,
        width: '100%',
        height: 'var(--height-navbar)',
        zIndex: 1,
        color: 'white',
      }}
      className="box-shadow-bottom"
    >
      <Row>
        <Col
          span={12}
          style={{
            height: 60,
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Menu
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              height: 55,
              backgroundColor: 'var(--color-main)',
              color: 'white',
            }}
            onClick={(e) => {
              onClick(e);
            }}
            selectedKeys={[current]}
            mode="horizontal"
            items={data}
          />
        </Col>

        <Col
          span={7}
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            paddingLeft: 55,
            color: 'var(--color-main)',
          }}
        >
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Col span={20}>
              <Input
                placeholder="Tìm kiếm"
                className="input-custom"
                defaultValue={searchParams.get('searchInput')}
                size="large"
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                allowClear={true}
              />
            </Col>

            <Col span={4} style={{ alignItems: 'center' }}>
              <Row
                style={{
                  background: 'white',
                  height: 38,
                  justifyContent: 'center',
                }}
              >
                <SearchOutlined />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={5} style={{ paddingRight: 29 }}>
          {authUser ? (
            <Row
              style={{
                justifyContent: 'flex-end',
                fontSize: '20px!important',
                gap: 10,
              }}
            >
              <Col>
                <BellFilled
                  style={{ fontSize: '20px' }}
                  className="color-icon"
                />
              </Col>
              <Col>|</Col>
              <Dropdown menu={menuProps} trigger={['click']}>
                <Row style={{ gap: 5, cursor: 'pointer' }}>
                  <Col>
                    <UserOutlined style={{ fontSize: '20px' }} />
                  </Col>
                  <Col>
                    <div>{authUser?.username}</div>
                  </Col>
                </Row>
              </Dropdown>
            </Row>
          ) : (
            <Row
              style={{
                justifyContent: 'flex-end',
                fontSize: '20px!important',
                gap: 10,
              }}
            >
              <Row
                style={{ gap: 5, cursor: 'pointer' }}
                onClick={() => {
                  navigate('/auth/login');
                }}
              >
                <Col>
                  <LogoutOutlined style={{ fontSize: '20px' }} />
                </Col>
                <Col>
                  <div>Đăng nhập</div>
                </Col>
              </Row>
            </Row>
          )}
        </Col>
      </Row>
      <Modal
        title="Đăng xuất"
        open={isOpenModal}
        centered={true}
        onOk={() => {
          onLogout();
        }}
        onCancel={() => setIsOpenModal(false)}
      >
        <p>'Bạn có muốn đăng xuất không?'</p>
      </Modal>
    </Header>
  );
};

export default memo(Navbar);
