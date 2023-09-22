import { Col, Row } from 'antd'
import React from 'react'
import Title from '../../../components/layout/Title'
import Manga from '../../../components/manga/Manga'
import Slider from 'react-slick'

const Propose = ({ proposes = [] }) => {
    const settings = {
        className: 'center',
        infinite: false,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1,
        dots: false,
        pauseHover: false,
        autoplay: true,
        autoplaySpeed: 3000
    }

    return (
        <Row className='box-content'>
            <Col>
                <Row>
                    <Title title='Đề xuất' />
                </Row>
                <Row>
                    <Col>
                        <Slider {...settings}>
                            {proposes.map((propose) => {
                                return <Manga manga={propose} />
                            })}
                        </Slider>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Propose
