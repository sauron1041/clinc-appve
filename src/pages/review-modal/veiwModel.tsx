import React, { useState } from 'react';
import { Modal, Rate, Form, Input, Button } from 'antd';

interface ViewFeedbackProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ViewFeedback: React.FC<ViewFeedbackProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  // id, serviceRequestId, content, customerId, employeeId, userId, createdAt, updatedAt, isRemoved, start
  return (
    <Modal
      visible={visible}
      title="Đánh Giá Dịch Vụ"
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className='gap-48'>
          <div className='flex flex-row gap-1'>
            <strong>Dịch vụ: </strong> <p> Dịch vụ </p>
          </div>
          <div className='flex flex-row gap-1'>
            <strong>Nhân viên: </strong> <p> Nhân viên 1</p>
          </div>
        </div>
        <div className='flex flex-row gap-1 items-center h-6'>
          <strong className='h-[100%]'>Chọn số sao: </strong>
          <div className='h-[100%]'>
            <Form.Item name="star" rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}>
              <Rate />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="content" label="Nội dung">
          <Input.TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
        </Form.Item>
        <Form.Item className='flex flex-row-reverse' >
          <Button type="primary" htmlType="submit">Gửi đánh giá</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewFeedback;