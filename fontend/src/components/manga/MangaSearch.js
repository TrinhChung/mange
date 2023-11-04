import React from 'react';
import { Col, Image, Row } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { hostImg } from '../../const/index';
import { useNavigate } from 'react-router-dom';

const MangaSearch = ({ manga = {} }) => {
  const navigate = useNavigate();

  return (
    <Row
      style={{
        paddingTop: 10,
        justifyContent: 'space-between',
        color: 'black',
      }}
      className="manga-search"
    >
      <Col span={24}>
        <Row>
          <Col span={4}>
            <Image
              width={50}
              height={70}
              src={manga ? hostImg + manga?.thumbnail : null}
              preview={false}
              className="box-hover"
              onClick={() => {
                navigate(`/detail-manga/${manga?.id}`);
              }}
            />
          </Col>
          <Col span={20} style={{ paddingLeft: 20 }}>
            <Row
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {manga ? manga?.name : 'Manga'}
            </Row>
            <Row>{manga ? manga?.last_3_chapters[0]?.name : '0'}</Row>
            <Row
              style={{
                color: 'var(--color-main)',
                fontWeight: 'bold',
              }}
              className="name"
            >
              {manga ? manga?.rating : '4.9'}
              <StarFilled style={{ paddingLeft: 5 }} />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MangaSearch;
