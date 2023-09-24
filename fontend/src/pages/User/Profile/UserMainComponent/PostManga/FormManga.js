import { Form, Input, Select } from 'antd';
import React from 'react';
import './PostManga.scss';

const { TextArea } = Input;

const FormManga = () => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

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
        label="Tác giả"
        name="author"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên tác giả',
          },
        ]}
      >
        <Input className="input-form" />
      </Form.Item>
      <Form.Item
        label="Dịch giả"
        name="translator"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên dịch giả',
          },
        ]}
      >
        <Input className="input-form" />
      </Form.Item>
      <Form.Item
        label="Chủ đề"
        name="topic"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn chủ đề',
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          className="select-input"
          placeholder="Vui lòng chọn"
          defaultValue={['a10', 'c12']}
          onChange={handleChange}
          options={options}
        />
      </Form.Item>
      <Form.Item
        label="Giới thiệu"
        name="description"
        rules={[
          {
            required: true,
            message: 'Giới thiệu truyện bắt buộc',
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
        label="Tình trạng"
        name="status"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn tình trạng truyện',
          },
        ]}
      >
        <Select
          defaultValue="lucy"
          style={{
            width: 400,
          }}
          className="select-input"
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'Yiminghe',
              label: 'yiminghe',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Ảnh bìa"
        name="thumbnail"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ảnh bìa',
          },
        ]}
      >
        <label
          className="label-upload-image"
          for="basic_thumbnail"
          style={{ height: 160, width: 140 }}
        >
          Nhấp để upload ảnh
        </label>
        <input
          type="file"
          className="upload-image"
          id="basic_thumbnail"
        ></input>
      </Form.Item>
      <Form.Item
        label="Ảnh chính"
        name="main-image"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn ảnh đại diện',
          },
        ]}
      >
        <label
          className="label-upload-image"
          for="basic_thumbnail"
          style={{ height: 141, width: 231 }}
        >
          Nhấp để upload ảnh
        </label>
        <input
          type="file"
          className="upload-image"
          id="basic_thumbnail"
        ></input>
      </Form.Item>
    </Form>
  );
};

export default FormManga;
