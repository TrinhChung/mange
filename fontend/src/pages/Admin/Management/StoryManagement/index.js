import { Col, Pagination, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import TitleTopLeft from '../../../../components/layout/TitleTopLeft';
import tableColumns from './TableColumns';
import { getAllMangas } from '../../../../services/Admin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LockOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'Admin',
  },
  {
    title: 'Quản lý truyện',
    href: '/management/story',
  },
];
const StoryManagement = () => {
  const navigate = useNavigate();

  const [mangas, setMangas] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAllMangas = async () => {
    try {
      const res = await getAllMangas(page);
      if (res && res.status === 200) {
        setTotal(res.meta.total);
        setMangas(
          res.data?.map((manga) => {
            return {
              id: manga.id,
              manga: { name: manga.name, thumbnail: manga.thumbnail },
              authors: manga?.authors[0],
              view: manga.view_count,
              follow: manga.follow_count,
              action: (
                <EyeOutlined
                  onClick={() => {
                    if (manga?.id) {
                      navigate(`/detail-manga/${manga.id}`);
                    }
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
    fetchAllMangas();
  }, [page]);

  return (
    <Row className="box-content">
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <TitleTopLeft title="Quản lý truyện" itemList={breadcrumbData} />
      </Col>

      <Table
        style={{ width: '100%', marginTop: 16 }}
        columns={tableColumns}
        dataSource={mangas}
        pagination={false}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 15,
        }}
      >
        <Pagination
          pageSize={10}
          showSizeChanger={false}
          defaultCurrent={1}
          total={total}
          onChange={(page) => setPage(page)}
        />
      </div>
    </Row>
  );
};

export default StoryManagement;
