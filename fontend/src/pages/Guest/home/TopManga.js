import React from 'react';
import { Col, Row, Tabs } from 'antd';
import Title from '../../../components/layout/Title';
import MangaVertical from '../../../components/manga/MangaVertical';

const TopManga = ({ manga = [] }) => {
  const items = [
    {
      key: '1',
      label: <div className="text_title">TOP TUẦN</div>,
    },
    {
      key: '2',
      label: <div className="text_title">TOP THÁNG</div>,
    },
  ];

  const onChange = () => {
    // console.log('change');
  };

  return (
    <Row className="box-content">
      <Col span={24}>
        <Row>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            indicatorSize={(origin) => origin - 16}
          />
        </Row>
        <Row>
          <Col span={24}>
            {manga.map((item, index) => {
              if (index < 5) {
                return (
                  <MangaVertical index={index} manga={item} isDate={false} />
                );
              }
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopManga;
