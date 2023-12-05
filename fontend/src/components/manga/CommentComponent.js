import { useState, useContext } from 'react';
import { Col, Row, Dropdown } from 'antd';
import { Avatar } from 'antd';
import {
  UserOutlined,
  MoreOutlined,
  FlagOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import './Manga.scss';
import TextArea from 'antd/es/input/TextArea';
import { reportComment } from '../../services/User';
import { toast } from 'react-toastify';
import { censorComment } from '../../utils/commonFunc';

const CommentComponent = ({
  comment = {},
  id = { id },
  handleComment = () => {},
}) => {
  const [reply, setReply] = useState(false);

  const handleReportComment = async () => {
    try {
      const data = await reportComment({ id: comment?.id });
      if (data.status === 200) {
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const items = [
    {
      label: (
        <Row style={{ cursor: 'pointer' }} onClick={handleReportComment}>
          <FlagOutlined />
          <label style={{ paddingLeft: 4 }}>Báo cáo</label>
        </Row>
      ),
      key: '0',
    },
  ];

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
              {comment ? censorComment(comment) : 'Content'}
            </Row>
            <Row style={{ gap: 8 }}>
              <Col
                onClick={() => {
                  console.log('like');
                }}
              >
                <Row>
                  <Col style={{ color: 'var(--jade)' }}>
                    {comment?.like_count}
                  </Col>
                  <HeartOutlined
                    style={{ paddingLeft: 2 }}
                    className="action-comment hover-like"
                  />
                </Row>
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
                {comment?.created_at && comment.created_at}
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
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <MoreOutlined className="color-jade-hover" />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default CommentComponent;
