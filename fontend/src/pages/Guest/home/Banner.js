import { Col, Image, Row } from 'antd';
import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

const Banner = ({ manga = null }) => {
  const navigate = useNavigate();

  return (
    <Row
      style={{
        width: '100%',
        position: 'relative',
        marginTop: 20,
        height: 300,
        marginBottom: 20,
      }}
    >
      <Col className="banner_manga" span={24} style={{ width: '100%' }}>
        <Image
          src={manga ? manga.image : null}
          height={300}
          width="100%"
          preview={false}
        />
      </Col>
      <Col
        style={{
          paddingLeft: '10%',
          paddingRight: '10%',
          paddingTop: 24,
          color: 'white',
        }}
        span={24}
      >
        <Row style={{ justifyContent: 'end', fontWeight: 'bold' }}>
          <div
            className="chip_chapter"
            onClick={() => {
              navigate('/live-manga/drstone-hoi-sinh-the-gioi/17697');
            }}
          >
            {manga?.chapter || 'Chapter 100'}
          </div>
        </Row>
        <Row className="name_manga">{manga ? manga.name : 'Name Manga'}</Row>
        <Row style={{ paddingBottom: 10 }}>
          <Col span={14}>{manga ? manga.description : 'Name Manga'}</Col>
        </Row>
        <Row className="type_manga">{manga ? manga.type : 'Name Manga'}</Row>

        <Row style={{ paddingTop: 30 }}>
          <div
            className="button_action"
            onClick={() => {
              navigate('/detail-manga/79');
            }}
          >
            Đọc truyện
          </div>
        </Row>
      </Col>
    </Row>
  );
};

export default Banner;
