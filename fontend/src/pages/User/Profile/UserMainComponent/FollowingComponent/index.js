import { Col, Input, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import UserStory from '../UserStory';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../../providers/authProvider';
import { getMangasBookmark } from '../../../../../services/User';

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [key, setKey] = useState(
    searchParams.get('userSearchBar') ? searchParams.get('userSearchBar') : ''
  );

  const { authUser } = useContext(AuthContext);
  const [follows, setFollows] = useState([]);

  const fetchFollowed = async () => {
    try {
      const data = await getMangasBookmark();

      if (data.status === 200) {
        setFollows(data?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowed();
  }, []);

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
      <UserStory
        headerText={{
          text1: 'DANH SÁCH TRUYỆN ĐANG THEO RÕI',
        }}
        follows={follows}
      />
    </Row>
  );
};

export default FollowingComponent;
