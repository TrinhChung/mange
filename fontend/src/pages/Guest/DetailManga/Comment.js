import React, { memo, useEffect, useState } from 'react';
import { Col, Row, Pagination } from 'antd';
import TitleChildren from '../../../components/layout/TitleChildren';
import { MessageOutlined, DownOutlined } from '@ant-design/icons';
import { Input, Tree } from 'antd';
import CommentComponent from '../../../components/manga/CommentComponent';
import {
  createCommentChapter,
  getCommentChapter,
} from '../../../services/User/index';
import { toast } from 'react-toastify';

const { TextArea } = Input;

const Comment = ({ isChapter = true, id = 1 }) => {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [change, setChange] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const fetchComments = async (id) => {
    try {
      const type = isChapter ? 'chapters' : 'mangas';
      const data = await getCommentChapter({ id: id, type: type, page: page });
      if (data.success === 1 && data.data) {
        setComments(buildComment(data.data?.data));
        setTotalComments(data?.data.total);
        setTotalPage(data.data?.last_page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments(id);
  }, [change, page]);

  const handleComment = async ({ id, comment }) => {
    let data;
    const type = isChapter ? 'chapters' : 'mangas';
    try {
      data = await createCommentChapter({
        id: id,
        comment: comment,
        type: type,
      });
      toast.success('Đã bình luận');
      setChange(!change);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const buildComment = (listComment) => {
    if (!listComment || listComment.length === 0) return [];
    for (const comment of listComment) {
      comment.title = (
        <CommentComponent
          comment={comment}
          id={id}
          handleComment={handleComment}
        />
      );
      comment.key = comment.id;
      comment.children = buildComment(comment.childs);
    }
    return listComment;
  };

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren
            children={<MessageOutlined />}
            title={`Bình luận(${totalComments})`}
          />
        </Row>
        <Row style={{ color: 'var(--gray)', fontSize: 16 }}></Row>
        <Row style={{ paddingTop: 20 }}>
          <TextArea
            rows={4}
            placeholder="VIết bình luận"
            maxLength={1000}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onPressEnter={(e) => {
              handleComment({
                id: id,
                comment: { comment: content, parent_id: null },
              });
              e.target.value = '';
            }}
          />
        </Row>
        <Tree
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          treeData={comments}
          blockNode={true}
          selectable={false}
          style={{ paddingTop: 20, paddingBottom: 20 }}
        />
        <Pagination
          style={{ paddingTop: 20 }}
          defaultCurrent={page}
          onChange={(value) => {
            setPage(value);
          }}
          total={totalPage * 10}
        />
      </Col>
    </Row>
  );
};

export default memo(Comment);
