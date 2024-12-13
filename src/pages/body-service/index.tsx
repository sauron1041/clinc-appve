import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
// import {getServices} from '../../api/services';
import {ServiceCard} from '../../components';
import {IService} from '../../models/service';
import {ModalChooseService} from '../../components';
import Header from '../../components/header';
import MenuBar from '../../components/menu-bar';
import {useDispatch, useSelector} from 'react-redux';
import {setToastNotify} from '../../redux/slices/toastNotifySlice';
import Footer from '../../components/footer';

interface IModalChooseService {
  isShow: boolean;
  service: IService;
}

const BodyService: React.FC = () => {
  const location = useLocation();
  const dataBodyServices = useSelector((state: any) => state.bodyService.bodyService);
  // const [services, setServices] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalChooseService, setIsModalChooseService] = useState<IModalChooseService>({
    isShow: false,
    service: {} as IService,
  });

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [location]);

  useEffect(() => {
    if (isModalChooseService.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalChooseService.isShow]);

  return (
    <div className={`flex w-full flex-col`}>
      <Header />
      <MenuBar />
      {(dataBodyServices ?? []).map((service: IService) => (
        <div key={service.id} id={service.id.toString()} className="flex self-center w-[85%]">
          <ServiceCard
            service={service}
            clickHandler={() => {
              dispatch(setToastNotify({message: '', type: null, duration: 0}));
              navigate('/booking', {state: {service}});
            }}
          />
        </div>
      ))}

      <Footer />

      {/* <LoadingOverlay isLoading={isLoading} /> */}
      <ModalChooseService
        isShow={isModalChooseService.isShow}
        onClose={() => setIsModalChooseService((pre) => ({...pre, isShow: false}))}
        service={isModalChooseService.service}
      />
    </div>
  );
};

export default BodyService;
