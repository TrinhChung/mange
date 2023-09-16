import React from "react";
import HomeLayout from "../../../layouts/HomeLayout";
import LinkCustom from "../../../components/layout/LinkCustom";
import { Col, Row } from "antd";
import Banner from "./Banner";
import MangaBanner from "../../../assets/image/banner_manga_home.jpg";
import Propose from "./Propose";
import NewUp from "./NewUp";
import History from "./History";
import TopManga from "./TopManga";

const Home = () => {
  const items = [
    {
      label: <LinkCustom to="/" label="Trang chủ" />,
      key: "home",
    },
    {
      label: <LinkCustom to={"/job"} label="Mới ra mắt" />,
      key: "job",
    },
    {
      label: <LinkCustom to={"/company"} label="Phổ biến" />,
      key: "company",
    },
    {
      label: <LinkCustom to={"/profile/"} label="Thể loại" />,
      key: "profile",
    },
  ];

  const proposes = [
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/vo-luyen-dinh-phong.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
    },
  ];

  const histories = [
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
    {
      image:
        "https://nettruyen.live/public/images/comics/jujutsu-kaisen-chu-thuat-hoi-chien.jpg",
      chapter: 175,
      name: "One Piece",
      link: "xxx",
      rating: 4.9,
      time: "13 phút trước",
    },
  ];

  const manga = {
    chapter: "Chapter 100",
    image: MangaBanner,
    name: "Attack On Titan",
    type: "Thể loại: Action, Adventure, Shounen, Kinh dị",
    description:
      "Hơn 100 năm trước, giống người khổng lồ Titan đã tấn công và đẩy loài người tới bờ vực tuyệt chủng. Những con người sống sót tụ tập lại, xây bao quanh mình 1 tòa thành 3 lớp kiên cố và tự nhốt mình bên trong để trốn tránh những cuộc tấn công của người khổng lồ.",
  };

  return (
    <HomeLayout menu={items}>
      <Row style={{ justifyContent: "center" }}>
        <Col span={18}>
          <Banner manga={manga} />
          <Propose proposes={proposes} />
          <Row>
            <Col span={16}>
              <NewUp manga={proposes} />
            </Col>
            <Col span={8}>
              <History histories={histories} />
              <TopManga manga={histories} />
            </Col>
          </Row>
        </Col>
      </Row>
    </HomeLayout>
  );
};

export default Home;
