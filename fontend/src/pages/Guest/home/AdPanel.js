import React from 'react';
import { Col, Image, Row } from 'antd';
import { HeartFilled } from '@ant-design/icons';
const AdPanel = () => {
  const srcAd =
    'https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/302280884_1362762520919990_804811738996640840_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=52f669&_nc_ohc=Re8JM2rL9LkAX9RnGDm&_nc_ht=scontent.fhan5-10.fna&oh=00_AfCLxJiXm8P0wYMxdFzoAgYVOj0oqQKLMd0NR2KmFE-axQ&oe=6526E324';
  return (
    <Row className="box-content">
      <Col span={24}>
        <Row
          style={{
            fontSize: 26,
            color: '#FA383E',
            fontWeight: 'bold',
            paddingBottom: 20,
          }}
        >
          Đoàn Thị Thu Thảo
          <HeartFilled />
        </Row>
        <Row>
          <Image src={srcAd} preview={false} />
        </Row>
      </Col>
    </Row>
  );
};

export default AdPanel;
