import React from 'react';
import { Col, Image, Row } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import AdImage from '../../../assets/image/cho-thue-bien-quang-cao.jpg';

const AdPanel = () => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Image src={AdImage} preview={false} />
        </Row>
      </Col>
    </Row>
  );
};

export default AdPanel;
