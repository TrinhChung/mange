import React, { useState } from 'react';
import { Col, Row, Pagination } from 'antd';
import Title from '../../../components/layout/Title';
import Manga from '../../../components/manga/Manga';
import MangaSkeleton from '../../../components/manga/MangaSkeleton';
import { listMangaSkeleton } from '../../../const/index';

const NewUp = ({
  manga = [],
  setPage = () => {},
  total = 1,
  loading = true,
  page = 1,
}) => {
  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col>
        <Row>
          <Title title="Mới cập nhật" />
        </Row>
        {loading === false ? (
          <>
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
              page={page}
              onChange={(page) => {
                setPage({ page });
              }}
              style={{ paddingTop: 20 }}
              defaultCurrent={page}
              total={total * 30}
            />
          </>
        ) : (
          <Row>
            <Col>
              <Row gutter={[16, 24]}>
                {listMangaSkeleton.map(() => {
                  return <MangaSkeleton />;
                })}
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default NewUp;
