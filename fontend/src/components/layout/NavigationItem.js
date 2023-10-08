import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RightOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

const NavigationItem = ({ startIcon = null, content, action }) => {
  return (
    <Row
      onClick={action}
      style={{
        color: 'var(--gray)',
        height: 36,
        fontSize: 16,
        alignItems: 'center',
      }}
    >
      <Col style={{ minWidth: 25 }}>{startIcon}</Col>
      <Col style={{ cursor: 'pointer', minWidth: 200 }}>{content}</Col>
      <Col>
        <RightOutlined />
      </Col>
    </Row>
  );
};

export default NavigationItem;
