import { Col, Image, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { hostImg } from '../../const/index';

const { Paragraph, Text } = Typography;

const Manga = ({ manga = {} }) => {
  const navigate = useNavigate();

  return (
    <Col key={manga?.id}>
      <Row>
        <Image
          src={manga ? hostImg + manga.thumbnail : null}
          preview={false}
          width={150}
          height={200}
        />
      </Row>
      <Row
        style={{ paddingTop: 8, width: 150, fontWeight: 'bold', fontSize: 14 }}
      >
        #
        {manga?.last_3_chapters?.length > 0 && manga.last_3_chapters[0].name
          ? manga.last_3_chapters[0].name
          : '100'}
      </Row>
      <Row
        style={{
          paddingTop: 4,
          fontSize: 14,
          width: 150,
          fontWeight: 'bold',
          color: 'var(--gray)',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (manga && manga.slug) {
            navigate(`/detail-manga/${manga.slug}`);
          }
        }}
      >
        {manga?.name ? manga.name : 'Name'}
      </Row>
    </Col>
  );
};

export default Manga;
