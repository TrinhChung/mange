import { useEffect, useRef, useState, useContext } from 'react';
import { Col, Row, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapterDetail } from '../../../services/Guest/index';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Comment from '../DetailManga/Comment';
import ImageCustom from '../../../components/manga/ImageCustom';
import { MangaContext } from '../../../providers/mangaProvider/index';

const DetailChapter = () => {
  const [images, setImages] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [index, setIndex] = useState(0);
  const { name, id } = useParams();
  const chapterElement = useRef(null);
  const navigate = useNavigate();

  const { setHistories } = useContext(MangaContext);

  const fetchDetailChapter = async (id) => {
    const data = await getChapterDetail(id);
    if (data.status === 200 && data.data && data.data.images) {
      setImages(data.data.images);
      if (data.data.manga && data.data.manga.chapters) {
        var arr = data.data.manga.chapters;
        setChapters(
          arr.map((chapter) => {
            return { value: chapter.id, label: chapter.name };
          })
        );
        setIndex(arr.findIndex((chapter) => chapter.id == id));

        saveHistories({
          id: id,
          name: data?.data?.manga?.name,
          thumbnail: data?.data?.manga?.thumbnail,
          slug: data?.data?.manga?.slug,
          time: new Date(),
          chapter: data?.data?.name,
        });
      }
    }
  };

  const saveHistories = ({
    name = '',
    time = null,
    thumbnail = '',
    id = 0,
    chapter = 0,
  }) => {
    const histories =
      localStorage.getItem('histories') !== null
        ? JSON.parse(localStorage.getItem('histories'))
        : [];
    if (histories.length > 10) {
      histories.shift();
    }
    const manga = { name, time, thumbnail, id, chapter };
    if (histories.findIndex((history) => history?.id === id) === -1) {
      histories.unshift(manga);
      localStorage.setItem('histories', JSON.stringify(histories));
      setHistories(histories);
    } else {
      let i = histories.findIndex((history) => history?.id === id);
      histories[i].time = time;
      let newHistories = histories.sort((a, b) => {
        if (a.time.valueOf() < b.time.valueOf()) {
          return 1;
        }
        if (a.time.valueOf() > b.time.valueOf()) {
          return -1;
        }
        return 0;
      });
      localStorage.setItem('histories', JSON.stringify(newHistories));
      setHistories(newHistories);
    }
  };

  useEffect(() => {
    fetchDetailChapter(id);
  }, [id]);

  useEffect(() => {
    const handleScroll = (event) => {
      console.log(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Row style={{ justifyContent: 'center' }} ref={chapterElement}>
      <Col span={18}>
        <Row></Row>
        <Row>Breakcumb</Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Col style={{ fontSize: 40 }}>
            <LeftCircleOutlined
              style={{
                cursor: `${index > 0 ? 'pointer' : 'default'}`,
                color: `${index > 0 ? 'black' : 'gray'}`,
              }}
              onClick={() => {
                if (index - 1 >= 0) {
                  navigate(`/live-manga/${name}/${chapters[index - 1].value}`);
                }
              }}
            />
          </Col>
          {chapters && chapters.length > 0 && (
            <Col>
              <Select
                defaultValue={
                  chapters.length > 0 && index >= 0
                    ? chapters[index]?.label
                    : 'Chapter'
                }
                style={{
                  width: 400,
                }}
                onChange={(value) => {
                  navigate(`/live-manga/${name}/${value}`);
                }}
                value={chapters[index]?.value}
                className="custom-select-chapter"
                options={chapters}
              />
            </Col>
          )}

          <Col style={{ fontSize: 40 }}>
            <RightCircleOutlined
              style={{
                cursor: `${
                  index >= 0 && index < chapters.length - 1
                    ? 'pointer'
                    : 'default'
                }`,
                color: `${
                  index >= 0 && index < chapters.length - 1 ? 'black' : 'gray'
                }`,
              }}
              onClick={() => {
                if (index + 1 < chapters.length) {
                  navigate(`/live-manga/${name}/${chapters[index + 1].value}`);
                }
              }}
            />
          </Col>
        </Row>
        <Row style={{ paddingBottom: 40, minHeight: 800 }}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => {
              return (
                <ImageCustom src={`${image}?${Date.now()}}`} index={index} />
              );
            })}
        </Row>
        <Comment comments={null} />
      </Col>
    </Row>
  );
};

export default DetailChapter;
