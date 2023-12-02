import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Row, Col, Input, Spin, Form } from 'antd';
import FormItemVertical from '../../components/form/FormItemVertical';
import { useState } from 'react';
import { resetPasswordService } from '../../services/Auth/index';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await resetPasswordService({
        ...values,
        reset_token: searchParams.get('token'),
      });
      if (res.success === 1) {
        toast.success('Đổi mật khẩu thành công!');
        navigate('/auth/login');
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
                    name={'password'}
                    label={'Mật khẩu'}
                    rules={[
                      {
                        required: true,
                        message: 'Nhập password vào!',
                      },
                    ]}
                  >
                    <Input style={{ minWidth: 300 }} type={'password'} />
                  </FormItemVertical>
                  <FormItemVertical
                    name={'password_confirm'}
                    label={'Nhập lại mật khẩu'}
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Nhập lại password vào!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Password không giống Nhập lại!')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input style={{ minWidth: 300 }} type={'password'} />
                  </FormItemVertical>
                  <Row>
                    <Col>
                      <button className="button-job" htmlType="submit">
                        Thay đổi mật khẩu
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
                        navigate('/auth/logiin');
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

export default ResetPassword;
