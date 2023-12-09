import { Button, Form, Input, Select } from 'antd';
import React, { useContext, useState } from 'react';
import './PostManga.scss';
import { toast } from 'react-toastify';
import { MangaContext } from '../../../../../providers/mangaProvider';
import { createManga } from '../../../../../services/Admin';
import { CloseOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const FormManga = ({ setCreatedMangaId, setCurrentStep }) => {
  const { categories } = useContext(MangaContext);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (value, valueObj) => {
    setCategoryList(valueObj.map((obj) => obj.categoryId));
  };

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('selectedFile', selectedFile);
    if (selectedFile) {
      setThumbnail(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setThumbnail(null);
      setPreviewUrl(null);
    }
  };

  const handleDeleteImage = () => {
    setThumbnail(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('authors[0]', author);
    categoryList.forEach((value, index) => {
      formData.append(`categories[${index}]`, value);
    });
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('status', 0);
    formData.append('othernames[0]', 'test');

    console.log('formData', formData);

    try {
      setLoading(true)
      const res = await createManga(formData);
      toast.success(res.message);

      setCurrentStep(1);
      setCreatedMangaId(res.data.id);
      setLoading(false)
    } catch (error) {
      toast.error(error?.message);
    }
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
        label="Tên truyện"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập trên truyện',
          },
        ]}
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <Input className="input-form" />
      </Form.Item>
      <Form.Item
        label="Tác giả"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên tác giả',
          },
        ]}
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        <Input className="input-form" />
      </Form.Item>
      <Form.Item
        label="Thể loại"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn thể loại',
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
          defaultValue={[]}
          onChange={handleChange}
          options={categories.map((category) => ({
            value: category.name,
            label: category.name,
            categoryId: category.id,
          }))}
        />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="description"
        rules={[
          {
            required: true,
            message: 'Mô tả truyện bắt buộc',
          },
        ]}
      >
        <TextArea
          className="input-form"
          rows={4}
          placeholder="maxLength is 6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Thumbnail"
        name="thumbnail"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn Thumbnail',
          },
        ]}
      >
        {!thumbnail ? (
          <label
            className="label-upload-image"
            for="basic_thumbnail"
            style={{ height: 160, width: 140 }}
          >
            Nhấp để upload ảnh
          </label>
        ) : (
          <div
            className="preview-thumbnail"
            style={{ height: 160, width: 140 }}
          >
            <CloseOutlined
              className="preview-thumbnail-close-icon"
              onClick={handleDeleteImage}
            />
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <input
          type="file"
          className="upload-image"
          id="basic_thumbnail"
          accept="image/*"
          onChange={handleThumbnailChange}
        ></input>
      </Form.Item>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0px',
        }}
      >
        <Button
          className="bg-color-main"
          style={{ color: 'white' }}
          onClick={handleSubmit}
          loading={loading}
        >
          Tạo truyện
        </Button>
      </div>
    </Form>
  );
};

export default FormManga;
