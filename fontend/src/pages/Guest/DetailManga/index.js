import { useEffect, useState, useContext } from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import Overview from './Overview';
import Content from './Content';
import Chapter from './Chapter';
import ListMangaSide from '../../../components/manga/ListMangaSide';
import { useNavigate, useParams } from 'react-router-dom';
import { getMangaDetail } from '../../../services/Guest/index';
import { MangaContext } from '../../../providers/mangaProvider/index';
import { toast } from 'react-toastify';
import Comment from './Comment';
import { editChapter } from '../../../services/Admin';

const DetailManga = () => {
  const { histories } = useContext(MangaContext);
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate();

  const [chapterName, setChapterName] = useState('')
  const [selectedChapterId, setSelectedChapterId] = useState(null)
  const [isOpenEditChapterModal, setIsOpenEditChapterModal] = useState(false)

  const fetchDetailManga = async (id) => {
    try {
      setLoading(true);
      const data = await getMangaDetail(id);
      if (data && data.status === 200) {
        setManga(data.data);
      }
    } catch (error) {
      toast.error('Không tìm thấy dữ liệu');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchDetailManga(name);
    }
  }, [name]);

  const handleEditChapter = async () => {
try {
  console.log(selectedChapterId);
  const res = await editChapter(selectedChapterId.id, {number: selectedChapterId.number, name: chapterName})
  toast.success(res.message)
  setIsOpenEditChapterModal(false)
  setChapterName('')
} catch (error) {
  toast.error(error?.message)
  
}
  }

  return (
    <>
    <Row style={{ justifyContent: 'center' }}>
      <Col span={18}>
        <Row>
          <Col span={16}>
            <Overview manga={manga} loading={loading} />
            <Content content={manga?.description} loading={loading} />
            <Chapter
              chapters={manga?.chapters}
              nameManga={manga?.slug}
              loading={loading}
              isOpenEditChapterModal={isOpenEditChapterModal}
              setIsOpenEditChapterModal={setIsOpenEditChapterModal}
              setSelectedChapterId={setSelectedChapterId}
            />
            <Comment isChapter={false} id={name} />
          </Col>
          <Col span={8}>
            <ListMangaSide
              listManga={histories}
              title={'Đề xuất'}
              isDate={false}
            />
            <ListMangaSide listManga={histories} title={'Lịch sử'} />
          </Col>
        </Row>
      </Col>
    </Row><Modal
    title={`Chỉnh sửa tên chapter`}
    open={isOpenEditChapterModal}
    centered={true}
    onOk={   handleEditChapter}
    onCancel={() => setIsOpenEditChapterModal(false)}
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
        label="Tiêu đề"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
          },
        ]}
      >
        <Input
          className="input-form"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />
      </Form.Item>
    </Form>
  </Modal></>
  );
};

export default DetailManga;
