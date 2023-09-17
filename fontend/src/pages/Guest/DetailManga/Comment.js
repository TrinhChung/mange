import React from "react";
import { Col, Row, Pagination } from "antd";
import TitleChildren from "../../../components/layout/TitleChildren";
import { MessageOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { TextArea } = Input;

const Comment = ({ comments = {} }) => {
  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren
            children={<MessageOutlined />}
            title={`Bình luận(${comments ? comments.total : 0})`}
          />
        </Row>
        <Row style={{ color: "var(--gray)", fontSize: 16 }}></Row>
        <Row style={{ paddingTop: 20 }}>
          <TextArea rows={4} placeholder="VIết bình luận" maxLength={6} />
        </Row>
        <Pagination style={{ paddingTop: 20 }} defaultCurrent={1} total={50} />
      </Col>
    </Row>
  );
};

export default Comment;
