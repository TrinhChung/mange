import { Col, Image, Row } from "antd";
import React from "react";

const Manga = ({ propose = {} }) => {
  return (
    <Col style={{ width: 150 }}>
      <Row>
        <Image
          src={propose ? propose.image : null}
          preview={false}
          width={150}
          height={200}
        />
      </Row>
      <Row style={{ paddingTop: 8, fontWeight: "bold", fontSize: 20 }}>
        #{propose ? propose.chapter : "100"}
      </Row>
      <Row style={{ paddingTop: 4, fontSize: 14, color: "var(--gray)" }}>
        Name
      </Row>
    </Col>
  );
};

export default Manga;
