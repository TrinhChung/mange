import React from "react";
import { Col, Row, Pagination } from "antd";
import Title from "../../../components/layout/Title";
import Manga from "../../../components/manga/Manga";
import MangaVertical from "../../../components/manga/MangaVertical";

const History = ({ histories = {} }) => {
  return (
    <Row className="box-content">
      <Col span={24}>
        <Row>
          <Title title="Lịch sử" />
        </Row>
        <Row>
          <Col span={24}>
            {histories.map((history, index) => {
              if (index < 5) {
                return <MangaVertical manga={history} />;
              }
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default History;
