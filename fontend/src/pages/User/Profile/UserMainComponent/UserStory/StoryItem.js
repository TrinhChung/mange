import { Col, Image, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './story-item.scss';
import { trimString } from '../../../../../utils/commonFunc';
import { hostImg } from '../../../../../const';

const StoryItem = ({ manga }) => {
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
      <Col style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Image
          src={manga ? hostImg + manga.thumbnail : null}
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
            Chapter {manga.chap ? manga.chap : 100}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default StoryItem;
