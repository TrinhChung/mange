import { Col, Row, Badge } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hostImg } from '../../const/index';

const Manga = ({ manga = null, isPropose = false }) => {
  const navigate = useNavigate();

  return (
    <Col key={manga?.id} className="manga">
      <Row>
        {isPropose === true ? (
          <Badge.Ribbon text="Hot" color="red">
            <img
              key={manga.id}
              src={manga?.thumbnail ? hostImg + manga.thumbnail : ''}
              style={{ width: 150, height: 200, cursor: 'pointer' }}
              onClick={() => {
                if (manga?.id) {
                  navigate(`/detail-manga/${manga.id}`);
                }
              }}
              className="box-hover"
            />
          </Badge.Ribbon>
        ) : (
          <img
            key={manga.id}
            src={manga?.thumbnail ? hostImg + manga.thumbnail : ''}
            style={{ width: 150, height: 200, cursor: 'pointer' }}
            onClick={() => {
              if (manga?.id) {
                navigate(`/detail-manga/${manga.id}`);
              }
            }}
            className="box-hover"
          />
        )}
      </Row>
      <Row
        style={{
          paddingTop: 8,
          width: 150,
          fontWeight: 'bold',
          fontSize: 14,
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate(`/live-manga/${manga?.slug}/${manga.last_3_chapters[0].id}`);
        }}
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
            navigate(`/detail-manga/${manga.id}`);
          }
        }}
      >
        {manga?.name ? manga.name : 'Name'}
      </Row>
    </Col>
  );
};

export default Manga;
