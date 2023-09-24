import React from 'react';
import { Form, Input, Select } from 'antd';
const { TextArea } = Input;

const FormChapter = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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

      <Form.Item
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
      </Form.Item>
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
        <input type="file" multiple />
      </Form.Item>
    </Form>
  );
};

export default FormChapter;
