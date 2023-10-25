import React from 'react';
import { Col, Row, Skeleton } from 'antd';

const MangaSkeleton = ({ key = 0 }) => {
  return (
    <Col key={key} className="manga">
      <Row>
        <Skeleton.Image active={true} style={{ width: 150, height: 200 }} />
      </Row>
      <Row
        style={{
          paddingTop: 8,
          width: 150,
          fontWeight: 'bold',
          fontSize: 14,
        }}
      >
        <Skeleton />
      </Row>
    </Col>
  );
};

export default MangaSkeleton;
