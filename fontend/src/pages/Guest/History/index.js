import React from 'react';
import { Col, Row, Tabs, Empty } from 'antd';
import TopManga from '../home/TopManga';
import { useContext, useState } from 'react';
import { MangaContext } from '../../../providers/mangaProvider/index';
import MangaHistory from '../../../components/manga/MangaHistory';
import { AuthContext } from '../../../providers/authProvider';

const History = () => {
  const { authUser } = useContext(AuthContext);
  const { histories, historiesAccount, topMangaWeek, topMangaMonth } =
    useContext(MangaContext);

  const [key, setKey] = useState('1');

  const items = [
    {
      key: '1',
      label: <div className="text_title">Từ thiết bị</div>,
    },
    {
      key: '2',
      label: <div className="text_title">Từ tài khoản</div>,
    },
  ];

  const onChange = (key) => {
    setKey(key);
  };

  return (
    <Row style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Row>
          <Col
            span={16}
            className="box-content"
            style={{ borderRight: '1px solid black' }}
          >
            <Row>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                indicatorSize={(origin) => origin - 16}
              />
            </Row>
            <Row gutter={[16, 24]}>
              {key === '1' ? (
                histories.length > 0 ? (
                  histories.map((item) => {
                    return <MangaHistory manga={item} />;
                  })
                ) : (
                  <Col span={24} style={{ justifyContent: 'center' }}>
                    <Empty />
                  </Col>
                )
              ) : authUser ? (
                historiesAccount.length > 0 ? (
                  historiesAccount.map((item) => {
                    return <MangaHistory manga={item} />;
                  })
                ) : (
                  <Col span={24} style={{ justifyContent: 'center' }}>
                    <Empty />
                  </Col>
                )
              ) : (
                <Col
                  span={24}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Empty
                    description={
                      <span>
                        Bạn chưa đăng nhập vui lòng đăng nhập{' '}
                        <a href="/auth/login">Tại đây</a>
                      </span>
                    }
                  />
                </Col>
              )}
            </Row>
          </Col>
          <Col span={8}>
            <TopManga mangaWeek={topMangaWeek} mangaMonth={topMangaMonth} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default History;
