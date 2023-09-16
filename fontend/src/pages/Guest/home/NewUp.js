import React from "react";
import { Col, Row, Pagination } from "antd";
import Title from "../../../components/layout/Title";
import Manga from "../../../components/manga/Manga";

const NewUp = ({ manga = [] }) => {
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
        <Pagination style={{ paddingTop: 20 }} defaultCurrent={1} total={50} />
      </Col>
    </Row>
  );
};

export default NewUp;
