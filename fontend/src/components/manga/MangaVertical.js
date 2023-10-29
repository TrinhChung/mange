import { Col, Image, Row } from 'antd';
import React from 'react';
import { StarFilled } from '@ant-design/icons';
import moment from 'moment';

const MangaVertical = ({ manga = {}, isDate = true, index = null }) => {
  const colors = ['#F54558', '#9F73C1', '#45B3B4', '#8A8A8A', 'orange'];

  return (
    <Row
      style={{
        paddingTop: 10,
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Col>
        <Row>
          {index != null ? (
            <Col
              style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: colors[index % 5],
                }}
              >
                {index + 1}
              </div>
            </Col>
          ) : null}

          <Image
            width={50}
            height={70}
            src={manga ? manga?.thumbnail : null}
            preview={false}
          />
          <Col style={{ paddingLeft: 20 }}>
            <Row style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 4 }}>
              {manga ? manga.name : 'Manga'}
            </Row>
            <Row
              style={{
                color: 'var(--gray)',
                fontWeight: 'bold',
                fontSize: 12,
                paddingBottom: 4,
              }}
            >
              {manga ? manga.chapter : '0'}
            </Row>
            <Row
              style={{
                color: 'var(--color-main)',
                fontWeight: 'bold',
              }}
            >
              {manga ? manga.rating : '4.9'}
              <StarFilled style={{ paddingLeft: 5 }} />
            </Row>
          </Col>
        </Row>
      </Col>
      {isDate ? (
        <Col style={{ color: 'var(--gray)' }}>
          {manga ? moment(manga?.time).locale('vi').fromNow() : '13 phut truoc'}
        </Col>
      ) : null}
    </Row>
  );
};

export default MangaVertical;
