import { useState, useEffect, useContext, memo, useRef } from 'react';
import {
  Layout,
  Row,
  Col,
  Dropdown,
  Modal,
  Input,
  Badge,
  notification,
  Empty,
} from 'antd';
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
import DropdownCustom from './DropdownCustom';
import { getMangaNewUpdate } from '../../services/Guest/index';
import MangaSearch from '../manga/MangaSearch';
import { MangaContext } from '../../providers/mangaProvider/index';
import './Navbar.scss';
import NotifyCard from './NotifyCard';
import {
  getNotifications,
  readNotifications as readNotificationsService,
} from '../../services/User/index';

const { Header } = Layout;
const Navbar = ({ data }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { setHistoriesAccount } = useContext(MangaContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [current, setCurrent] = useState('home');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenNotify, setIsOpenNotify] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const wrapperDropdown = useRef(null);
  const wrapperDropdownNotify = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [results, setResults] = useState([]);
  const [notifyCount, setNotifyCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [change, setChange] = useState(false);
  const [key, setKey] = useState(
    searchParams.get('search') ? searchParams.get('search') : ''
  );

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleSearch = () => {
    if (key && key.length > 0) {
      searchParams.set('search', key);
    } else {
      searchParams.removeItem('search');
    }
    navigate('/search/?' + searchParams.toString());
  };

  const handleChangeInputSearch = async (e) => {
    setKey(e.target.value);
    if (e.target.value === null && e.target.value.length === 0) {
      navigate(window.location.pathname);
      setResults([]);
    } else {
      searchParams.set('search', e.target.value);
      navigate(window.location.pathname + `?search=${e.target.value}`);
      try {
        const data = await getMangaNewUpdate({
          page: 1,
          query: `&search=${e.target.value}`,
        });
        if (data && data.success === 1) {
          setResults(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  const fetchNotificationsService = async () => {
    try {
      const data = await getNotifications();
      if (data.success === 1) {
        console.log(data);
        setNotifyCount(data?.data.unread_count ? data.data.unread_count : 0);
        setNotifications(data?.data.notifications);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    if (authUser) {
    async function createSocket() {
    await window.echo
        .channel(`laravel_database_private-App.Models.User.${authUser.id}`)
        .notification((notification) => {
          console.log(notification);
          fetchNotificationsService();
        });
    }
    createSocket();
  }
  }, []);


   // Truyen them socket tai day
   useEffect(() => {
    console.log('connect');
    if (authUser) {
      fetchNotificationsService();
    }
  }, []);

  const readNotifications = async (ids) => {
    try {
      const data = await readNotificationsService(ids);
      if(data.success === 1) {
        setNotifyCount(data?.data.unread_count ? data.data.unread_count : 0);
        setNotifications(data?.data.notifications);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
    setHistoriesAccount([]);
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
    <Header className="box-shadow-bottom navbar-home">
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
          }}
        >
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
            ref={wrapperDropdown}
          >
            <Col span={20}>
              <Input
                placeholder="Tìm truyện"
                className="input-custom"
                defaultValue={key}
                size="large"
                onChange={handleChangeInputSearch}
                allowClear={true}
                onFocus={() => {
                  setIsOpenDropdown(true);
                }}
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
                <SearchOutlined
                  style={{ cursor: 'pointer', color: 'var(--color-main)' }}
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </Row>
            </Col>
            <DropdownCustom
              open={isOpenDropdown}
              setOpen={setIsOpenDropdown}
              parent={wrapperDropdown}
            >
              <Col style={{ maxHeight: 400, overflow: 'auto' }} span={24}>
                {results && results.length > 0 ? (
                  results.map((result) => {
                    return <MangaSearch manga={result} />;
                  })
                ) : (
                  <Col style={{ color: 'black', paddingLeft: 20 }}>
                    Không có kết quả
                  </Col>
                )}
              </Col>
            </DropdownCustom>
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
              <Col
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                ref={wrapperDropdownNotify}
              >
                <Badge count={notifyCount} offset={[10, -5]} overflowCount={10}>
                  <BellFilled
                    style={{ fontSize: '20px', cursor: 'pointer' }}
                    className="color-icon"
                    onClick={() => {
                      setIsOpenNotify(!isOpenNotify);
                    }}
                  />
                </Badge>

                <DropdownCustom
                  open={isOpenNotify}
                  setOpen={setIsOpenNotify}
                  parent={wrapperDropdownNotify}
                  width="370px"
                  left={-240}
                  //handleOnClose={readAllNotifications}
                >
                  <Col
                    span={24}
                    style={{ maxHeight: 400, overflow: 'auto', color: 'black' }}
                  >
                    <Row
                      style={{
                        fontWeight: 'bold',
                        lineHeight: '40px',
                        paddingLeft: 8,
                      }}
                    >
                      Danh sách thông báo
                    </Row>
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => {
                        return <NotifyCard notify={{... notification, ... notification.data}} handleClick={readNotifications} />;
                      })
                    ) : (
                      <Empty />
                    )}
                  </Col>
                </DropdownCustom>
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
