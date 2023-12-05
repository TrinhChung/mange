import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Spin } from 'antd';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/authProvider/index';
import FormItemVertical from '../../components/form/FormItemVertical';
import { signupService } from '../../services/Auth/index';
import { toast } from 'react-toastify';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await signupService(values);
      if (res.success === 1) {
        toast.success('Đăng ký thành công!', 2);
        navigate('/auth/login');
      } else {
        toast.error('Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      for (let err in error?.errors) {
        toast.error(error?.errors[err][0]);
      }
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading} tip="Loading">
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
                <Row>
                  <Col span={24}>
                    <Form onFinish={onFinish}>
                      <FormItemVertical
                        name={'email'}
                        label={'Email'}
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
                        />
                      </FormItemVertical>
                      <FormItemVertical
                        name={'username'}
                        label={'Tên đăng nhập'}
                        rules={[
                          {
                            required: true,
                            message: 'Nhập username vào!',
                          },
                        ]}
                      >
                        <Input
                          style={{
                            width: '100%',
                            minWidth: 300,
                          }}
                        />
                      </FormItemVertical>

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
                        name={'resetPassword'}
                        label={'Nhập lại mật khẩu'}
                        dependencies={['password']}
                        rules={[
                          {
                            required: true,
                            message: 'Nhập lại password vào!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
                              ) {
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
                            Đăng ký
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>

                <Row style={{ paddingTop: 40 }}>
                  <Col>
                    <Row className="fs-20">Bạn đã có tài khoản?</Row>
                    <Row
                      style={{
                        cursor: 'pointer',
                        color: 'var(--color-main)',
                      }}
                      onClick={() => { navigate('/auth/login'); }}
                    >
                      Đăng nhập tại đây
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

export default Register;
