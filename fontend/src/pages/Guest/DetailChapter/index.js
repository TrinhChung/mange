import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { getChapterDetail } from '../../../services/Guest/index';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
const DetailChapter = () => {
  const [images, setImages] = useState([]);
  const { name, id } = useParams();
  const fetchDetailChapter = async (id) => {
    const data = await getChapterDetail(id);
    if (data.status === 200 && data.data && data.data.images) {
      setImages(data.data.images);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchDetailChapter(id);
  }, [id]);

  return (
    <Row style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Row></Row>
        <Row>Breakcumb</Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Col style={{ fontSize: 40 }}>
            <LeftCircleOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                console.log(id);
              }}
            />
          </Col>
          <Col>
            <Select
              defaultValue="lucy"
              style={{
                width: 400,
              }}
              className="custom-select-chapter"
              options={[
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
              ]}
            />
          </Col>
          <Col style={{ fontSize: 40 }}>
            <RightCircleOutlined />
          </Col>
        </Row>
        <Row style={{ paddingBottom: 40 }}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  style={{ width: '100%', height: '100%' }}
                  loading="lazy"
                ></img>
              );
            })}
        </Row>
      </Col>
    </Row>
  );
};

export default DetailChapter;
