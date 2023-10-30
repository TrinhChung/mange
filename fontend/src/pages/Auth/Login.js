import React, { useState, useContext } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { role as ROLE } from '../../const';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';
import RowVertical from '../../components/layout/RowVertical';
import { AuthContext } from '../../providers/authProvider/index';
import { loginService } from '../../services/Auth';

const Login = () => {
  const { setAuthUser } = useContext(AuthContext);
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerLogin = async () => {
    const data = {
      role: ROLE[role].label,
      username: email,
      password: password,
    };
    try {
      const res = await loginService(data);
      if (res.data && res.data.user && res.data.token) {
        toast.success('Đăng nhập thành công!', 2);
        console.log(res.data.token);
        localStorage.setItem('accessToken', JSON.stringify(res.data.token));
        localStorage.setItem('authUser', JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        navigate('/');
      } else {
        toast.error('Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Col span={24}>
      <Row className="auth-container">
        <Col className={'wrap-box'}>
          <Row
            style={{
              paddingTop: 20,
              paddingBottom: 40,
              fontSize: 40,
              width: '100%',
              fontWeight: 'bold',
              color: 'var(--color-main)',
              textJustify: 'center',
              textAlign: 'center',
            }}
          >
            MANGE.COM
          </Row>
          <Row>
            <Col span={24} style={{ paddingRight: 40 }}>
              <Row>
                <Col span={24}>
                  <RowVertical title={'Tên đăng nhập'}>
                    <Input
                      style={{
                        marginBottom: 20,
                        width: '100%',
                        minWidth: 300,
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </RowVertical>

                  <RowVertical title={'Mật khẩu'}>
                    <Input
                      style={{ marginBottom: 20, minWidth: 300 }}
                      type={'password'}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </RowVertical>
                </Col>
              </Row>
              <Row
                style={{
                  paddingBottom: 15,
                  color: 'red',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/auth/forgot-password');
                }}
              >
                Quên mật khẩu
              </Row>
              <Row>
                <Col>
                  <button className="button-job" onClick={() => handlerLogin()}>
                    Đăng nhập
                  </button>
                </Col>
              </Row>
              <Row style={{ paddingTop: 40 }}>
                <Col>
                  <Row className="fs-20">Bạn chưa có tài khoản?</Row>
                  <Row
                    style={{
                      cursor: 'pointer',
                      color: 'var(--color-main)',
                    }}
                    onClick={() => {
                      navigate('/auth/signup');
                    }}
                  >
                    Đăng ký tài khoản tại đây
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Login;
