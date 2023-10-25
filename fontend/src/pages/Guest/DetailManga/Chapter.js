import React, { memo } from 'react';
import { Col, Row } from 'antd';
import TitleChildren from '../../../components/layout/TitleChildren';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Chapter = ({ chapters = [], nameManga = 'name' }) => {
  const navigate = useNavigate();
  const handleViewChapter = (chapter) => {
    navigate(`/live-manga/${nameManga}/${chapter.id}`);
  };

  const RowChapter = ({ chapter, date, action = () => {} }) => {
    return (
      <Row
        style={{
          justifyContent: 'space-between',
          fontSize: 16,
          height: 30,
        }}
      >
        <Col
          style={{ fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => action(chapter)}
        >
          {chapter?.name}
        </Col>
        <Col style={{ fontSize: 16, paddingRight: 16 }}>{date}</Col>
      </Row>
    );
  };

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren
            children={<UnorderedListOutlined />}
            title="Danh sách chương truyện"
          />
        </Row>
        <Row
          style={{
            color: 'var(--gray)',
            fontSize: 16,
            justifyContent: 'center',
          }}
        >
          <Col span={22}>
            <Row style={{ paddingBottom: 20 }}></Row>
            <RowChapter
              chapter={
                <Col
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}
                >
                  Chapter
                </Col>
              }
              date={
                <Col
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    paddingRight: 10,
                  }}
                >
                  Ngày cập nhật
                </Col>
              }
            />
            <Row
              style={{
                border: '2px solid var(--gray)',
                padding: '10px 10px',
                borderRadius: 8,
                height: 700,
                overflow: 'auto',
              }}
            >
              <Col span={24}>
                {chapters &&
                  chapters.length > 0 &&
                  chapters.map((chapter) => {
                    return (
                      <RowChapter
                        chapter={chapter}
                        date={chapter?.created_at_formated}
                        action={handleViewChapter}
                      />
                    );
                  })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Chapter);
