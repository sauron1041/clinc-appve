import React, {useEffect, useState} from 'react';
import Header from '../../components/header';
import MenuBar from '../../components/menu-bar';
import {LoadingOverlay} from '../../components/index';
import {useSelector} from 'react-redux';
import ModalLogin from '../../components/modal-login';
import Footer from '../../components/footer';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotification from '../../components/toast-notify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './index.css';
import banner1 from '../../assets/images/banner/1.jpg';
import banner2 from '../../assets/images/banner/2.jpg';
import banner3 from '../../assets/images/banner/3.png';

const Dashboard: React.FunctionComponent = () => {
  // const {t} = useTranslation();
  const isLoading = useSelector((state: any) => state.loading);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`flex w-full flex-col min-h-screen`}>
      <Header onOpenLogin={() => setIsLogin((prev) => !prev)} />

      <MenuBar />

      <div className="flex-grow">
        {/* slider */}
        <div className="slider-container mt-2">
          <Slider autoplay infinite autoplaySpeed={2000} slidesToScroll={1} speed={500}>
            <div className="rounded-lg">
              <img className="rounded-lg" src={banner1} alt="Slide 1" />
            </div>
            <div className="">
              <img className="rounded-lg " src={banner2} alt="Slide 2" />
            </div>
            <div>
              <img className="rounded-lg" src={banner3} alt="Slide 3" />
            </div>
          </Slider>
        </div>

        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
        <div className="text-white px-10">Version Release_20240919_01 Dev</div>
      </div>

      <div className="text-white px-10">Version Release_20240919_01 Dev</div>

      <Footer />

      <ToastContainer />
      <ToastNotification />
      <LoadingOverlay isLoading={isLoading.loading} />
      <ModalLogin isOpen={isLogin} onClose={() => setIsLogin((prev) => !prev)} />
    </div>
  );
};

export default Dashboard;
