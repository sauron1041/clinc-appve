import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from '../../components/header';
import MenuBar from '../../components/menu-bar';
import {ServiceCard} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {IService} from '../../models/service';
import Footer from '../../components/footer';
import {setToastNotify} from '../../redux/slices/toastNotifySlice';

const OtherService: React.FC = () => {
  const location = useLocation();
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataOtherServices = useSelector((state: any) => state.otherService.otherService);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [location]);

  return (
    <div className={`flex w-full flex-col`}>
      <Header />
      <MenuBar />
      {(dataOtherServices ?? []).map((service: IService) => (
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

      {/* <LoadingOverlay isLoading={isLoading} /> */}
      {/* <ModalChooseService
        isShow={isModalChooseService.isShow}
        onClose={() => setIsModalChooseService((pre) => ({...pre, isShow: false}))}
        service={isModalChooseService.service}
      /> */}

      <Footer />
    </div>
  );
};

export default OtherService;
//