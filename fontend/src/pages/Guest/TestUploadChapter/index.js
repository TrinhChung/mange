import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Image, Progress, Row, Select, Spin, Typography, Upload, message } from 'antd';
import { UploadOutlined, InboxOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import axios from '../../../config/axios';

const TestUploadChapter = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [streamData, setStreamData] = useState('');
    const [chapter, setChapter] = useState(null);
    const [imageOrder, setImageOrder] = useState([]);

    useEffect(() => {
        getChapter()
    }, [])

    const getChapter = async () => {
        const res = await axios.get('/api/chapters/18186');
        setChapter(res.data);
        setImageOrder(res.data.images.map((image, index) => index));
    }

    const handleUpload = async () => {
        const formData = new FormData();
        if (fileList.length === 1 && fileList[0].type === 'application/zip') {
            formData.append('zip', fileList[0]);
        } else {
            for (let i = 0; i < fileList.length; i++) {
                formData.append('images[]', fileList[i]);
            }
        }
        setUploading(true);

        const response = await axios.post('/api/chapters/18186', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
                console.log("percentCompleted", percentCompleted);
            },
            responseType: 'stream',
            onDownloadProgress: (progressEvent) => {
                const allLines = progressEvent.event.target.responseText.split('data: ');
                setStreamData(allLines[allLines.length - 1]);
            }
        })

        setUploading(false);
        setFileList([]);
        setChapter(null);
        await getChapter();
    };

    const [previous, setPrevious] = useState(null);
    const selectOptions = imageOrder.filter((number) => number !== -1).sort().map((number, index) => { return { label: `Trang ${index}`, value: index } })

    const swapImageHandle = (e, index) => {
        // index là vị trí cũ, value là vị trí mới
        const newImageOrder = [...imageOrder];
        const temp = newImageOrder[index];
        newImageOrder[index] = newImageOrder[e.target.value];
        newImageOrder[e.target.value] = temp;
        setImageOrder(newImageOrder);
        e.target.value = previous;
        setPrevious(null);
    }

    return <div>
        <Row>
            <Typography.Title level={2}>Tải ảnh lên</Typography.Title>
        </Row>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={18} offset={3}>
                <input type="file" onChange={(e) => { setFileList(e.target.files); setUploadProgress(null); setStreamData('') }} multiple accept='image/png, image/jpeg, image/jpg, application/zip' />
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
                <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0} loading={uploading} style={{ marginTop: 16 }}>
                    {uploading ? 'Đang tải lên' : 'Tải ảnh lên'}
                </Button>
            </Col>
        </Row>

        <Row style={{ marginTop: 16 }}>
            <Col span={18} offset={3}>
                <Row gutter={[16, 16]}>
                    {chapter ? imageOrder.map((number, index) => {
                        const imageName = chapter.images[number].split('/').slice(-1)[0];
                        if (number === -1) return null;
                        return <Col span={6} key={number}>
                            <Card
                                title={
                                    <select defaultValue={index} value={index} onChange={e => swapImageHandle(e, index)} onFocus={e => setPrevious(e.target.value)}>
                                        {selectOptions.map((option) => <option value={option.value}>{option.label}</option>)}
                                    </select>
                                }
                                extra={<Button type="link" danger><DeleteOutlined /></Button>}>
                                <Image src={chapter.images[number]} />
                                <Typography.Text>{imageName}</Typography.Text>
                            </Card>
                        </Col>
                    }) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} />} />}
                </Row>
            </Col>
        </Row>

    </div >;
}

export default TestUploadChapter;