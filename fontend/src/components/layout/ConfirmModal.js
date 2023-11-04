import { Modal } from 'antd';
import React from 'react';

const ConfirmModal = ({
  isModalOpen = false,
  handleOk = () => {},
  handleCancel = () => {},
}) => {
  return (
    <Modal
      title="Xác nhận chuyển trang đăng nhập"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p style={{ padding: 0, margin: 0 }}>Hành động này cần phải đăng nhập.</p>
      <p style={{ padding: 0, margin: 0 }}>
        Bạn có muốn chuyển đến trang đăng nhập không?
      </p>
    </Modal>
  );
};

export default ConfirmModal;
