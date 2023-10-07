import React from 'react';
import { Col, Row, Rate, Image } from 'antd';
import Manga from '../../../components/manga/Manga';
import RowInfo from './RowInfo';
import { hostImg } from '../../../const/index';
import { useNavigate } from 'react-router-dom';

const Overview = ({ manga = {} }) => {
  const navigate = useNavigate();
  const infos = [
    // { children: 'Dịch giả', content: 'translator' },
    { children: 'Tình trạng', content: 'status' },
    { children: 'Lượt theo dõi', content: 'follow_count' },
    { children: 'Lượt xem', content: 'view_count' },
  ];

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <Col>
            <Image
              src={manga ? hostImg + manga.thumbnail : null}
              width={180}
              height={240}
              preview={false}
            />
          </Col>
          <Col style={{ paddingLeft: 40 }}>
            <Row
              style={{
                height: 32,
                fontSize: 24,
                fontWeight: 'bold',
                paddingBottom: 50,
              }}
            >
              {manga?.name ? manga.name : 'Ten Truyen'}
            </Row>
            <RowInfo
              children={'Tác giả'}
              content={
                manga?.authors && manga?.authors.length > 0
                  ? manga.authors[0].name
                  : 'Name'
              }
            />
            {infos.map((rowInfo) => (
              <RowInfo
                children={rowInfo.children}
                content={
                  manga && manga[rowInfo.content]
                    ? manga[rowInfo.content]
                    : null
                }
              />
            ))}
            <Rate allowHalf defaultValue={2.5} />
            <Row
              style={{
                gap: 8,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {manga?.categories &&
                manga?.categories.length > 0 &&
                manga.categories.map((category) => {
                  return <Col className="badge-category">{category?.name}</Col>;
                })}
            </Row>
            <Row style={{ gap: 12 }}>
              <Col
                className="button-view bg-color-main"
                onClick={() => {
                  if (manga && manga?.chapters.length > 0) {
                    navigate(
                      `/live-manga/${manga?.slug}/${
                        manga?.chapters[manga?.chapters.length - 1].id
                      }`
                    );
                  }
                }}
              >
                Đọc từ đầu
              </Col>
              <Col
                className="button-view bg-color-main"
                onClick={() => {
                  if (manga && manga?.chapters.length > 0) {
                    navigate(
                      `/live-manga/${manga?.slug}/${manga?.chapters[0].id}`
                    );
                  }
                }}
              >
                Đọc mới nhất
              </Col>
              <Col className="button-view bg-color-jade">Theo dõi</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Overview;
