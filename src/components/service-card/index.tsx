import React from 'react';
import {IService} from '../../models/service';
import {useTranslation} from 'react-i18next';
import GoiDau from '../../assets/images/goi-dau-duong-sinh.png';
import {faAnglesDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface IServiceCardProps {
  service: IService;
  clickHandler?: () => void;
}

const ServiceCard: React.FC<IServiceCardProps> = ({service, clickHandler}) => {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col w-full bg-white mt-5 rounded-xl p-3">
      <p className="text-lg font-semibold px-4 py-2 text-center">{service.name}</p>
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex sm:w-[40%] w-full items-center justify-center">
          <img src={GoiDau} alt={service.name} className="rounded-xl w-[90%] h-[90%] shadow-xl " />
        </div>
        <div className="flex flex-col sm:w-[60%] w-full mt-4 items-center">
          <p className="text-lg font-normal px-3 pt-3">{service.description}</p>
          <button className="text-blue-500 px-2 py-0.5 m-2">
            <FontAwesomeIcon icon={faAnglesDown} />
            xem thêm
          </button>
          <button className="bg-blue-500 shadow-md text-white px-5 py-2.5 rounded-xl" onClick={clickHandler}>
            {t('service_choose')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
