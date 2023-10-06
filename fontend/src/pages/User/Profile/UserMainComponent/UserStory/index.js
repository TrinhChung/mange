import { Col, Row } from 'antd';
import React from 'react';
import StoryItem from './StoryItem';

const UserStory = ({ headerText: { text1, text2, text3 } }) => {
  return (
    <Col span={24}>
      <Row style={{ marginTop: 20 }}>
        <Col span={14}>
          <div className="color-main" style={{ fontSize: 14, fontWeight: 600 }}>
            {text1}
          </div>
        </Col>
        <Col span={5}>
          <div className="color-main" style={{ fontSize: 14, fontWeight: 600 }}>
            {text2}
          </div>
        </Col>
        <Col span={5}>
          <div className="color-main" style={{ fontSize: 14, fontWeight: 600 }}>
            {text3}
          </div>
        </Col>
      </Row>
      {[6, 76, 3, 4, 12, 94, 10, 123].map((item, index) => (
        <StoryItem
          manga={{
            image:
              'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg',
            name: 'Attack On Titan',
            chap: 100 + item,
          }}
          date1={'16 phút trước'}
          date2={'13 phút trước'}
        ></StoryItem>
      ))}
    </Col>
  );
};

export default UserStory;
