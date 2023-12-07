import { Row, Col, Steps, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import FormManga from './FormManga';
import FormChapter from './FormChapter';
import PostSuccess from './PostSuccess';
import { getCategories } from '../../../../../services/Guest';
import { MangaContext } from '../../../../../providers/mangaProvider';

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
            <FormManga currentStep={currentStep} setCurrentStep={setCurrentStep}/>
          ) : currentStep === 1 ? (
            <FormChapter currentStep={currentStep} setCurrentStep={setCurrentStep}/>
          ) : (
            <PostSuccess />
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default PostManga;
