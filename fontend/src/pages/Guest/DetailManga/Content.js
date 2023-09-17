import React from "react";
import { Col, Row, Rate, Image } from "antd";
import RowInfo from "./RowInfo";
import TitleChildren from "../../../components/layout/TitleChildren";
import { AlignLeftOutlined } from "@ant-design/icons";

const Content = ({ content = "" }) => {
  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren children={<AlignLeftOutlined />} title="Nội dung" />
        </Row>
        <Row style={{ color: "var(--gray)", fontSize: 16 }}>
          {content ? content : null}
        </Row>
      </Col>
    </Row>
  );
};

export default Content;
