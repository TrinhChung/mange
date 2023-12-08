import { Row, Col, Steps, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import TitleTopLeft from '../../../../../components/layout/TitleTopLeft';
import FormManga from './FormManga';
import FormChapter from './FormChapter';
import { getCategories } from '../../../../../services/Guest';
import { MangaContext } from '../../../../../providers/mangaProvider';
import UploadImage from './UploadImage';

const PostManga = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [createdMangaId, setCreatedMangaId] = useState(null);
  const [firstChapterId, setFirstChapterId] = useState(null);

  const items = [
    {
      title: <Row className="bold">Tạo truyện</Row>,
    },
    {
      title: <Row className="bold">Tạo chapter</Row>,
    },
    {
      title: <Row className="bold">Tải ảnh lên</Row>,
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
            <FormManga
              setCreatedMangaId={setCreatedMangaId}
              setCurrentStep={setCurrentStep}
            />
          ) : currentStep === 1 ? (
            <FormChapter
              createdMangaId={createdMangaId}
              setFirstChapterId={setFirstChapterId}
              setCurrentStep={setCurrentStep}
            />
          ) : (
            <UploadImage firstChapterId={firstChapterId}/>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default PostManga;
