import { Row, Col, Steps, Button } from 'antd';
import React, { useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import FormManga from './FormManga';
import FormChapter from './FormChapter';
import PostSuccess from './PostSuccess';

const PostManga = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const items = [
    {
      title: <Row className="bold">Tạo truyện</Row>,
    },
    {
      title: <Row className="bold">Đăng chapter</Row>,
    },
  ];

  const breadcrumbData = [
    {
      title: 'Trang chủ',
    },
    {
      title: 'User',
    },
    {
      title: 'Đăng truyện',
      href: '/profile/post',
    },
  ];

  return (
    <Row className="box-content">
      <Col span={24}>
        <Row>
          <TitleTopLeft title="Tải truyện" itemList={breadcrumbData} />
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Steps
            current={currentStep}
            labelPlacement="vertical"
            items={items}
          />
        </Row>
        <Row>
          {currentStep === 0 ? (
            <FormManga />
          ) : currentStep === 1 ? (
            <FormChapter />
          ) : (
            <PostSuccess />
          )}
        </Row>
        <Row style={{ justifyContent: 'center', padding: '10px 0px' }}>
          <Button
            className="bg-color-main"
            style={{ color: 'white' }}
            onClick={() => {
              if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                setCurrentStep(currentStep % 3);
              }
            }}
          >
            Next
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default PostManga;
