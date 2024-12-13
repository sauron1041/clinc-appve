import React, { useEffect, useState } from 'react';
import { TextInput } from '..';
import Divider from '../divider';
import GoogleLogo from '../../assets/images/GoogleLogo.png';
import { ELocation } from './enumLocation';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../../api/auth';
import Cookies from 'js-cookie';
import LoadingSpinner from '../loading-spinner';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userInfoSlice';
import { setToastNotify } from '../../redux/slices/toastNotifySlice';
import { useToast } from "../../context/ToastProvider";
import socket from '../../socket';


interface IModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  location?: ELocation;
}

const ModalLogin: React.FC<IModalLoginProps> = ({ onClose, isOpen, location = ELocation.Other }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (isLogin) {
      if (phone && password) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    } else {
      if (phone && password && rePassword) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    }
  }, [phone, password, rePassword]);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsFilled(false);
    setIsLoading(true);

    const res = await login({ username: phone, password: password });
    if (res?.statusCode === 200) {
      toast.success('Đăng nhập thành công');

      if (res.data.user.roleId === 3) {
        socket.emit('customer-login', res.data.user.id);
      } else
        if (res.data.user.roleId === 2) {
          console.log('employee-login', res.data.user.id);
          socket.emit('employee-login', res.data.user.id);
        }

      console.log('login success uer: ', res.data);
      dispatch(setUserInfo(res.data.user));
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      Cookies.set('accessToken', res.data.accessToken, { expires: 7, secure: true });
      // Cookies.set('accessToken', res.data.accessToken, { expires: 1 / 24, secure: true });
      Cookies.set('refreshToken', res.data.refreshToken, { expires: 7, secure: true });
      setIsLoading(false);
      setIsFilled(true);
      // dispatch(setToastNotify({message: 'Đăng nhập thành công', type: 'success', duration: 2000}));
      onClose();
    } else if (res?.statusCode === 404 || res?.statusCode === 400) {
      console.log('login failed', res);
      dispatch(setToastNotify({ message: 'Đăng nhập thất bại', type: 'error', duration: 2000 }));
    }

    window.location.reload();
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // const res = await login({username: 'admin', password: 'admin'});
    // Cookies.set('name', 'value')
    console.log('phone', phone);
    console.log('password', password);
    console.log('rePassword', rePassword);
  };

  if (!isOpen) return <></>;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40 shadow-lg"
      onClick={location === ELocation.Other ? onClose : () => navigate('/')}
    >
      <div className="bg-white p-5 rounded-xl w-[28%] min-w-[250px] relative" onClick={(e) => e.stopPropagation()}>
        <div className=" flex flex-col rounded-xl">
          <p className="text-center mt-3 text-2xl font-semibold">{isLogin ? t('user_login') : t('user_register')}</p>
          {isLogin ? (
            <div className="mt-6 w-full flex flex-col items-center">
              <TextInput
                disabled={isLoading}
                value={phone}
                changeText={setPhone}
                placeholder={t('user_phonenumber')}
                className="rounded-lg w-[90%] h-10 mt-4"
              />
              <Divider size={15} />
              <TextInput
                disabled={isLoading}
                value={password}
                changeText={setPassword}
                placeholder={t('user_password')}
                className="rounded-lg w-[90%] h-10"
                type="password"
              />
              <Divider size={5} />
              <div className="flex w-[90%] items-center">
                <input id="rememberme" className="transform ml-1 scale-150" type="checkbox" />
                <label htmlFor="rememberme" className="ml-3 cursor-pointer">
                  {t('user_remember_password')}
                </label>
              </div>

              <div className="flex w-[90%] justify-end text-base opacity-80 cursor-pointer">
                {t('user_forgot_password')}?
              </div>
              <Divider size={5} />
              <button
                disabled={!isFilled}
                className={`flex w-[50%] mt-2 py-2 rounded-xl justify-center`}
                onClick={(e) => handleLogin(e)}
                style={{
                  background: isFilled
                    ? 'linear-gradient(to right, #8b5cf6, #a855f7)'
                    : 'linear-gradient(to right, #ddd6fe, #e9d5ff)',
                }}
              >
                <div className={`text-lg font-semibold  ${isFilled ? 'text-white ' : 'text-black opacity-60'}`}>
                  {isLoading ? <LoadingSpinner size={30} /> : t('user_login')}
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-6 w-full flex flex-col items-center">
              <TextInput
                disabled={isLoading}
                value={phone}
                changeText={setPhone}
                placeholder={t('user_phonenumber')}
                className="rounded-lg w-[90%] h-10 mt-4"
              />
              <Divider size={15} />
              <TextInput
                disabled={isLoading}
                value={password}
                changeText={setPassword}
                placeholder={t('user_password')}
                className="rounded-lg w-[90%] h-10"
                type="password"
              />
              <Divider size={15} />
              <TextInput
                disabled={isLoading}
                value={rePassword}
                changeText={setRePassword}
                placeholder={t('user_repassword')}
                className="rounded-lg w-[90%] h-10"
                type="password"
              />
              <Divider size={10} />

              <button
                disabled={!isFilled}
                className={`flex w-[50%] mt-2 py-2 rounded-xl justify-center`}
                onClick={(e) => handleRegister(e)}
                style={{
                  background: isFilled
                    ? 'linear-gradient(to right, #8b5cf6, #a855f7)'
                    : 'linear-gradient(to right, #ddd6fe, #e9d5ff)',
                }}
              >
                <p className={`text-lg font-semibold  ${isFilled ? 'text-white ' : 'text-black opacity-60'}`}>
                  {t('user_register')}
                </p>
              </button>
            </div>
          )}

          <div className="mt-2 w-full0 flex flex-col items-center mb-3">
            <p className="italic">
              {isLogin ? t('user_dont_have_account') : t('user_have_account')}
              {'? '}
              <span
                className="cursor-pointer text-red-500 underline"
                onClick={() => {
                  setIsLogin((pre) => !pre);
                  setPhone('');
                  setPassword('');
                  setRePassword('');
                }}
              >
                {isLogin ? t('user_register') : t('user_login')}
              </span>
            </p>

            <div className="flex mt-3 flex-col items-center ">
              <p className="p-2">{t('user_login_with')}</p>

              <div className="flex justify-center items-center px-4 py-1 cursor-pointer rounded-xl border border-black">
                <img src={GoogleLogo} height={35} width={35} />
                <p>{t('user_login_with_google')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
