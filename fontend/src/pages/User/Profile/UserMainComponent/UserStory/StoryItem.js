import { Col, Image, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoryItem = ({ manga, date1, date2 }) => {
  const navigate = useNavigate();
  return (
    <Row
      className="story-item"
      onClick={() => {
        if (manga?.id) {
          navigate(`/detail-manga/${manga.id}`);
        }
      }}
    >
      <Col span={14} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Image
          src={manga ? manga.image : null}
          preview={false}
          width={60}
          height={80}
        />
        <div>
          <div
            style={{
              color: 'var(--gray)',
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {manga.name}
          </div>
          <div
            style={{
              color: 'var(--gray)',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Chapter {manga.chap}
          </div>
        </div>
      </Col>
      <Col span={5}>
        <div style={{ color: 'var(--gray)', fontSize: 12 }}>{date1}</div>
      </Col>
      <Col span={5}>
        <div style={{ color: 'var(--gray)', fontSize: 12 }}>{date2}</div>
      </Col>
    </Row>
  );
};

export default StoryItem;
