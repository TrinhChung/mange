import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import NewUp from '../home/NewUp';
import { useContext } from 'react';
import { MangaContext } from '../../../providers/mangaProvider/index';
import Title from '../../../components/layout/Title';
import './Search.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMangaNewUpdate } from '../../../services/Guest/index';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { newUpdates, categories } = useContext(MangaContext);
  const [results, setResults] = useState(newUpdates);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(-1);
  const [sortBy, setSortBy] = useState('0');
  const [search, setSearch] = useState('');

  const criteria = [
    { label: 'Ngày cập nhật', value: 'updated_at' },
    { label: 'Top All', value: 'top-all' },
    { label: 'Top tháng', value: 'month' },
    { label: 'Top tuần', value: 'week' },
    { label: 'Đánh giá', value: 'vote_score' },
    { label: 'Số bình luận', value: 'comment_count' },
    { label: 'Số theo dõi', value: 'follow_count' },
    { label: 'Số chapter', value: 'chapter' },
  ];

  useEffect(() => {
    setLoading(true);
    setResults(newUpdates);
    setLoading(false);
  }, [newUpdates]);

  useEffect(() => {
    setSearch(searchParams.get('search') ? searchParams.get('search') : '');
    const queryCategories = searchParams.get('category')
      ? searchParams.get('category')
      : '';

    const category = queryCategories.split(',');
    if (category.length > 0) {
      setCategory(category);
    } else {
      setCategory(null);
    }
  }, [searchParams.toString()]);

  const setPageNewUp = ({ page }) => {
    setPage(page);
  };

  const searchManga = async (params) => {
    setLoading(true);
    try {
      const data = await getMangaNewUpdate({
        page: page,
        per_page: 30,
        params: { ...params },
      });

      if (data.status === 200 && data?.data) {
        setResults({ total: data.meta.last_page, manga: data.data });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    var params = {};
    if (category.length > 0) {
      params['category'] = category;
    }
    if (status >= 0) {
      params['status'] = status;
    }

    if (sortBy && sortBy !== '0') {
      if (sortBy === 'month' || sortBy === 'week') {
        params['sort'] = '-top_view_count';
        params['time'] = sortBy;
      } else {
        params['sort'] = sortBy;
      }
    }

    params['search'] = search;

    searchManga(params);
  }, [category, status, page, sortBy, search]);

  const findCategory = (key) => {
    if (!category || !key) return -1;
    for (let i = 0; i < category.length; i++) {
      if (category[i] == key) {
        return i;
      }
    }
    return -1;
  };

  const removeCategoryByIndex = (index) => {
    if (!category) return [];
    const newArr = new Array();
    for (var i = 0; i < category.length; i++) {
      if (i != index) {
        newArr.push(category[i]);
      }
    }
    return newArr;
  };

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
                    <Row gutter={[8, 8]}>{search}</Row>
                  </Col>
                </Row>
                <Row style={{ paddingTop: 16 }}>
                  <Col className="label-filter" span={8}>
                    Trạng thái
                  </Col>
                  <Col span={16}>
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Button
                          className={`button-filter ${status === -1 ? 'button-selected' : ''
                            }`}
                          onClick={() => setStatus(-1)}
                        >
                          Tất cả
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className={`button-filter ${status === 1 ? 'button-selected' : ''
                            }`}
                          onClick={() => {
                            setStatus(1);
                          }}
                        >
                          Hoàn thành
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className={`button-filter ${status === 0 ? 'button-selected' : ''
                            }`}
                          onClick={() => {
                            setStatus(0);
                          }}
                        >
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
                            <Button
                              className={`button-filter ${sortBy === item.value ? 'button-selected' : ''
                                }`}
                              onClick={() => setSortBy(item.value)}
                            >
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
              manga={results?.manga}
              total={results?.total}
              setPage={setPageNewUp}
              loading={loading}
              title="Kết quả tìm kiếm"
              page={page}
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
                          className={`category ${findCategory(item.id) !== -1
                              ? 'category-selected'
                              : ''
                            }`}
                          span={12}
                          onClick={() => {
                            const check = findCategory(item.id);
                            if (check === -1) {
                              const newCategory = [...category, item.id];
                              setCategory(newCategory);
                              searchParams.set('category', newCategory);
                            } else {
                              const newCategory = removeCategoryByIndex(check);
                              setCategory(newCategory);
                              searchParams.set('category', newCategory);
                            }
                            navigate('/search/?' + searchParams.toString());
                          }}
                        >
                          <label style={{ cursor: 'pointer' }}>
                            {item?.name}
                          </label>
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
