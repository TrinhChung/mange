import { Col, Row } from 'antd';
import React from 'react';

const PostSuccess = () => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <Row
          style={{
            justifyContent: 'center',
            fontWeight: 'bold',
            color: 'var(--jade)',
            fontSize: 20,
            paddingBottom: 10,
          }}
        >
          Gửi thành công
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          Tác phẩm đang được kiểm duyệt vui lòng chờ
        </Row>
      </Col>
    </Row>
  );
};

export default PostSuccess;
