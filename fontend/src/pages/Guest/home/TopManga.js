import React, { useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import MangaVertical from '../../../components/manga/MangaVertical';

const TopManga = ({ mangaWeek = [], mangaMonth = [] }) => {
  const [key, setKey] = useState('week');
  const items = [
    {
      key: 'week',
      label: <div className="text_title">TOP TUẦN</div>,
    },
    {
      key: 'month',
      label: <div className="text_title">TOP THÁNG</div>,
    },
  ];

  const onChange = (data) => {
    setKey(data);
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
            {key === 'month'
              ? mangaMonth.map((item, index) => {
                  if (index < 5) {
                    return (
                      <MangaVertical
                        index={index}
                        manga={item}
                        isDate={false}
                      />
                    );
                  }
                })
              : mangaWeek.map((item, index) => {
                  if (index < 5) {
                    return (
                      <MangaVertical
                        index={index}
                        manga={item}
                        isDate={false}
                      />
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
