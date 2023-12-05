import { Col, Row } from 'antd';
import React from 'react';
import StoryItem from './StoryItem';
import { hostImg } from '../../../../../const';

const UserStory = ({ headerText: { text1, text2, text3 }, follows }) => {
  return (
    <Col span={24}>
      <Row style={{ marginTop: 20 }}>
        <Col span={14}>
          <div className="color-main" style={{ fontSize: 15, fontWeight: 600 }}>
            {text1}
          </div>
        </Col>
      </Row>
      {follows &&
        follows.map((item, index) => (
          <StoryItem
            manga={{
              id: item.id,
              image: item?.thumbnail ? hostImg + item.thumbnail : '',
              name: item.name,
              chap: item?.chapter ? item.chapter : '100',
            }}
          ></StoryItem>
        ))}
    </Col>
  );
};

export default UserStory;
