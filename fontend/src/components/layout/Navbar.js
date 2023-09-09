import { useState, useEffect, useContext, memo } from "react";
import { Layout, Row, Col, Dropdown, Modal, Image } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/authProvider";
import { logoutService } from "../../services/Auth";

const { Header } = Layout;
const Navbar = ({ data }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    console.log(current);
    if (pathname) {
      const pathArr = pathname.split("/");
      if (pathArr[1] === "") {
        console.log("path 1 null");
        pathArr[1] = "home";
      }
      setCurrent(pathArr[1]);
    }
  }, [pathname]);

  const onLogout = async () => {
    localStorage.removeItem("accessToken");
    setAuthUser(null);
    try {
      const res = await logoutService();
      if (res.success) {
        toast.success("Đã đăng xuất");
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      console.log(error);
    }

    navigate("/login");
  };

  const items = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <UserOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
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
        backgroundColor: "white",
        padding: 0,
        margin: 0,
        position: "sticky",
        top: 0,
        width: "100%",
        height: 60,
        zIndex: 1,
      }}
      className="box-shadow-bottom"
    >
      <Row>
        <Col
          span={5}
          style={{
            fontSize: 50,
            fontWeight: "bold",
            paddingLeft: 55,
            color: "var(--color-main)",
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <Link
              to={"/"}
              style={{ color: "var(--color-main)" }}
              onClick={() => setCurrent("home")}
            >
              {/* <Image src={LogoNavbar} height={50} preview={false} /> */}
            </Link>
          </Row>
        </Col>
        <Col span={14} style={{ height: 60 }}>
          <Menu
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            onClick={(e) => {
              onClick(e);
            }}
            selectedKeys={[current]}
            mode="horizontal"
            items={data}
          />
        </Col>
        <Col span={5} style={{ paddingRight: 29 }}>
          <Row
            style={{
              justifyContent: "flex-end",
              fontSize: "20px!important",
              gap: 10,
            }}
          >
            <Col>
              <BellFilled style={{ fontSize: "20px" }} className="color-icon" />
            </Col>
            <Col>|</Col>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Row style={{ gap: 5, cursor: "pointer" }}>
                <Col>
                  <UserOutlined style={{ fontSize: "20px" }} />
                </Col>
                <Col>
                  <div>{authUser?.fullname}</div>
                </Col>
              </Row>
            </Dropdown>
          </Row>
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
