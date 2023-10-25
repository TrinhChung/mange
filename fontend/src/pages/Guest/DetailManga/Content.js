import React from 'react';
import { Col, Row, Rate, Image, Skeleton } from 'antd';
import TitleChildren from '../../../components/layout/TitleChildren';
import { AlignLeftOutlined } from '@ant-design/icons';

const Content = ({ content = '', loading = true }) => {
  return (
    <Row className="box-content" style={{ marginRight: 20 }}>
      <Col span={24}>
        <Row>
          <TitleChildren children={<AlignLeftOutlined />} title="Nội dung" />
        </Row>
        <Row style={{ color: 'var(--gray)', fontSize: 16 }}>
          {content && !loading ? (
            content
          ) : (
            <Skeleton
              active={true}
              paragraph={{
                rows: 4,
              }}
            />
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Content;
