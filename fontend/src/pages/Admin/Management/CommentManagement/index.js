import { Col, Input, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import InputGroup from '../../../../components/management/InputGroup';
import StoryItem from '../../../User/Profile/UserMainComponent/UserStory/StoryItem';
import StoryRow from './StoryRow';
import tableColumns from './TableColumns';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý bình luận',
    href: '/management/comment',
  },
];
const data = [
  {
    key: '1',
    title: {
      image:
        'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg',
      name: 'Attack On Titan On Titan',
      chap: 100,
    },
    username: 'tran anh tu',
    content: 'Neake Park 1 Lake ParkYork No. 1 Lake 1 Lake Park Park',
    evaluation: '🙂',
  },
  {
    key: '2',
    title: {
      image:
        'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg',
      name: 'Attack On Titan',
      chap: 1100,
    },
    username: 'tran anh tu',
    content: 'London No. 1 Lake Park 1 Laake Park 1 Lake Park',
    evaluation: '🙁',
  },
  {
    key: '3',
    title: {
      image:
        'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg',
      name: 'Attack On Titan',
      chap: 1220,
    },
    username: 'tran anh tu',
    content: 'Sy 1 Lake Pake Park 1 Laake Park 1 Laarkdney No. 1 Lake Park',
    evaluation: '😐',
  },
  {
    key: '4',
    title: {
      image:
        'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg',
      name: 'Yugioh',
      chap: 123,
    },
    username: 'tran anh tu',
    content: 'tran anh tu ark 1 Laake Park 1 Laarkdney No. 1 Lake Park',
    evaluation: '🙂',
  },
];
const CommentManagement = () => {
  const [filterValue, setFilterValue] = useState(null);

  return (
    <Row className="box-content">
      <TitleTopLeft title="Quản lý bình luận" itemList={breadcrumbData} />
      <Col
        span={24}
        style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 10,
          marginTop: 25,
        }}
      >
        BỘ LỌC
      </Col>
      <Col
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
        <InputGroup title={'Username'}>
          <Input name="username" placeholder="Nhập username" />
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
      </Col>
      <Table
        style={{ width: '100%' }}
        columns={tableColumns}
        dataSource={data}
        pagination={false}
      />
    </Row>
  );
};

export default CommentManagement;
