import { Col, Row } from 'antd';
import React, { useState } from 'react';
import Title from '../../../components/layout/Title';
import Manga from '../../../components/manga/Manga';
import Slider from 'react-slick';
import { useEffect } from 'react';

const Propose = ({ proposes = [] }) => {
  const [manga, setManga] = useState([]);
  const settings = {
    className: 'center',
    infinite: false,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 1,
    dots: false,
    pauseHover: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  useEffect(() => {
    setManga(proposes);
  }, [proposes]);

  return (
    <Row className="box-content">
      <Col>
        <Row>
          <Title title="Đề xuất" />
        </Row>
        <Row>
          <Col>
            {manga.length > 0 ? (
              <Slider {...settings}>
                {manga.map((propose) => {
                  return <Manga manga={propose} />;
                })}
              </Slider>
            ) : null}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Propose;
