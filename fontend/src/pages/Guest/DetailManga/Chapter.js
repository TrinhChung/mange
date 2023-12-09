import React, { memo, useContext } from 'react';
import { Col, Row, Skeleton } from 'antd';
import TitleChildren from '../../../components/layout/TitleChildren';
import { UnorderedListOutlined, EditOutlined,FileAddOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/authProvider';

const Chapter = ({ chapters = [], nameManga = 'name', loading = true ,isOpenEditChapterModal, setIsOpenEditChapterModal, setSelectedChapterId}) => {
  const { authUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleViewChapter = (chapter) => {
    navigate(`/live-manga/${nameManga}/${chapter.id}`);
  };

  const RowChapter = ({ chapter, date, action = () => {} }) => {
    return (
      <Row
        style={{
          justifyContent: 'space-between',
          fontSize: 16,
          height: 30,
        }}
      >
        <Col
          style={{ fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => action(chapter)}
        >
          {chapter?.name}
        </Col>
        <Col style={{ fontSize: 16, paddingRight: 16 }}>{date}</Col>
      </Row>
    );
  };

  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren
            children={<UnorderedListOutlined />}
            title="Danh sách chương truyện"
          />
        </Row>
        <Row
          style={{
            color: 'var(--gray)',
            fontSize: 16,
            justifyContent: 'center',
          }}
        >
          <Col span={22}>
            <Row style={{ paddingBottom: 20 }}></Row>
            <RowChapter
              chapter={
                <Col
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}
                >
                  Chapter
                </Col>
              }
              date={
                <Col
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: 16,
                    paddingRight: authUser?.role === 'admin'? 90 : 10,
                  }}
                >
                  Ngày cập nhật
                </Col>
              }
            />
            <Row
              style={{
                border: '2px solid var(--gray)',
                padding: '10px 10px',
                borderRadius: 8,
                height: 700,
                overflow: 'auto',
              }}
            >
              <Col span={24}>
                {chapters && chapters.length > 0 && !loading ? (
                  chapters.map((chapter) => {
                    return (
                      <RowChapter
                        chapter={chapter}
                        date={
                          <div   style={{ display: 'flex', gap: 25}}>
                            {chapter?.created_at_formated}{' '}
                            {authUser?.role === 'admin' && (
                              <div       style={{ fontSize: 20,display: 'flex', gap: 16 }}>
                              <FileAddOutlined onClick={() =>
                                navigate(
                                  `/profile/post/${chapter?.manga_id}/${chapter?.id}`
                                )
                              } />
                              <EditOutlined
                                onClick={ () => {setSelectedChapterId({id: chapter?.id, number: chapter?.number})
                                  setIsOpenEditChapterModal(true)}}
                          
                              /> </div>
                            )}
                          </div>
                        }
                        action={handleViewChapter}
                      />
                    );
                  })
                ) : (
                  <Skeleton
                    active={true}
                    paragraph={{
                      rows: 100,
                    }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default memo(Chapter);
