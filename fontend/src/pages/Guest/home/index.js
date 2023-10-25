import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Banner from './Banner';
import MangaBanner from '../../../assets/image/banner_manga_home.jpg';
import Propose from './Propose';
import NewUp from './NewUp';
import TopManga from './TopManga';
import ListMangaSide from '../../../components/manga/ListMangaSide';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/authProvider';
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

export const histories = [
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
  {
    image:
      'https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg',
    chapter: 175,
    name: 'One Piece',
    slug: 'xxx',
    rating: 4.9,
    time: '13 phút trước',
  },
];

const Home = () => {
  const { loadingNewUpdate, newUpdates, proposes, fetchMangaNewUpdate } =
    useContext(MangaContext);

  const manga = {
    chapter: 'Chapter 100',
    image: MangaBanner,
    name: 'Attack On Titan',
    type: 'Thể loại: Action, Adventure, Shounen, Kinh dị',
    description:
      'Hơn 100 năm trước, giống người khổng lồ Titan đã tấn công và đẩy loài người tới bờ vực tuyệt chủng. Những con người sống sót tụ tập lại, xây bao quanh mình 1 tòa thành 3 lớp kiên cố và tự nhốt mình bên trong để trốn tránh những cuộc tấn công của người khổng lồ.',
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
            />
          </Col>
          <Col span={8}>
            <ListMangaSide listManga={histories} title={'Lịch sử'} />
            <TopManga manga={histories} />
            <AdPanel />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;
