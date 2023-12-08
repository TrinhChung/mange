import React from 'react';
import { Col, Row, Image, Typography, Badge } from 'antd';
import { hostImg } from '../../const/index';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
const { Paragraph } = Typography;
const NotifyCard = ({
  notify = {
    read_at: true,
    slug: 'inu-yashiki',
    chapter_id: '12074',
    thumbnail: 'inu-yashiki/thumbnail.jpg',
  },
}) => {
  const navigate = useNavigate();

  return (
    <Row className="notify-card">
      <Col>
        <Badge dot={notify?.read_at}>
          <Image
            width={50}
            height={70}
            src={notify ? hostImg + notify?.thumbnail : null}
            preview={false}
            className="box-hover"
            onClick={() => {
              navigate(`/live-manga/${notify?.slug}/${notify?.chapter_id}`);
            }}
          />
        </Badge>
      </Col>
      <Col style={{ paddingLeft: 8 }}>
        <Row style={{ fontWeight: 'bold', maxWidth: '100px!important' }}>
          <Paragraph
            className="content-notify"
            ellipsis={{
              rows: 3,
              suffix: '...',
            }}
            onClick={() => {
              navigate(`/live-manga/${notify?.slug}/${notify?.chapter_id}`);
            }}
          >
            {notify?.content
              ? notify.content
              : 'Consssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstentssssssssssssss'}
          </Paragraph>
        </Row>
        <Row>{notify?.time ? notify.time : '10 giờ trước'}</Row>
      </Col>
    </Row>
  );
};

export default NotifyCard;
