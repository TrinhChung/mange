import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
  message,
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';

const TestUploadChapter = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [streamData, setStreamData] = useState('');
  const [chapter, setChapter] = useState(null);
  const [imageOrder, setImageOrder] = useState([]);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    getChapter();
  }, []);

  const getChapter = async () => {
    const res = await axios.get('/api/chapters/18186');
    setChapter(res.data);
    setImageOrder(
      res.data.images.map((image, index) => {
        return { position: index, imageLink: `${image}?${Date.now()}` };
      })
    ); // prevent cache
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      if (fileList.length === 1 && fileList[0].type.includes('zip')) {
        formData.append('zip', fileList[0]);
      } else {
        for (let i = 0; i < fileList.length; i++) {
          formData.append('images[]', fileList[i]);
        }
      }
      setUploading(true);

      const response = await axios.post('/api/chapters/18186', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
          console.log('percentCompleted', percentCompleted);
        },
        responseType: 'stream',
        onDownloadProgress: (progressEvent) => {
          const allLines =
            progressEvent.event.target.responseText.split('data: ');
          setStreamData(allLines[allLines.length - 1]);
        },
      });

      toast.success('Tải ảnh lên thành công');
      setUploading(false);
      setFileList([]);
      setChapter(null);
      await getChapter();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveOrder = async () => {
    try {
      const order = imageOrder.map((data) => data.position);
      setSavingOrder(true);

      const response = await axios.post('/api/chapters/18186/sort', { order });
      toast.success(response.message);
      setSavingOrder(false);
      setChapter(null);
      await getChapter();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const selectOptions = imageOrder
    .filter((data) => data.position !== -1)
    .sort()
    .map((data, index) => {
      return { label: `Trang ${index}`, value: index };
    });

  const handleSwapImage = (oldPosition, newPosition) => {
    const newImageOrder = [...imageOrder];
    const oldIndex = newImageOrder.findIndex(
      (data) => data.position === oldPosition
    );
    const newIndex = newImageOrder.findIndex(
      (data) => data.position === newPosition
    );
    newImageOrder[oldIndex].position = newPosition;
    newImageOrder[newIndex].position = oldPosition;
    setImageOrder(newImageOrder);

    console.log(newImageOrder);
  };

  const handleDeleteIndex = (position) => {
    const newImageOrder = [...imageOrder];
    const index = newImageOrder.findIndex((data) => data.position === position);
    const oldValue = newImageOrder[index].position;
    newImageOrder[index].position = -1;

    // Giảm tất cả các giá trị lớn hơn oldValue đi 1, giữ nguyên imageLink
    for (let i = 0; i < newImageOrder.length; i++) {
      if (newImageOrder[i].position > oldValue) {
        newImageOrder[i].position -= 1;
      }
    }
    setImageOrder(newImageOrder);
  };

  const revertChanges = () => {
    setImageOrder(
      chapter.images.map((image, index) => {
        return { position: index, imageLink: image };
      })
    );
  };

  return (
    <div>
      <Row>
        <Col span={18} offset={3}>
          <Typography.Title level={2}>Tải ảnh lên</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <Typography.Text>
            Tải lên nhiều file ảnh hoặc 1 file zip, tối đa 400MB.
          </Typography.Text>
        </Col>
      </Row>
      <br />

      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col span={18} offset={3}>
          <input
            type="file"
            onChange={(e) => {
              setFileList(e.target.files);
              setUploadProgress(null);
              setStreamData('');
            }}
            multiple
            accept="image/png, image/jpeg, image/jpg, application/zip"
            placeholder="Chọn file (nhiều file ảnh hoặc 1 file zip)"
          />
        </Col>
      </Row>

      <Row>
        <Col span={18} offset={3}>
          <Progress percent={uploadProgress} />
          {streamData ? `Đồng bộ dữ liệu ảnh: ${streamData}` : ''}
        </Col>
      </Row>

      <Row>
        <Col span={18} offset={3}>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Đang tải lên' : 'Tải ảnh lên'}
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={18} offset={3}>
          <Row gutter={[16, 16]}>
            {chapter ? (
              [...imageOrder]
                .sort((a, b) => a.position - b.position)
                .map((data, index) => {
                  if (data.position === -1) return null;
                  let imageName = data.imageLink.split('/').slice(-1)[0];
                  if (imageName.split('?').length > 1)
                    imageName = imageName.split('?')[0];
                  return (
                    <Col span={6} key={data.position}>
                      <Card
                        title={
                          <Select
                            value={data.position}
                            options={selectOptions}
                            onChange={(v) => handleSwapImage(data.position, v)}
                          />
                        }
                        extra={
                          <Button
                            type="link"
                            danger
                            onClick={() => handleDeleteIndex(data.position)}
                          >
                            <DeleteOutlined />
                          </Button>
                        }
                      >
                        <Image
                          src={data.imageLink.replace(
                            'images',
                            'images/thumbnail'
                          )}
                          preview={{ src: data.imageLink }}
                        />
                        <br />
                        <Typography.Text>{imageName}</Typography.Text>
                      </Card>
                    </Col>
                  );
                })
            ) : (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />
            )}
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col offset={6} span={12} align="middle">
          <Space>
            <Button
              disabled={imageOrder.every(
                (data, index) => data.position === index
              )}
              onClick={revertChanges}
            >
              Hoàn tác
            </Button>
            <Button
              disabled={imageOrder.every(
                (data, index) => data.position === index
              )}
              type="primary"
              onClick={handleSaveOrder}
              loading={savingOrder}
            >
              Lưu lại
            </Button>
          </Space>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default TestUploadChapter;
