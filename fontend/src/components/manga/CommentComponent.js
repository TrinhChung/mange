import { Col, Row } from "antd";
import React, { useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Manga.scss";
import TextArea from "antd/es/input/TextArea";

const CommentComponent = ({ comment = {} }) => {
  const [reply, setReply] = useState(false);

  return (
    <Row style={{ width: "100%", padding: "10px 10px 4px 10px" }}>
      <Col span={2} style={{ width: 80 }}>
        <Avatar
          size={60}
          icon={!comment ? <UserOutlined /> : null}
          src={comment?.user?.image ? comment?.user?.image : null}
        />
      </Col>
      <Col span={22}>
        <Row style={{ fontWeight: "bold", fontSize: 16 }}>
          {comment?.user?.name ? comment.user.name : "User"}
        </Row>
        <Row style={{ fontSize: 16 }}>
          {comment ? comment.content : "Content"}
        </Row>
        <Row style={{ gap: 8 }}>
          <Col
            className="action-comment"
            onClick={() => {
              console.log("like");
            }}
          >
            Thích
          </Col>
          <Col
            className="action-comment"
            onClick={() => {
              setReply(!reply);
            }}
          >
            Trả lời
          </Col>
          <Col style={{ color: "var(--gray)", fontWeight: "bold" }}>
            {comment?.date ? comment.date : "Date"}
          </Col>
        </Row>
        {reply && (
          <Row style={{ paddingBottom: 10, paddingTop: 10 }}>
            <TextArea
              rows={4}
              placeholder="VIết bình luận"
              maxLength={6}
              autoFocus={true}
            />
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default CommentComponent;
