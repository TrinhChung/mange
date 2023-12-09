import { Avatar, Col, Modal, Row } from 'antd';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../providers/authProvider';
import './AvatarArea.scss';
import { updateAvatar } from '../../services/User';
import { toast } from 'react-toastify';
import { formatAvatarURL } from '../../utils/commonFunc';

const AvatarArea = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  console.log(authUser);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChangeAvatar = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('avatar', image)

      try {
        const data = await updateAvatar(formData);
        if (data.status === 200 && data.success == 1) {
          toast.success(data?.message, 2);

          localStorage.setItem('authUser', JSON.stringify(data?.data));
          setAuthUser(data?.data);
        } else {
          toast.error('Cập nhật ảnh đại diện thất bại', 2);
        }
      } catch (error) {
        console.log(error);
        toast.error('Cập nhật ảnh đại diện thất bại', 2);
      }
    }

    setIsOpenModal(false);
    handleDeleteImage();
  };

  return (
    <Row
      className="box-content"
      style={{ justifyContent: 'center', marginRight: 10 }}
    >
      <Col>
        <Row style={{ color: 'var(--gray)', justifyContent: 'center' }}>
          <Avatar src={formatAvatarURL(authUser?.avatar)} size={180} />
        </Row>
        <Row
          style={{
            color: 'var(--gray)',
            justifyContent: 'center',
            marginTop: 12,
          }}
        >
          <Col
            className="button-view bg-color-jade"
            onClick={() => setIsOpenModal(true)}
          >
            Upload Ảnh
          </Col>
        </Row>
        <Row
          style={{
            color: 'var(--gray)',
            marginBottom: 20,
            marginTop: 28,
            justifyContent: 'center',
          }}
          className="title-children"
        >
          <Col style={{ fontSize: 32 }}>{authUser?.username}</Col>
        </Row>

        <Row
          style={{ color: 'var(--gray)', justifyContent: 'center' }}
          className="title-children"
        >
          <Col style={{ fontSize: 16 }} className="color-main">
            {authUser && authUser.role === 'user' ? 'ĐỘC GIẢ' : 'ADMIN'}
          </Col>
        </Row>
      </Col>

      <Modal
        title="Thay đổi ảnh đại diện"
        open={isOpenModal}
        centered={true}
        onOk={() => {
          onChangeAvatar();
        }}
        onCancel={() => {
          setIsOpenModal(false);
          handleDeleteImage();
        }}
      >
        <div className="modal-container">
          <div className="preview-image">
            <img
              src={image ? previewUrl : formatAvatarURL(authUser?.avatar)}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <Col
            className="button-view bg-color-jade"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            Chọn ảnh
          </Col>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </Modal>
    </Row>
  );
};

export default AvatarArea;
