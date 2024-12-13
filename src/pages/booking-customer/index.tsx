// import React, { useState } from "react";
// import { DatePicker, TimePicker, Select, Button, Form, Input } from "antd";
// import viVN from 'antd/es/date-picker/locale/vi_VN';
// import dayjs from "dayjs";
// import "dayjs/locale/vi";

// const { Option } = Select;

// const BookingPage: React.FC = () => {
//   const [form] = Form.useForm();
//   const [selectedTime, setSelectedTime] = useState<string>("");

//   const timeSlots = Array.from({ length: 22 }, (_, i) => {
//     const hour = 9 + Math.floor(i / 2);
//     const minutes = i % 2 === 0 ? "00" : "30";
//     return `${hour}:${minutes}`;
//   });

//   const handleFinish = (values: any) => {
//     console.log("Dữ liệu đặt lịch: ", values);
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 p-5 min-h-screen">
//       <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
//         <h1 className="mb-6 font-bold text-2xl text-center">Đặt Lịch Hẹn</h1>
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFinish}
//           className="space-y-4"
//         >
//           <Form.Item
//             label="Dịch vụ cần tư vấn"
//             name="service"
//             rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
//           >
//             <Select placeholder="Chọn dịch vụ">
//               <Option value="service1">Dịch vụ 1</Option>
//               <Option value="service2">Dịch vụ 2</Option>
//               <Option value="service3">Dịch vụ 3</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Ngày hẹn"
//             name="date"
//             rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
//           >
//             <DatePicker
//               locale={viVN}
//               className="w-full"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Khung giờ"
//             name="time"
//             rules={[{ required: true, message: "Vui lòng chọn khung giờ!" }]}
//           >
//             <Select
//               placeholder="Chọn giờ"
//               onChange={(value) => setSelectedTime(value)}
//             >
//               {timeSlots.map((slot, index) => (
//                 <Option key={index} value={slot}>
//                   {slot}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Chi nhánh"
//             name="branch"
//             rules={[{ required: true, message: "Vui lòng chọn chi nhánh!" }]}
//           >
//             <Select placeholder="Chọn chi nhánh">
//               <Option value="branch1">Chi nhánh 1</Option>
//               <Option value="branch2">Chi nhánh 2</Option>
//               <Option value="branch3">Chi nhánh 3</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item label="Ghi chú" name="note">
//             <Input.TextArea placeholder="Nhập ghi chú (nếu có)" />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="bg-[#31a4dd] hover:bg-[#93c7e1] w-full text-white"
//             >
//               Đặt lịch
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;


import React, { useEffect, useState } from "react";
import { DatePicker, Select, Button, Form, Input, Modal } from "antd";
import viVN from 'antd/es/date-picker/locale/vi_VN';
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useDispatch, useSelector } from 'react-redux';
import { addHours, format, isEqual } from 'date-fns';
import { addAppointment } from '../../api/appointment';
import { setToastNotify } from '../../redux/slices/toastNotifySlice';
import { ToastContainer } from 'react-toastify';
import ToastNotification from '../../components/toast-notify';
import LoadingSpinner from '../../components/loading-spinner';
import ModalLogin from '../../components/modal-login';
import { ELocation } from '../../components/modal-login/enumLocation';
import { useLocation } from 'react-router-dom';
import { getServicesAll } from "../../api/services";
import { useToast } from "../../context/ToastProvider";


const { Option } = Select;
const { TextArea } = Input;

const BookingPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  var isLoading = useSelector((state: any) => state.loading)

  var dataAllServices = useSelector((state: any) => state.allServices.allServices);
  // const user = useSelector((state: any) => state.user.userInfo);
  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;

  const [form] = Form.useForm();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<Date>(new Date('2000-01-01 00:00'));
  const [note, setNote] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isShowModalChooseTime, setIsShowModalChooseTime] = useState<boolean>(false);
  const [isLoadingAppointment, setIsLoadingAppointment] = useState<boolean>(false);
  const [isLoginCheck, setIsLoginCheck] = useState<boolean>(false);
  const toast = useToast()


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location?.state?.serviceId) {
      setSelectedServiceId(location.state.serviceId);
      form.setFieldsValue({ service: location.state.serviceId });
    }
  }, [location?.state?.service?.id, form]);
  useEffect(() => {
    if (location?.state?.service?.id) {
      setSelectedServiceId(location.state.service.id);
    } else {
      // fetch all services
      const getAllService = getServicesAll()
      getAllService.then((res) => {
        if (res?.statusCode == 200) {
          // dispatch(setAllServices(res.data));
          dataAllServices = res.data;
          console.log("DATA", dataAllServices);
          setIsLoadingAppointment(false);
        } else {
          dispatch(setToastNotify({ message: 'Lấy dữ liệu dịch vụ thất bại!', type: 'error', duration: 2000 }));
        }
        setIsLoadingAppointment(false);
      })
    }
  }, []);

  useEffect(() => {
    if (selectedServiceId !== '' && !isEqual(selectedTime, new Date('2000-01-01 00:00'))) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selectedTime, selectedServiceId]);

  useEffect(() => {
    if (!user) {
      setIsLogin(true);
    }
  }, [user]);


  const handleChooseService = async (values: any) => {
    const currentTime = dayjs();
    const selectedDate = dayjs(selectedTime).startOf('day');
    const selectedDateTime = dayjs(selectedTime);
  
    // Kiểm tra nếu ngày được chọn là ngày hiện tại
    if (selectedDate.isSame(currentTime.startOf('day'))) {
      const diffHours = selectedDateTime.diff(currentTime, 'hours');
      const latestTime = dayjs().hour(19).minute(30); // 19:30 trong ngày hiện tại
  
      // Kiểm tra nếu cách hiện tại ít hơn 4 giờ hoặc sau 19:30
      if (diffHours < 4) {
        toast.error('Thời gian đặt lịch phải cách hiện tại ít nhất 4 giờ!');
        return;
      }
      if (selectedDateTime.isAfter(latestTime)) {
        toast.error('Thời gian đặt lịch trong ngày không được muộn hơn 19:30!');
        return;
      }
    }
  
    const dateWithTimezone = addHours(selectedTime ? selectedTime : new Date(), 0);
    const timeConvertUTC = format(dateWithTimezone, "yyyy-MM-dd'T'HH:mm:ss");
    const data: any = {
      time: timeConvertUTC,
      customerId: user?.id || 1,
      serviceId: Number(selectedServiceId),
      note: note,
      branchId: values.branchId || 1,
    };
  
    try {
      const res = await addAppointment(data);
      if (res?.statusCode === 200) {
        toast.success('Đặt lịch thành công');
        form.resetFields();
        setSelectedServiceId('');
        setSelectedTime(new Date('2000-01-01 00:00'));
        setNote('');
      } else {
        toast.error('Đặt lịch thất bại!');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi!');
    } finally {
      setIsLoadingAppointment(false);
    }
  };

  
  // const handleChooseService = async (values: any) => {
  //   const currentTime = dayjs();
  //   const selectedDateTime = dayjs(selectedTime);

  //   // Kiểm tra nếu thời gian cách hiện tại ít hơn 4 giờ
  //   if (selectedDateTime.diff(currentTime, 'hours') < 4) {
  //     toast.error('Thời gian đặt lịch phải cách hiện tại ít nhất 4 giờ!');
  //     return;
  //   }

  //   const dateWithTimezone = addHours(selectedTime ? selectedTime : new Date(), 0);
  //   const timeConvertUTC = format(dateWithTimezone, "yyyy-MM-dd'T'HH:mm:ss");
  //   const data: any = {
  //     time: timeConvertUTC,
  //     customerId: user?.id || 1,
  //     serviceId: Number(selectedServiceId),
  //     note: note,
  //     branchId: values.branchId || 1,
  //   };

  //   try {
  //     const res = await addAppointment(data);
  //     if (res?.statusCode === 200) {
  //       toast.success('Đặt lịch thành công');
  //       form.resetFields();
  //       setSelectedServiceId('');
  //       setSelectedTime(new Date('2000-01-01 00:00'));
  //       setNote('');
  //     } else {
  //       toast.error('Đặt lịch thất bại!');
  //     }
  //   } catch (error) {
  //     toast.error('Đã xảy ra lỗi!');
  //   } finally {
  //     setIsLoadingAppointment(false);
  //   }
  // };

  // const handleChooseService = async (values: any) => {
  //   const dateWithTimezone = addHours(selectedTime ? selectedTime : new Date(), 0);
  //   const timeConvertUTC = format(dateWithTimezone, "yyyy-MM-dd'T'HH:mm:ss");
  //   const data: any = {
  //     time: timeConvertUTC,
  //     customerId: user?.id || 1,
  //     // customerId: user?.id || 1, fix tam
  //     serviceId: Number(selectedServiceId),
  //     note: note,
  //     branchId: values.branchId || 1,
  //   };

  //   // setIsLoadingAppointment(true);

  //   try {
  //     console.log("DATA", data);

  //     const res = await addAppointment(data);
  //     console.log("RES", res);

  //     if (res?.statusCode === 200) {
  //       toast.success('Đặt lịch thành công');
  //       form.resetFields();
  //       setSelectedServiceId('');
  //       setSelectedTime(new Date('2000-01-01 00:00'));
  //       setNote('');
  //       dispatch(setToastNotify({ message: 'Đặt lịch thành công!', type: 'success', duration: 2000 }));
  //     } else {
  //       dispatch(setToastNotify({ message: 'Đặt lịch thất bại!', type: 'error', duration: 2000 }));
  //     }
  //   } catch (error) {
  //     dispatch(setToastNotify({ message: 'Đã xảy ra lỗi!', type: 'error', duration: 2000 }));
  //   } finally {
  //     setIsLoadingAppointment(false);
  //   }
  // };

  const timeSlots = Array.from({ length: 22 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minutes}`;
  });
  console.log("isLoading", isLoading);

  if (isLoading == true) return <LoadingSpinner size={50} />


  return (
    <div className="flex flex-col items-center bg-gray-100 p-5 min-h-screen">
      {/* Header và MenuBar có thể thêm vào nếu cần */}

      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
        <h1 className="mb-6 font-bold text-2xl text-center">Đặt Lịch Hẹn</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleChooseService}
          className="space-y-4"
        >
          <Form.Item
            label="Dịch vụ cần tư vấn"
            name="service"
            rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
          >
            <Select
              placeholder="Chọn dịch vụ"
              value={selectedServiceId}
              onChange={(value) => setSelectedServiceId(value)}
            >
              <Option value="">--Chọn một dịch vụ--</Option>
              {dataAllServices && dataAllServices?.map((item: any, index: number) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item
            label="Ngày hẹn"
            name="date"
            rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          >
            <DatePicker
              locale={viVN}
              className="w-full"
              onChange={(date, dateString) => {
                if (date) {
                  setSelectedTime(date.toDate());
                }
              }}
            />
          </Form.Item> */}
          <Form.Item
            label="Ngày hẹn"
            name="date"
            rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
          >
            <DatePicker
              locale={viVN}
              className="w-full"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              onChange={(date, dateString) => {
                if (date) {
                  setSelectedTime(date.toDate());
                }
              }}
            />
          </Form.Item>


          <Form.Item
            label="Khung giờ"
            name="time"
            rules={[{ required: true, message: "Vui lòng chọn khung giờ!" }]}
          >
            <Select
              placeholder="Chọn giờ"
              onChange={(value) => setSelectedTime(new Date(`2000-01-01T${value}:00`))}
            >
              {timeSlots.map((slot, index) => (
                <Option key={index} value={slot}>
                  {slot}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chi nhánh"
            name="branch_id"
            rules={[{ required: true, message: "Vui lòng chọn chi nhánh!" }]}
          >
            <Select placeholder="Chọn chi nhánh">
              <Option value="1">Chi nhánh 1</Option>
              <Option value="2">Chi nhánh 2</Option>
              <Option value="3">Chi nhánh 3</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <TextArea
              placeholder="Nhập ghi chú (nếu có)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#31a4dd] hover:bg-[#93c7e1] w-full text-white"
              disabled={isDisabled}
            >
              {isLoadingAppointment ? <LoadingSpinner size={30} /> : 'Đặt lịch'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <ToastContainer />
      <ToastNotification />

      {/* Modal đăng nhập */}
      {
        isLogin && (
          <ModalLogin
            location={ELocation.Profile}
            isOpen={isLogin}
            onClose={() => setIsLogin(false)}
          />
        )
      }
    </div>
  );
};

export default BookingPage;
