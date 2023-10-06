import React from 'react';
import { Col, Row, Pagination } from 'antd';
import Title from '../../../components/layout/Title';
import Manga from '../../../components/manga/Manga';

const NewUp = ({ manga = [], setPage = () => {}, total = 1 }) => {
  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col>
        <Row>
          <Title title="Mới cập nhật" />
        </Row>
        <Row>
          <Col>
            <Row gutter={[16, 24]}>
              {manga.map((item) => {
                return <Manga manga={item} />;
              })}
            </Row>
          </Col>
        </Row>
        <Pagination
          onChange={(page) => {
            setPage({ page });
          }}
          style={{ paddingTop: 20 }}
          defaultCurrent={1}
          total={total * 30}
        />
      </Col>
    </Row>
  );
};

export default NewUp;
