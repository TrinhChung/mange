import React from "react";
import { Col, Row, Pagination } from "antd";
import TitleChildren from "../../../components/layout/TitleChildren";
import { MessageOutlined, DownOutlined } from "@ant-design/icons";
import { Input, Tree } from "antd";
import CommentComponent from "../../../components/manga/CommentComponent";

const { TextArea } = Input;

const Comment = ({ comments = {} }) => {
  const buildComment = (listComment) => {
    for (const comment of listComment) {
      comment.title = <CommentComponent comment={comment} />;
      comment.key = comment.id;
      comment.children = buildComment(comment.children);
    }
    return listComment;
  };

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
        <Tree
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={["0-0-0"]}
          treeData={buildComment(comments.data)}
          blockNode={true}
          selectable={false}
          style={{ paddingTop: 20, paddingBottom: 20 }}
        />
        <Pagination style={{ paddingTop: 20 }} defaultCurrent={1} total={50} />
      </Col>
    </Row>
  );
};

export default Comment;
