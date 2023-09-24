import { Row, Col } from 'antd';
import React from 'react';

const PostManga = () => {
  return (
    <Row className="box-content">
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        Post manga
      </Col>
    </Row>
  );
};

export default PostManga;
