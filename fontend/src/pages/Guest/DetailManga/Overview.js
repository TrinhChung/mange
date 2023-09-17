import React from "react";
import { Col, Row, Rate, Image } from "antd";
import Manga from "../../../components/manga/Manga";
import RowInfo from "./RowInfo";

const Overview = ({ manga = {} }) => {
  const infos = [
    { children: "Tác giả", content: "author" },
    { children: "Dịch giả", content: "translator" },
    { children: "Tình trạng", content: "status" },
    { children: "Lượt theo dõi", content: "follow" },
    { children: "Lượt xem", content: "view" },
  ];

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <Col>
            <Image src={manga.image} width={180} height={240} preview={false} />
          </Col>
          <Col style={{ paddingLeft: 40 }}>
            <Row
              style={{
                height: 32,
                fontSize: 24,
                fontWeight: "bold",
                paddingBottom: 50,
              }}
            >
              {manga ? manga.name : "Ten Truyen"}
            </Row>
            {infos.map((rowInfo) => (
              <RowInfo
                children={rowInfo.children}
                content={manga[rowInfo.content]}
              />
            ))}
            <Rate allowHalf defaultValue={2.5} />
            <Row style={{ gap: 8, paddingTop: 10, paddingBottom: 10 }}>
              {manga &&
                manga.categories &&
                manga.categories.length > 0 &&
                manga.categories.map((category) => {
                  return <Col className="badge-category">{category}</Col>;
                })}
            </Row>
            <Row style={{ gap: 12 }}>
              <Col className="button-view bg-color-main">Đọc từ đầu</Col>
              <Col className="button-view bg-color-main">Đọc mới nhất</Col>
              <Col className="button-view bg-color-jade">Theo dõi</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Overview;
