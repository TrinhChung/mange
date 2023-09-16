import { Col, Image, Row } from "antd";
import React from "react";

const Manga = ({ manga = {} }) => {
  return (
    <Col style={{ width: 150 }}>
      <Row>
        <Image
          src={manga ? manga.image : null}
          preview={false}
          width={150}
          height={200}
        />
      </Row>
      <Row style={{ paddingTop: 8, fontWeight: "bold", fontSize: 20 }}>
        #{manga ? manga.chapter : "100"}
      </Row>
      <Row
        style={{
          paddingTop: 4,
          fontSize: 14,
          fontWeight: "bold",
          color: "var(--gray)",
        }}
      >
        {manga ? manga.name : "Name"}
      </Row>
    </Col>
  );
};

export default Manga;
