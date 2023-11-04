import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import NewUp from '../home/NewUp';
import { useContext } from 'react';
import { MangaContext } from '../../../providers/mangaProvider/index';
import Title from '../../../components/layout/Title';
import './Search.scss';

const Search = () => {
  const {
    loadingNewUpdate,
    newUpdates,
    fetchMangaNewUpdate,
    currentPageNewUpdate,
    categories,
  } = useContext(MangaContext);
  const [category, setCategory] = useState(-1);
  const [status, setStatus] = useState(0);
  const [sortBy, setSortBy] = useState(0);

  const criteria = [
    { label: 'Ngày cập nhật', value: 'date-update' },
    { label: 'Truyện mới', value: 'new-manga' },
    { label: 'Top All', value: 'top-all' },
    { label: 'Top tháng', value: 'top-month' },
    { label: 'Top tuần', value: 'top-week' },
    { label: 'Top ngày', value: 'top-date' },
    { label: 'Theo dõi', value: 'following' },
    { label: 'Số theo dõi', value: 'follow' },
    { label: 'Số chapter', value: 'chapter' },
  ];

  return (
    <Row className="search-wrap" style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Row>
          <Col span={16}>
            <Row className="box-content" style={{ marginRight: 20 }}>
              <Col span={24}>
                <Title title="Tìm kiếm truyện tranh" />
                <Row>
                  <Col className="label-filter" span={8}>
                    Từ khóa
                  </Col>
                  <Col span={16}>
                    <Row gutter={[8, 8]}>Từ khóa</Row>
                  </Col>
                </Row>
                <Row style={{ paddingTop: 16 }}>
                  <Col className="label-filter" span={8}>
                    Trạng thái
                  </Col>
                  <Col span={16}>
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Button className="button-filter">Tất cả</Button>
                      </Col>
                      <Col>
                        <Button className="button-filter">Hoàn thành</Button>
                      </Col>
                      <Col>
                        <Button className="button-filter">
                          Đang tiến hành
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{ paddingTop: 16 }}>
                  <Col className="label-filter" span={8}>
                    Sắp xếp theo
                  </Col>
                  <Col span={16}>
                    <Row gutter={[8, 4]}>
                      {criteria.map((item) => {
                        return (
                          <Col>
                            <Button className="button-filter">
                              {item.label}
                            </Button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <NewUp
              manga={newUpdates?.manga}
              total={newUpdates?.total}
              setPage={fetchMangaNewUpdate}
              loading={loadingNewUpdate}
              page={currentPageNewUpdate}
            />
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} className="box-content">
                <Title title="Thể loại" />
                <Row>
                  {categories.length > 0 &&
                    categories.map((item) => {
                      return (
                        <Col
                          className={`category ${
                            category === item.id ? 'category-selected' : ''
                          }`}
                          span={12}
                          onClick={() => {
                            setCategory(item.id);
                          }}
                        >
                          <label>{item?.name}</label>
                        </Col>
                      );
                    })}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Search;
