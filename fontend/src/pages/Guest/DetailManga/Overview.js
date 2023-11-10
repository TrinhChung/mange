import { useState, useContext, useMemo } from 'react';
import { Col, Row, Rate, Image, Skeleton } from 'antd';
import RowInfo from './RowInfo';
import { hostImg } from '../../../const/index';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../components/layout/ConfirmModal';
import { AuthContext } from '../../../providers/authProvider';
import { mangaBookmark } from '../../../services/User/index';
import { toast } from 'react-toastify';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

const Overview = ({ manga = null, loading = true }) => {
  const { authUser } = useContext(AuthContext);
  const [change, setChange] = useState(false);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const infos = [
    // { children: 'Dịch giả', content: 'translator' },
    { children: 'Lượt theo dõi:', content: 'follow_count' },
    { children: 'Lượt xem:', content: 'view_count' },
  ];

  const SkeletonOverview = () => {
    return (
      <Row>
        <Col>
          <Skeleton.Image active={true} style={{ width: 180, height: 200 }} />
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
            {
              <Skeleton
                active={true}
                paragraph={{
                  rows: 1,
                }}
              />
            }
          </Row>
          <RowInfo
            children={'Tác giả'}
            content={
              <Skeleton
                active={true}
                paragraph={{
                  rows: 1,
                }}
              />
            }
          />
          {infos.map((rowInfo) => (
            <RowInfo
              children={rowInfo.children}
              content={
                <Skeleton
                  active={true}
                  paragraph={{
                    rows: 1,
                  }}
                />
              }
            />
          ))}
          <Skeleton
            active={true}
            paragraph={{
              rows: 1,
            }}
          />
          <Row
            style={{
              gap: 8,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <Skeleton
              active={true}
              paragraph={{
                rows: 1,
              }}
            />
          </Row>
          <Row style={{ gap: 12 }}>
            <Skeleton
              active={true}
              paragraph={{
                rows: 3,
              }}
            />
          </Row>
        </Col>
      </Row>
    );
  };

  const fetchMangaBookmark = async (id) => {
    try {
      const data = await mangaBookmark(id);
      if (data.status === 200 && data.success == 1) {
        toast.success(data?.message, 2);
        setChange(!change);
      } else {
        toast.error('Theo dõi thất bại', 2);
      }
    } catch (error) {
      console.log(error);
      toast.error('Theo dõi thất bại', 2);
    }
  };

  const followElement = useMemo(() => {
    return manga?.user_bookmarked === true ? (
      <CheckOutlined />
    ) : (
      <PlusOutlined />
    );
  }, [change]);

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <ConfirmModal
        isModalOpen={isModalOpen}
        handleOk={() => {
          navigate('/auth/login');
          setIsModalOpen(false);
        }}
        handleCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <Col span={24}>
        {loading === true ? (
          <SkeletonOverview />
        ) : (
          <Row>
            <Col span={6}>
              <Image
                src={manga?.thumbnail ? hostImg + manga?.thumbnail : null}
                width={180}
                height={240}
                preview={false}
              />
            </Col>
            <Col span={18} style={{ paddingLeft: 40 }}>
              <Row
                style={{
                  height: 32,
                  fontSize: 24,
                  fontWeight: 'bold',
                  paddingBottom: 50,
                  wordWrap: 'break-word',
                  marginBottom: 30,
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
              <RowInfo
                children={'Tình trạng:'}
                content={
                  manga && manga.status === '1'
                    ? 'Đã hoàn thành'
                    : 'Chưa hoàn thành'
                }
              />
              {infos.map((rowInfo) => (
                <RowInfo
                  children={rowInfo.children}
                  content={
                    manga && manga[rowInfo.content]
                      ? manga[rowInfo.content]
                      : '0'
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
                    return (
                      <Col className="badge-category">{category?.name}</Col>
                    );
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
                <Col
                  className="button-view bg-color-jade button-hover-jade"
                  onClick={() => {
                    if (!authUser) {
                      setIsModalOpen(true);
                    } else {
                      fetchMangaBookmark(manga?.id);
                      manga.user_bookmarked = !manga.user_bookmarked;
                    }
                  }}
                >
                  {followElement}
                  Theo dõi
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Overview;
