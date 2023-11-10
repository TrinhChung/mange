import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons';
import './Manga.scss';
import TextArea from 'antd/es/input/TextArea';

const CommentComponent = ({
  comment = {},
  id = { id },
  handleComment = () => {},
}) => {
  const [reply, setReply] = useState(false);

  return (
    <Row style={{ width: '100%', padding: '10px 10px 4px 10px' }}>
      <Col span={23}>
        <Row>
          <Col span={2} style={{ width: 80 }}>
            <Avatar
              size={60}
              icon={!comment ? <UserOutlined /> : null}
              src={comment?.user?.avatar ? comment?.user?.avatar : null}
            />
          </Col>
          <Col span={22} style={{ paddingLeft: 10 }}>
            <Row style={{ fontWeight: 'bold', fontSize: 16 }}>
              {comment?.user?.username ? comment.user.username : 'User'}
            </Row>
            <Row style={{ fontSize: 16 }}>
              {comment ? comment.comment : 'Content'}
            </Row>
            <Row style={{ gap: 8 }}>
              <Col
                className="action-comment"
                onClick={() => {
                  console.log('like');
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
              <Col style={{ color: 'var(--gray)', fontWeight: 'bold' }}>
                {comment?.created_at ? comment.created_at : 'Date'}
              </Col>
            </Row>
            {reply && (
              <Row style={{ paddingBottom: 10, paddingTop: 10 }}>
                <TextArea
                  rows={4}
                  placeholder="Viết bình luận"
                  maxLength={1000}
                  autoFocus={true}
                  onBlur={() => {
                    setReply(false);
                  }}
                  onPressEnter={(e) => {
                    handleComment({
                      id: id,
                      comment: {
                        comment: e.target.value,
                        parent_id: comment.id,
                      },
                    });
                    e.target.value = '';
                  }}
                />
              </Row>
            )}
          </Col>
        </Row>
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <MoreOutlined className="color-jade-hover" />
      </Col>
    </Row>
  );
};

export default CommentComponent;
