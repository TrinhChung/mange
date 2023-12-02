import React from 'react';
import { Col, Row, Form } from 'antd';

const FormItemVertical = ({
  children,
  label,
  name,
  rules,
  required = false,
  dependencies = [],
}) => {
  let customRules = rules;
  if (required === true && !rules) {
    customRules = [
      {
        required: true,
        message: `Missing ${label}`,
      },
    ];
  }
  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <Row className="title-container" style={{ fontSize: 20 }}>
          {label}
        </Row>
        <Form.Item
          wrapperCol={{ span: 24 }}
          name={name}
          style={{ width: '100%' }}
          rules={customRules}
          required={required}
          className="mg-10"
          dependencies={dependencies}
        >
          {children}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FormItemVertical;
