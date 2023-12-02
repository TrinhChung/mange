import React from 'react';
import { Row, Col, Input, Spin, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { forgotPasswordService } from '../../services/Auth/index';
import FormItemVertical from '../../components/form/FormItemVertical';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await forgotPasswordService(values);
      if (res.success === 1) {
        toast.success(
          'Đã gửi yêu cầu!Sử dụng mail nhận được để thay đổi mật khẩu'
        );
      } else {
        toast.error('Đã có lỗi xảy ra');
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading} tip="Đang gửi yêu cầu...">
      <Col span={24} className="wrap-auth">
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
                <Form onFinish={onFinish}>
                  <FormItemVertical
                    name={'email'}
                    label={'Email đăng ký'}
                    rules={[
                      {
                        type: 'email',
                        message: 'Nhập mail cẩn thận vào!',
                      },
                      {
                        required: true,
                        message: 'Nhập cái mail vào!',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: '100%',
                        minWidth: 300,
                      }}
                      placeholder="Nhập email đăng ký tài khoản tại đây"
                    />
                  </FormItemVertical>
                  <Row>
                    <Col>
                      <button className="button-job" htmlType="submit">
                        Gửi yêu cầu
                      </button>
                    </Col>
                  </Row>
                </Form>

                <Row style={{ paddingTop: 40 }}>
                  <Col>
                    <Row className="fs-20">Nếu đã thay đổi mật khẩu?</Row>
                    <Row
                      style={{
                        cursor: 'pointer',
                        color: 'var(--color-main)',
                      }}
                      onClick={() => {
                        navigate('/auth/login');
                      }}
                    >
                      Quay lại trang đăng nhập
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Spin>
  );
};

export default ForgotPassword;
