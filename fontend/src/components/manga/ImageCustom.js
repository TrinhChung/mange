import React, { useEffect, useState } from 'react';
import { Alert, Space, Spin, Col, Row } from 'antd';

const ImageCustom = ({ src = '', index = 0 }) => {
  const [status, setStatus] = useState(false);

  return (
    <Col span={24}>
      <img
        key={index}
        className={`${status ? 'show' : 'hide'}`}
        onLoad={() => {
          setStatus(true);
        }}
        src={src ? src : ''}
        style={{ width: '100%', height: '100%' }}
        loading="lazy"
      />
      {status === false && (
        <Row style={{ justifyContent: 'center', padding: '30px 0px' }}>
          <Spin size="large" />
        </Row>
      )}
    </Col>
  );
};

export default ImageCustom;
