import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapterDetail } from '../../../services/Guest/index';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Comment from '../DetailManga/Comment';
const DetailChapter = () => {
  const [images, setImages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const { name, id } = useParams();
  const navigate = useNavigate();

  const fetchDetailChapter = async (id) => {
    const data = await getChapterDetail(id);
    if (data.status === 200 && data.data && data.data.images) {
      setImages(data.data.images);
      if (data.data.manga && data.data.manga.chapters) {
        var arr = data.data.manga.chapters;
        setChapters(
          arr.map((chapter) => {
            return { value: chapter.id, label: chapter.name };
          })
        );
        setIndex(arr.findIndex((chapter) => chapter.id == id));
      }
    }
  };

  useEffect(() => {
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
              style={{
                cursor: `${index > 0 ? 'pointer' : 'default'}`,
                color: `${index > 0 ? 'black' : 'gray'}`,
              }}
              onClick={() => {
                navigate(`/live-manga/${name}/${chapters[index - 1].value}`);
              }}
            />
          </Col>
          {chapters && chapters.length > 0 && (
            <Col>
              <Select
                defaultValue={
                  chapters.length > 0 && index >= 0
                    ? chapters[index]?.label
                    : 'Chapter'
                }
                style={{
                  width: 400,
                }}
                onChange={(value) => {
                  navigate(`/live-manga/${name}/${value}`);
                }}
                value={chapters[index]?.value}
                className="custom-select-chapter"
                options={chapters}
              />
            </Col>
          )}

          <Col style={{ fontSize: 40 }}>
            <RightCircleOutlined
              style={{
                cursor: `${
                  index >= 0 && index < chapters.length - 1
                    ? 'pointer'
                    : 'default'
                }`,
                color: `${
                  index >= 0 && index < chapters.length - 1 ? 'black' : 'gray'
                }`,
              }}
              onClick={() => {
                navigate(`/live-manga/${name}/${chapters[index + 1].value}`);
              }}
            />
          </Col>
        </Row>
        <Row style={{ paddingBottom: 40, minHeight: 800 }}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={`${image}?${Date.now()}}`}
                  style={{ width: '100%', height: '100%' }}
                  loading="lazy"
                ></img>
              );
            })}
        </Row>
        <Comment comments={null} />
      </Col>
    </Row>
  );
};

export default DetailChapter;
