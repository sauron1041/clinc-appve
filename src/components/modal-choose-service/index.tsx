import React from 'react';
import {IService} from '../../models/service';
// import {addAppointment} from '../../api/appointment';
// import {IAppointmentRequest} from '../../api/appointment/interface';
// import {addHours, format} from 'date-fns';
// import TextArea from '../text-aria';
// import {faRotate} from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import GoiDau from '../../assets/images/goi-dau-duong-sinh.png';
// import {isEqual} from 'date-fns';

interface IModalChooseServiceProps {
  isShow: boolean;
  service: IService;
  onClose: () => void;
  //   onHandleChoose: () => void;
}

const ModalChooseService: React.FC<IModalChooseServiceProps> = ({}) => {
  //   const heigth = window.innerHeight;
  //   const width = window.innerWidth;
  // const [time, setTime] = useState<Date>(new Date('2000-01-01 00:00'));
  // const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // const [note, setNote] = useState<string>();

  // useEffect(() => {
  //   setIsDisabled(isEqual(time, new Date('2000-01-01 00:00')));
  // }, [time]);

  // const handleChooseService = async () => {
  //   const dateWithTimezone = addHours(time ? time : new Date(), 0);
  //   const timeConvertUTC = format(dateWithTimezone, "yyyy-MM-dd'T'HH:mm:ss");
  //   const data: IAppointmentRequest = {
  //     time: timeConvertUTC,
  //     customer_id: 10,
  //     service_id: service.id,
  //     note: 'Tao ddang tesst nữa nè',
  //     branch_id: 1,
  //   };

  //   console.log('note: ', note);

  //   const res = await addAppointment(data);

  //   console.log('res: ', res);
  // };

  // if (!isShow) return null;

  return (
    <></>
    // <div
    //   className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40 shadow-lg"
    //   onClick={onClose}
    // >
    //   <div
    //     className="bg-white p-5 rounded-xl w-[65%] h-[70%] relative overflow-auto"
    //     onClick={(e) => e.stopPropagation()}
    //   >
    //     <button className="absolute top-2 right-2 p-3" onClick={onClose}>
    //       <FontAwesomeIcon icon={faRotate} size="xl" />
    //     </button>

    //     <div className="flex bg-red-400">
    //       <div>
    //         <p className="text-center text-lg font-semibold">{service.name}</p>
    //         <p>Bạn có thể đặt lịch theo các tùy chọn bên dưới của chúng tôi!</p>
    //       </div>
    //       <div className="flex w-[50%] bg-blue-200 items-center justify-center">
    //         <img src={GoiDau} className="w-[90%] h-[90%]" />
    //       </div>
    //     </div>

    //     <ChooseDateTime nowDate={new Date()} onChooseTime={setTime} />

    //     <TextArea placeholder="Nhập ghi chú" className="" onChange={(e) => setNote(e.target.value)} />
    //     <button
    //       disabled={isDisabled}
    //       className={`${isDisabled ? 'bg-blue-300' : 'bg-blue-500'}`}
    //       onClick={() => handleChooseService()}
    //     >
    //       Choose
    //     </button>
    //   </div>
    // </div>
  );
};

export default ModalChooseService;
