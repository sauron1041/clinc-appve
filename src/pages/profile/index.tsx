import React, {useEffect, useState} from 'react';
import Header from '../../components/header';
import MenuBar from '../../components/menu-bar';
// import {useTranslation} from 'react-i18next';
import {LoadingOverlay} from '../../components/index';
import {useSelector} from 'react-redux';
import ModalLogin from '../../components/modal-login';
import Footer from '../../components/footer';
import {ELocation} from '../../components/modal-login/enumLocation';
// const API_URL = import.meta.env.VITE_API_URL;

const Profile: React.FunctionComponent = () => {
  // const {t} = useTranslation();
  const isLoading = useSelector((state: any) => state.loading);
  const user = useSelector((state: any) => state.user.userInfo);
  const [isLogin, setIsLogin] = useState(false);

  console.log('user', user);

  useEffect(() => {
    if (!user) {
      setIsLogin(true);
    }
  }, [user]);

  return (
    <div className={`flex w-full flex-col min-h-screen`}>
      <Header onOpenLogin={() => setIsLogin((prev) => !prev)} />

      <MenuBar />

      <div className="flex-grow">
        <div className="w-full flex ">
          <div className="w-[30%] bg-blue-300">{user?.username}</div>
          <div className="w-[70%] bg-red-300">ta là beent phải</div>
        </div>
      </div>

      <div className="text-white px-10">Version Release_20240919_01 Dev</div>

      <Footer />

      <LoadingOverlay isLoading={isLoading.loading} />
      <ModalLogin location={ELocation.Profile} isOpen={isLogin} onClose={() => setIsLogin((prev) => !prev)} />
    </div>
  );
};

export default Profile;
