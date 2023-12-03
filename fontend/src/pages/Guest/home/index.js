import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Banner from './Banner';
import MangaBanner from '../../../assets/image/banner_drstone.jpg';
import Propose from './Propose';
import NewUp from './NewUp';
import TopManga from './TopManga';
import ListMangaSide from '../../../components/manga/ListMangaSide';
import { useContext } from 'react';
import { MangaContext } from '../../../providers/mangaProvider/index';
import AdPanel from './AdPanel';

export const proposes = [
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
  },
];

const Home = () => {
  const {
    loadingNewUpdate,
    newUpdates,
    proposes,
    histories,
    fetchMangaNewUpdate,
    currentPageNewUpdate,
    topMangaWeek,
    topMangaMonth,
  } = useContext(MangaContext);

  const manga = {
    chapter: 'Chapter 232: End',
    image: MangaBanner,
    name: 'Dr. Stone',
    type: 'Thể loại: Action, Manga, Shounen, Supernatural',
    description:
      'Sau 1 trận đại dịch không rõ nguồn gốc khiến loài người trên toàn thể địa cầu biến thành đá trải qua mấy ngàn năm sau 2 thanh niên chính của chúng ta là Senkuu và Taiju phá đá thoát ra và bắt đầu lập kế hoạch để cùng nhau tái thiết lập lại thế giới theo cách của họ.',
  };

  return (
    <Row style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Banner manga={manga} />
        <Propose proposes={proposes} />
        <Row>
          <Col span={16}>
            <NewUp
              manga={newUpdates?.manga}
              total={newUpdates?.total}
              setPage={fetchMangaNewUpdate}
              loading={loadingNewUpdate}
              page={currentPageNewUpdate}
            />
          </Col>
          <Col span={8}>
            <ListMangaSide listManga={histories} title={'Lịch sử'} />
            <TopManga mangaWeek={topMangaWeek} mangaMonth={topMangaMonth} />
            <AdPanel />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
