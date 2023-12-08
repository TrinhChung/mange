import React, { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { createChapter } from '../../../../../services/Admin';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
const { TextArea } = Input;

const FormChapter = ({ createdMangaId, setFirstChapterId, setCurrentStep }) => {
  const {mangaId} = useParams();

  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('number', number);

    console.log('formData', formData);

    try {
      const res = await createChapter(mangaId ? mangaId : createdMangaId, formData);
      toast.success(res.message);

      setCurrentStep(2);
      setFirstChapterId(res.data.id)
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
        label="Chapter số"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập chapter',
          },
        ]}
      >
        <InputNumber
          className="input-form"
          min={0}
          value={number}
          onChange={(value) => setNumber(value)}
        />
      </Form.Item>
      <Form.Item
        label="Tiêu đề"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tiêu đề',
          },
        ]}
      >
        <Input
          className="input-form"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0px',
          gap: 20
        }}
      >
        <Button
          className="bg-color-main"
          style={{ color: 'white' }}
          onClick={handleSubmit}
        >
          Tạo chapter
        </Button>

        <Button
              onClick={() => navigate('/')}         type="primary"
            >
              Bỏ qua
            </Button>
      </div>
    </Form>
  );
};

export default FormChapter;
