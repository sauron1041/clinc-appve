import React, { useEffect, useState } from 'react';
import { Modal, Rate, Form, Input, Button } from 'antd';

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  data?: any | null;
  dataAvailable: any | undefined
}

const ReviewModal: React.FC<ReviewModalProps> = ({ visible, onClose, onSubmit, data, dataAvailable }) => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState<any>({
    star: 0,
    content: '',
    serviceName: '',
    employeeName: '',
  });

  console.log("da1ta", dataAvailable);


  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    setFeedback({
      star: data?.serviceRequest?.feedback?.star,
      content: data?.serviceRequest?.feedback?.content,
      serviceName: data?.service?.name,
      employeeName: data?.employee?.name,
    })
  }, [data?.serviceRequest?.feedback?.star, data?.serviceRequest?.feedback?.content])
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
            <strong>Dịch vụ: </strong> <p> {data?.service?.name && data.service.name || dataAvailable?.service?.name}</p>

          </div>
          <div className='flex flex-row gap-1'>
            {data?.employee?.name ? <>< strong > Nhân viên: </strong> <p> {data?.employee?.name && data.employee.name || dataAvailable?.employee?.name}</p> </> : <></>}
          </div>
        </div>
        <div className='flex flex-row gap-1 items-center h-6'>
          {feedback.star > 0 ?
            <div className='flex flex-row gap-1'>
              <strong>Đánh giá: </strong>
              <Rate defaultValue={feedback.star} disabled />
            </div>
            :
            <div className='h-[24px] flex flex-row gap-2 justify-center items-center'>
              <strong className='h-[100%]'>Chọn số sao: </strong>
              <div className='h-[110%]'>
                <Form.Item name="star" rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}>
                  <Rate />
                </Form.Item>
              </div>
            </div>
          }
        </div>
        {feedback.star > 0 ?
          <div className='flex flex-row gap-1'>
            <strong>Nội dung: </strong> <p>{feedback?.content}</p>
          </div>
          :
          <Form.Item name="content" label="Nội dung" >
            <Input.TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
          </Form.Item>
        }
        <Form.Item className='flex flex-row-reverse' >
          {feedback.star > 0 ? <></> : <Button type="primary" htmlType="submit">Gửi đánh giá</Button>}
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default ReviewModal;