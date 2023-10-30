import { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'antd';
import Overview from './Overview';
import Content from './Content';
import Chapter from './Chapter';
import ListMangaSide from '../../../components/manga/ListMangaSide';
import { useNavigate, useParams } from 'react-router-dom';
import { getMangaDetail } from '../../../services/Guest/index';
import { MangaContext } from '../../../providers/mangaProvider/index';
import { toast } from 'react-toastify';

const DetailManga = () => {
  const { histories } = useContext(MangaContext);
  const [manga, setManga] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate();

  const fetchDetailManga = async (id) => {
    try {
      setLoading(true);
      const data = await getMangaDetail(id);
      if (data && data.status === 200) {
        setManga(data.data);
      }
    } catch (error) {
      console.log(error);
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

  return (
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
            />
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
    </Row>
  );
};

export default DetailManga;
