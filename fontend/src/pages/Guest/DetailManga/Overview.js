import { useState, useContext, useMemo, useEffect } from 'react';
import { Col, Row, Rate, Image, Skeleton, Form, Modal, Input, Select } from 'antd';
import RowInfo from './RowInfo';
import { hostImg } from '../../../const/index';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../components/layout/ConfirmModal';
import { AuthContext } from '../../../providers/authProvider';
import { mangaBookmark, voteManga } from '../../../services/User/index';
import { toast } from 'react-toastify';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { checkInputVote } from '../../../utils/commonFunc';
import { MangaContext } from '../../../providers/mangaProvider';
import { editManga } from '../../../services/Admin';
const { TextArea } = Input;

const Overview = ({ manga = null, loading = true, handleReloadManga }) => {
  const { authUser } = useContext(AuthContext);
  const [change, setChange] = useState(false);
  const [score, setScore] = useState(
    checkInputVote(Number(manga?.vote_score ? manga.vote_score : 0))
  );
  const [userScore, setUserScore] = useState(0);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (manga?.vote_score) {
      setScore(
        checkInputVote(Number(manga?.vote_score ? manga.vote_score : 0))
      );
      setUserScore(manga?.user_vote ? manga.user_vote : 0);
    }
  }, [manga]);

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

  const { categories } = useContext(MangaContext);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpenEditMangaModal, setIsOpenEditMangaModal] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false)

  const handleChange = (value, valueObj) => {
    setCategoryList(valueObj.map((obj) => obj.categoryId));
  };

  console.log(description);

  const handleOpenEditMangaModal = () => {
    setIsOpenEditMangaModal(true)
    console.log(manga);
    setName(manga?.name)
    setDescription(manga?.description)
    setAuthor(manga?.authors[0]?.name)
    setCategoryList(manga?.categories?.map((category) =>  category.id))
    setPreviewUrl(hostImg + manga?.thumbnail)
  }


  const handleCloseEditMangaModal = () => {
    setIsOpenEditMangaModal(false)
    console.log(manga);
    setName('')
    setDescription('')
    setAuthor('')
    setCategoryList(null)
    handleDeleteImage()
  }


  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('selectedFile', selectedFile);
    if (selectedFile) {
      setThumbnail(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setThumbnail(null);
      setPreviewUrl(null);
    }
  };

  const handleDeleteImage = () => {
    setThumbnail(null);
    setPreviewUrl(null);
  };

  const handleSubmitEditManga = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('authors[0]', author);
    categoryList.forEach((value, index) => {
      formData.append(`categories[${index}]`, value);
    });
    formData.append('description', description);
    formData.append('status', 0);
    formData.append('othernames[0]', 'test');

    console.log('thumbnail', thumbnail);
    if(thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {

      setConfirmLoading(true)
      const res = await editManga(manga?.id ,formData);
      toast.success(res.message);
      setIsOpenEditMangaModal(false)
      handleReloadManga()

      setConfirmLoading(false)

    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
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
              <RowInfo
                children={`Đánh giá:`}
                content={`${manga?.vote_score}/5 - (${
                  manga?.vote_count ? manga.vote_count : 0
                }) Lượt đánh giá`}
              />
              <Row style={{ color: 'var(--gray)', height: 30, fontSize: 16 }}>
                <Col
                  style={{
                    minWidth: 110,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <label>Đánh giá chung:</label>
                </Col>
                <Col>
                  <Rate allowHalf value={score} disabled={true} />
                </Col>
              </Row>
              {authUser ? (
                <Row style={{ color: 'var(--gray)', height: 30, fontSize: 16 }}>
                  <Col
                    style={{
                      minWidth: 110,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <label>Đánh giá của bạn</label>
                  </Col>
                  <Col>
                    <Rate
                      allowHalf
                      value={userScore}
                      onChange={async (score) => {
                        try {
                          setUserScore(score);
                          const data = await voteManga({
                            id: manga?.id,
                            score: score,
                          });
                          if (data.success === 200) {
                            toast.success('Đánh giá thành công');
                          }
                        } catch (error) {
                          toast.error(error.message);
                        }
                      }}
                    />
                  </Col>
                </Row>
              ) : null}

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
                  {manga?.user_bookmarked === true ? (
                    <CheckOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                  Theo dõi
                </Col>

                {authUser?.role == 'admin' && (
                  <> 
                  <Col
                    className="button-view bg-color-jade button-hover-primary"
                    onClick={handleOpenEditMangaModal}
                  >
                    Sửa truyện
                  </Col><Col
                  className="button-view bg-color-jade button-hover-primary"
                  onClick={() => {
                    navigate(`/profile/post/${manga?.id}`);
                  }}
                >
                  Thêm chapter
                </Col></>
                )}
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
    <Modal
    title={`Chỉnh sửa thông tin truyện`}
    open={isOpenEditMangaModal}
    centered={true}
    onOk={handleSubmitEditManga}
    onCancel={handleCloseEditMangaModal}
    confirmLoading={confirmLoading}
  >
  <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      labelAlign="left"
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      style={{ width: '100%', paddingTop: 40 }}
    >
      <Form.Item
        label="Tên truyện"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập trên truyện',
          },
        ]}
      
      >
        <Input className="input-form"  value={name}
        onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Tác giả"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên tác giả',
          },
        ]}
       
      >
        <Input className="input-form"  value={author}
        onChange={(e) => setAuthor(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="Thể loại"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn thể loại',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          className="select-input"
          placeholder="Vui lòng chọn"
          defaultValue={manga?.categories?.map((category) => ({
            value: category.name,
            label: category.name,
            categoryId: category.id,
          }))}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.name,
            label: category.name,
            categoryId: category.id,
          }))}
        />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Mô tả truyện bắt buộc',
          },
        ]}
      >
        <Input
          className="input-form"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Thumbnail"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn Thumbnail',
          },
        ]}
      >
        {!previewUrl ? (
          <label
            className="label-upload-image"
            for="basic_thumbnail"
            style={{ height: 160, width: 140 }}
          >
            Nhấp để upload ảnh
          </label>
        ) : (
          <div
            className="preview-thumbnail"
            style={{ height: 160, width: 140 }}
          >
            <CloseOutlined
              className="preview-thumbnail-close-icon"
              onClick={handleDeleteImage}
            />
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <input
          type="file"
          className="upload-image"
          id="basic_thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
        ></input>
      </Form.Item>
    </Form>
  </Modal></>
  );
};

export default Overview;
