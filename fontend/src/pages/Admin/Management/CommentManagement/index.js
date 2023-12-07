import { Col, Input, Modal, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';
import StoryItem from '../../../User/Profile/UserMainComponent/UserStory/StoryItem';
import tableColumns from './TableColumns';
import {
  deleteComment,
  getAllReportedComment,
} from '../../../../services/Admin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý bình luận',
    href: '/profile/management-comment',
  },
];
const CommentManagement = () => {
  const [filterValue, setFilterValue] = useState(null);
  const [reportedComments, setReportedComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const navigate = useNavigate();

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(commentId);
      toast.success(res.message);
      setReportedComments((prevState) =>
        prevState.filter((comment) => comment.id != commentId)
      );
    } catch (error) {
      toast.error('Xóa bình luận thất bại.');
    }

    setIsOpenModal(false);
  };

  const fetchAllReportedComment = async () => {
    try {
      const res = await getAllReportedComment();
      if (res && res.status === 200) {
        setReportedComments(
          res.data?.map((comment) => {
            return {
              id: comment.id,
              manga: comment?.manga,
              username: comment?.user?.username,
              content: comment.comment,
              action: (
                <DeleteOutlined
                  style={{ color: '#F54558', cursor: 'pointer' }}
                  onClick={() => {
                    setIsOpenModal(true);
                    setSelectedCommentId(comment.id);
                  }}
                />
              ),
            };
          })
        );
      }
    } catch (error) {
      toast.error('Không tìm thấy dữ liệu');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchAllReportedComment();
  }, []);

  return (
    <>
      <Row className="box-content">
        <TitleTopLeft title="Quản lý bình luận" itemList={breadcrumbData} />
        {/* <Col
          span={24}
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 10,
            marginTop: 25,
          }}
        >
          BỘ LỌC
        </Col> */}
        {/* <Col
          span={24}
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <InputGroup title={'Tiêu đề truyện'}>
            <Input name="username" placeholder="Nhập tên truyện" />
          </InputGroup>
          <InputGroup title={'Thời gian'}>
            <Select
              defaultValue="1h"
              style={{ width: 120 }}
              options={[
                { value: '1h', label: '1 giờ trước' },
                { value: '1d', label: '1 ngày trước' },
                { value: '7d', label: '7 ngày trước' },
              ]}
            />
          </InputGroup>
          <InputGroup title={'Đánh giá'}>
            <Select
              defaultValue="positive"
              style={{ width: 120 }}
              options={[
                { value: 'positive', label: 'Tích cực' },
                { value: 'negative', label: 'Tiêu cực' },
              ]}
            />
          </InputGroup>
          <Row
            className="button-view bg-color-gray"
            style={{ alignSelf: 'flex-end' }}
          >
            Lọc
          </Row>
        </Col> */}
        <Table
          style={{ width: '100%', marginTop: 16 }}
          columns={tableColumns}
          dataSource={reportedComments}
          pagination={false}
        />
      </Row>
      <Modal
        title="Xóa bình luận"
        open={isOpenModal}
        centered={true}
        onOk={() => {
          handleDeleteComment(selectedCommentId);
        }}
        onCancel={() => setIsOpenModal(false)}
      >
        <p>Bạn có chắc chắn muốn xóa bình luận này không?</p>
      </Modal>
    </>
  );
};

export default CommentManagement;
