import { Col, Input, Pagination, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import UserStory from '../UserStory';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../providers/authProvider';
import { getMangasBookmark } from '../../../../../services/User';
import { LockOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import tableColumns from './TableColumns';
import { trimString } from '../../../../../utils/commonFunc';

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'User',
  },
  {
    title: ' Truyện đang theo dõi',
    href: '/profile/following',
  },
];
const { Search } = Input;
const FollowingComponent = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [key, setKey] = useState(
    searchParams.get('userSearchBar') ? searchParams.get('userSearchBar') : ''
  );

  const { authUser } = useContext(AuthContext);
  const [follows, setFollows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchFollowed = async () => {
    try {
      const res = await getMangasBookmark();

      if (res.status === 200) {
        setTotal(res.data.total);
        setFollows(
          res?.data?.data.map((manga) => {
            return {
              id: manga.id,
              manga: {
                name: trimString(manga.name, 40),
                thumbnail: manga.thumbnail,
              },
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowed();
  }, [page]);

  console.log('follows', follows);
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
        <TitleTopLeft title="Truyện đang theo dõi" itemList={breadcrumbData} />
        {/* <Search
          placeholder="Tìm kiếm truyện"
          allowClear
          style={{ width: 250 }}
          className="user-search-bar-custom"
          size="large"
          defaultValue={searchParams.get('userSearchBar')}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        /> */}
      </Col>

      <Table
        style={{ width: '100%', marginTop: 16 }}
        columns={tableColumns}
        dataSource={follows}
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

export default FollowingComponent;
