import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { hostImg } from '../../const/index';

const MangaHistory = ({ manga = null }) => {
  const navigate = useNavigate();

  return (
    <Col key={manga?.id} className="manga">
      <Row>
        <img
          key={manga.id}
          src={manga?.thumbnail ? hostImg + manga.thumbnail : ''}
          style={{ width: 150, height: 200, cursor: 'pointer' }}
          onClick={() => {
            if (manga?.id) {
              navigate(`/detail-manga/${manga.id}`);
            }
          }}
          className="box-hover"
        />
      </Row>
      <Row
        style={{
          paddingTop: 8,
          width: 150,
          fontWeight: 'bold',
          fontSize: 14,
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate(`/live-manga/${manga?.slug}/${manga.id}`);
        }}
      >
        #{manga?.chapter ? manga.chapter : '100'}
      </Row>
      <Row
        style={{
          paddingTop: 4,
          fontSize: 14,
          width: 150,
          fontWeight: 'bold',
          color: 'var(--gray)',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (manga && manga.slug) {
            navigate(`/detail-manga/${manga.id}`);
          }
        }}
      >
        {manga?.name ? manga.name : 'Name'}
      </Row>
    </Col>
  );
};

export default MangaHistory;
