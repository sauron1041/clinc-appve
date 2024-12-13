import React, { useEffect, useState } from 'react';
// import {useTranslation} from 'react-i18next';
import { LoadingOverlay } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header';
import MenuBar from '../../components/menu-bar';
import ModalLogin from '../../components/modal-login';
import Footer from '../../components/footer';
import ChooseDateTime from '../../components/choose-date-time';
import TextArea from '../../components/text-aria';
import { addHours, format, isEqual } from 'date-fns';
import { IAppointmentRequest } from '../../api/appointment/interface';
import { addAppointment } from '../../api/appointment';
import { ELocation } from '../../components/modal-login/enumLocation';
import { setToastNotify } from '../../redux/slices/toastNotifySlice';
import { ToastContainer } from 'react-toastify';
import ToastNotification from '../../components/toast-notify';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/loading-spinner';
// const BACKEND_URL = process.env.BACKEND_URL;

const Booking: React.FunctionComponent = () => {
  // const {t} = useTranslation();
  const isLoading = useSelector((state: any) => state.loading);
  const [isLogin, setIsLogin] = useState(false);
  const dataAllServices = useSelector((state: any) => state.allServices.allServices);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedTime, setSelectedTime] = useState<Date>(new Date('2000-01-01 00:00'));
  const [note, setNote] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const user = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isShowModalChooseTime, setIsShowModalChooseTime] = useState(false);
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location?.state?.service?.id) {
      setSelectedServiceId(location.state.service.id);
    }
  }, [location?.state?.service?.id]);

  useEffect(() => {
    if (selectedServiceId !== '' && isEqual(selectedTime, new Date('2000-01-01 00:00')) == false) {
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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceId(event.target.value);
  };

  const handleChooseService = async () => {
    const dateWithTimezone = addHours(selectedTime ? selectedTime : new Date(), 0);
    const timeConvertUTC = format(dateWithTimezone, "yyyy-MM-dd'T'HH:mm:ss");
    const data: IAppointmentRequest | any = {
      time: timeConvertUTC,
      customer_id: 1,
      service_id: Number(selectedServiceId),
      note: note,
      branch_id: 1,
    };

    setIsLoadingAppointment(true);

    const res = await addAppointment(data);
    if (res?.statusCode === 200) {
      setSelectedServiceId('');
      setSelectedTime(new Date('2000-01-01 00:00'));
      setNote('');
      dispatch(setToastNotify({ message: 'Đặt lịch thành công!', type: 'success', duration: 2000 }));
      setIsLoadingAppointment(false);
    } else {
      dispatch(setToastNotify({ message: 'Đặt lịch thất bại!', type: 'error', duration: 2000 }));
    }
  };

  const handleChooseDateTime = () => {
    setIsShowModalChooseTime((prev) => !prev);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header onOpenLogin={() => setIsLogin((prev) => !prev)} />

      <MenuBar />

      <div className="text-black py-16 flex flex-col text-center">
        <p className="font-bold ">TRANG ĐẶT LỊCH TƯ VẤN</p>
        <p className="">
          Với mong muốn nâng cao trải nghiệm dịch vụ. Quý khách đặt lịch có thể đến checkin trong vòng 5 phút.
        </p>
      </div>

      <div className="flex-grow flex justify-center pb-20">
        <div className="w-[85%] bg-[#432269] p-3 shadow-2xl items-center flex flex-col rounded-xl ">
          <div className="pt-3">
            <p className="text-center text-white text-lg font-semibold">Gói dịch vụ</p>
            <p className=" text-white">Bạn có thể đặt lịch theo các tùy chọn bên dưới của chúng tôi!</p>
          </div>
          <div className="h-[1px] bg-white w-full my-4" />
          <div className=" flex w-full ">
            <div className="w-[60%]">
              <div className=" flex w-full">
                {/* chọn dịch vụ */}
                <div className="flex flex-col w-[50%]">
                  <label className="flex-1 pb-2 flex font-semibold text-white">Dịch vụ cần tư vấn</label>
                  <select className="h-9 rounded-xl pl-2 w-[90%]" value={selectedServiceId} onChange={handleChange}>
                    <option value=""> --Chọn một dịch vụ--</option>
                    {dataAllServices.map((item: any, index: number) => (
                      <option key={index} value={item.id}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CHỌN NGÀY */}
                <div className="flex w-[50%] flex-col relative">
                  <label className="flex-1 flex pb-2 font-semibold text-white">Chọn ngày giờ</label>
                  <div
                    className="flex items-center h-9 rounded-xl bg-white pl-2 w-[90%]"
                    onClick={() => handleChooseDateTime()}
                  >
                    {isEqual(selectedTime, new Date('2000-01-01 00:00'))
                      ? 'Chọn thời gian'
                      : format(selectedTime, 'dd/MM/yyyy HH:mm')}
                  </div>
                  {isShowModalChooseTime && (
                    <ChooseDateTime
                      onClose={handleChooseDateTime}
                      nowDate={new Date()}
                      onChooseTime={setSelectedTime}
                    />
                  )}
                </div>
              </div>

              <div className="flex w-full mt-10">
                <div className="w-1/2">
                  <label className="flex-1 flex pb-2 font-semibold text-white">Chọn chi nhánh</label>
                  <select
                    className="flex    h-9 rounded-xl pl-2 w-[90%]"
                  // value={selectedServiceId}
                  // onChange={handleChange}
                  >
                    <option value="">--Chọn một chi nhánh--</option>
                    <option value="">Chi nhánh 1</option>
                    <option value="">Chi nhánh 2</option>
                    <option value="">Chi nhánh 3</option>
                  </select>
                </div>

                <div className="flex w-1/2 flex-col">
                  <label className="flex-1 flex font-semibold pb-2 text-white">Ghi chú của bạn</label>
                  <TextArea
                    value={note ?? ''}
                    placeholder="Nhập ghi chú"
                    className="w-[90%] h-[100px] rounded-xl pl-2 border focus:outline-none focus:border-transparent resize-none"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-14 flex justify-center">
                <button
                  disabled={isDisabled}
                  className={`${isDisabled ? 'bg-[#FFD700] opacity-50' : 'bg-[#FFD700]'
                    } px-10 py-2 rounded-lg text-black text-lg font-normal`}
                  onClick={() => handleChooseService()}
                >
                  {isLoadingAppointment ? <LoadingSpinner size={30} /> : 'Đặt lịch'}
                </button>
              </div>
            </div>
            <div className="w-[40%] items-center justify-center flex">
              <img src="https://via.placeholder.com/150" className="w-[90%] h-[90%]" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
      <ToastNotification />

      <LoadingOverlay isLoading={isLoading.loading} />
      <ModalLogin location={ELocation.Profile} isOpen={isLogin} onClose={() => setIsLogin((prev) => !prev)} />
    </div>
  );
};

export default Booking;
