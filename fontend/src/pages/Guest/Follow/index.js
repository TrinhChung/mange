import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import TopManga from '../home/TopManga';
import MangaHistory from '../../../components/manga/MangaHistory';
import { useContext } from 'react';
import { MangaContext } from '../../../providers/mangaProvider/index';
import { AuthContext } from '../../../providers/authProvider/index';
import Title from '../../../components/layout/Title';
import { getMangasBookmark } from '../../../services/User/index';

const Follow = () => {
  const { topMangaWeek, topMangaMonth } = useContext(MangaContext);
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

  return (
    <Row style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Row>
          <Col
            span={16}
            className="box-content"
            style={{ borderRight: '1px solid black' }}
          >
            <Title title={'Danh sách truyện đang theo dõi'} />
            {authUser ? (
              <Row gutter={[16, 24]}>
                {follows &&
                  follows.length &&
                  follows.map((item) => {
                    return <MangaHistory manga={item} />;
                  })}
              </Row>
            ) : (
              <Row>Vui lòng đăng nhập</Row>
            )}
          </Col>
          <Col span={8}>
            <TopManga mangaWeek={topMangaWeek} mangaMonth={topMangaMonth} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Follow;
