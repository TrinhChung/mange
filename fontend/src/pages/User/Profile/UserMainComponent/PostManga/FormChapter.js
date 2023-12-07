import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const FormChapter = ({currentStep, setCurrentStep}) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setUploadedImages([...uploadedImages, ...files]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = () => {
      setCurrentStep(2)
}

  return (
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
        label="Chapter"
        name="chapter"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập chapter',
          },
        ]}
      >
        <Input className="input-form" />
      </Form.Item>
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
          },
        ]}
      >
        <Input className="input-form" />
      </Form.Item>

      {/* <Form.Item
        label="Tóm tắt"
        name="summary"
        rules={[
          {
            required: true,
            message: 'Nhập tóm tắt chapter',
          },
        ]}
      >
        <TextArea
          className="input-form"
          rows={4}
          placeholder="maxLength is 6"
          maxLength={6}
        />
      </Form.Item> */}
      <Form.Item
        label="Nội dung"
        name="content"
        rules={[
          {
            required: true,
            message: 'Upload nội dung chapter',
          },
        ]}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Form.Item>

      {uploadedImages.length > 0 && (
        <div className="image-preview">
          {uploadedImages.map((image, index) => (
            <div className="image-preview-item">
              <div className="image-preview-item-top">
                <span>Page: {index + 1}</span>
                <CloseCircleOutlined
                  style={{ color: '#eb2f96', cursor: 'pointer' }}
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
              <div className="image-preview-item-name">{image.name}</div>
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`image ${index}`}
              />
            </div>
          ))}
        </div>
      )}

<div style={{  display: 'flex',justifyContent: 'center', padding: '10px 0px' }}>
          <Button
            className="bg-color-main"
            style={{ color: 'white' }}
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
    </Form>
  );
};

export default FormChapter;
