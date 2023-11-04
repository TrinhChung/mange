import { Row } from 'antd';
import React from 'react';

const InputGroup = ({ title, children }) => {
  return (
    <Row span={24} style={{ flexDirection: 'column' }}>
      <span style={{ fontSize: 14, fontWeight: 700 }}>{title}</span>
      <div style={{ flexGrow: 1 }}>{children}</div>
    </Row>
  );
};

export default InputGroup;
