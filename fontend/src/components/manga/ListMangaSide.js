import React from 'react';
import { Col, Row } from 'antd';
import Title from '../layout/Title';
import MangaVertical from './MangaVertical';

const ListMangaSide = ({ listManga = [], title, isDate = true }) => {
  return (
    <Row className="box-content">
      <Col span={24}>
        <Row>
          <Title title={title} />
        </Row>
        <Row>
          <Col span={24}>
            {listManga.map((manga, index) => {
              return <MangaVertical manga={manga} isDate={isDate} />;
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListMangaSide;
