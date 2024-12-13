import  { useEffect, useState } from 'react';
import { Card, Tag, Space, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './index.css'
import {  appointmentGetHistoryWithFeedback } from '../../api/appointment';
import { Loading } from '../../components/loading';
import ReviewModal from '../review-modal';
import { addFeeback } from '../../api/feedback';
import { toast } from 'react-toastify';







const BookingHistory = () => {
  const [booingHistory, setBookingHistory] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [viewDataFeedback, setViewDataFeedback] = useState<any | null>(null);

  const [dataPayload, setDataPayload] = useState<any | null>(null);

  useEffect(() => {
    appointmentGetHistoryWithFeedback({}).then((res) => {
      if (res?.statusCode == 200) {
        setBookingHistory(res?.data)
      }
      setIsLoading(false)
    })
  }, [selectedBooking])

  const handleViewFeedback = (booking: any) => {
    console.log("booking", booking);
    // Mở modal hiển thị thông tin đánh giá
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleFeedback = (booking: any) => {
    console.log("booking", booking);
    // Mở modal hiển thị thông tin đánh giá
    setSelectedBooking(booking);
    setDataPayload(booking);
    setModalVisible(true);
  };


  const handleCloseModal = () => {
    setViewDataFeedback(null);
    setModalVisible(false);
    setSelectedBooking(null);
  };

  const handleSubmitReview = (reviewData: any) => {

    console.log('Đánh giá:', { ...selectedBooking, ...reviewData });
    const payload: any = {
      serviceRequestId: dataPayload?.serviceRequest?.id,
      content: reviewData?.content,
      star: reviewData?.star,
      customerId: dataPayload?.customer?.id,
      employeeId: dataPayload?.employee?.id,
      userId: dataPayload?.employee?.userId,
      serviceRequest: dataPayload?.serviceRequest,
      status: dataPayload?.status
    }

    addFeeback(payload).then((res) => {
      console.log("payload", payload);

      if (res?.statusCode == 200) {
        toast.success('Gửi đánh giá thành công');
        handleCloseModal();
      } else if (res?.statusCode == 400) {
        toast.error((res as any)?.message);
      }
    })
  };
  const columns = [
    {
      title: 'Ngày giờ',
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => {
        return new Date(text).toLocaleDateString() + ' ' + new Date(text).toLocaleTimeString();
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        let color = '';
        let icon = null;
        if (status == 1) {
          color = 'green';
          icon = <CheckCircleOutlined />;
        } else if (status == 2) {
          color = 'red';
          icon = <CloseCircleOutlined />;
        } else if (status == 0) {
          color = 'orange';
          icon = <ClockCircleOutlined />;
        }
        return (
          <Tag color={color} icon={icon}>
            {status == 1 ? 'Đã xác nhận' : status == 0 ? 'Chưa xác nhận' : "Đã hủy"}
          </Tag>
        );
      },
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (services: string) => (
        <Space size="middle">
          {services}
        </Space>
      ),
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branchName',
      key: 'branchName',
      render: (branch: string) => branch,
    },
    {
      title: 'Đánh giá',
      key: 'feedback',
      render: (record: any) => (
        record.serviceRequest?.feedback ? (
          <button
            onClick={() => handleViewFeedback(record)}
            className="text-blue-600"
          >
            {record.serviceRequest?.feedback?.star} sao
          </button>
        ) : null
      ),
    }
  ];

  if (isLoading) {
    return <Loading />
  }

  // return (
  //   <Card className="card-booking-history">
  //     <h2>Lịch sử đặt lịch</h2>
  //     <div className="desktop-view">
  //       <Table columns={columns as any} dataSource={booingHistory} rowKey="key" />
  //     </div>
  //     <div className="mobile-view">
  //       {booingHistory?.map((item: any) => (
  //         <div key={item.key} className="booking-item"
  //           onClick={() => handleOpenModal(item)}>
  //           <div className="flex">
  //             <div className="w-1/2 font-bold">Ngày giờ:</div>
  //             <div className="w-1/2">{item.time ? new Date(item.time).toLocaleDateString() + ' ' + new Date(item.time).toLocaleTimeString() : ''}</div>
  //           </div>
  //           <div className="flex">
  //             <div className="w-1/2 font-bold">Trạng thái:</div>
  //             <div className="w-1/2">
  //               <Tag
  //                 color={item.status == 1 ? 'green' : item.status == 2 ? 'red' : 'orange'}
  //                 icon={item.status == 1 ? <CheckCircleOutlined /> : item.status == 2 ? <CloseCircleOutlined /> : <ClockCircleOutlined />}
  //               >
  //                 {item.status == 1 ? 'Đã xác nhận' : item.status == 0 ? 'Chưa xác nhận' : "Đã hủy"}
  //               </Tag>
  //             </div>
  //           </div>
  //           <div className="flex">
  //             <div className="w-1/2 font-bold">Chi nhánh:</div>
  //             <div className="w-1/2">{item.branch.name}</div>
  //           </div>
  //           <div className="flex">
  //             <div className="w-1/2 font-bold">Dịch vụ:</div>
  //             <div className="w-1/2">
  //               {/* <div className="w-full"> */}
  //               <div className="w-full">{item.service.name}</div>
  //               {/* <Space size="middle" className="services">
  //                 <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
  //                   {item.serviceName.join(', ')}
  //                 </span>
  //               </Space> */}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <ReviewModal
  //       visible={isModalVisible}
  //       onClose={handleCloseModal}
  //       onSubmit={handleSubmitReview}
  //     />
  //   </Card>

  // );

  return (
    <Card className="card-booking-history">
      <h2>Lịch sử đặt lịch</h2>
      <div className="desktop-view">
        <Table columns={columns as any} dataSource={booingHistory} rowKey="key" />
      </div>
      <div className="mobile-view">
        {booingHistory?.map((item: any) => (
          <div key={item.key} className="booking-item" >
            <div className="flex">
              <div className="w-1/2 font-bold">Ngày giờ:</div>
              <div className="w-1/2">{item.time ? new Date(item.time).toLocaleDateString() + ' ' + new Date(item.time).toLocaleTimeString() : ''}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold">Trạng thái:</div>
              <div className="w-1/2">
                <Tag
                  color={item.status == 1 ? 'green' : item.status == 2 ? 'red' : 'orange'}
                  icon={item.status == 1 ? <CheckCircleOutlined /> : item.status == 2 ? <CloseCircleOutlined /> : <ClockCircleOutlined />}
                >
                  {item.status == 1 ? 'Đã xác nhận' : item.status == 0 ? 'Chưa xác nhận' : "Đã hủy"}
                </Tag>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold">Chi nhánh:</div>
              <div className="w-1/2">{item?.branch?.name}</div>
            </div>
            <div className="flex">
              <div className="w-1/2 font-bold">Dịch vụ:</div>
              <div className="w-1/2">{item?.service?.name}</div>
            </div>
            {item.serviceRequest?.feedback && item.status == 1 && (
              <div className="flex justify-end">
                <button onClick={() => {
                  setViewDataFeedback(item);
                  handleViewFeedback(item.serviceRequest);
                }} className="text-blue-600">Xem đánh giá</button>
              </div>
            )}
            {item?.status && item.status == 1 && item.serviceRequest?.feedback == null && (
              <div className="flex justify-end">
                <button onClick={() => {
                  handleFeedback(item);
                }} className="text-blue-600">Viết đánh giá</button>
              </div>
            ) ||
              // <div></div>
              null
            }
          </div>
        ))}
      </div>
      <ReviewModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        data={viewDataFeedback}
        dataAvailable={selectedBooking}
      />
    </Card>
  );
};

export default BookingHistory;

