import React from 'react';
import { Col, Image, Row } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { hostImg } from '../../const/index';
import { useNavigate } from 'react-router-dom';
import './MangaSearch.scss';

const MangaSearch = ({ manga = {} }) => {
  const navigate = useNavigate();

  return (
    <Row className="manga-search">
      <Col span={24}>
        <Row>
          <Col style={{ paddingLeft: 10 }}>
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
                color: 'black',
                paddingBottom: 4,
              }}
            >
              {manga ? manga?.name : 'Manga'}
            </Row>
            <Row style={{ color: 'var(--gray)' }}>
              {manga ? manga?.last_3_chapters[0]?.name : '0'}
            </Row>

            <Row
              style={{
                color: 'var(--color-main)',
                fontWeight: 'bold',
              }}
              className="name"
            >
              {manga?.authors && manga?.authors.length > 0 ? (
                manga?.authors.map((author) => (
                  <label className="text-author">{author}</label>
                ))
              ) : (
                <label className="text-author">Đang cập nhật</label>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MangaSearch;
