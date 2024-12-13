import React, {useEffect, useState} from 'react';
import {TextInput} from '..';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faEnvelope, faMagnifyingGlass, faPhone, faXmark} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Cookies from 'js-cookie';
import {logout} from '../../api/auth';
import {setUserInfo} from '../../redux/slices/userInfoSlice';
import {clearToastNotify, setToastNotify} from '../../redux/slices/toastNotifySlice';
import Logo from '../../assets/images/LOGOMAIN.png';

interface IHeaderProps {
  onOpenLogin?: () => void;
}

const Header: React.FC<IHeaderProps> = ({onOpenLogin}) => {
  const {t} = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const user = useSelector((state: any) => state.user.userInfo);
  const height = window.innerHeight;
  const navigate = useNavigate();
  const refreshToken = Cookies.get('refreshToken');
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const opacity = Math.max(0, 1 - scrollY / 100);

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (refreshToken) {
      const res = await logout(refreshToken);
      if (res?.statusCode === 200) {
        dispatch(setToastNotify({message: 'Đăng xuất thành công!', type: 'success', duration: 2000}));
        dispatch(setUserInfo(null));
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        navigate('/');
      } else {
        console.log('Error logout!');
      }
    } else {
      dispatch(setUserInfo(null));
      console.log('Dont have refreshToken!');
    }
  };

  return (
    <div
      className={`flex w-full justify-around items-center transition-opacity duration-300 py-10 border-b-2 border-blue-600 sm:border-none`}
      style={{
        height: height * 0.12,
        background: 'linear-gradient(to right, #fdf2f8, #f9fafb, #f5f3ff, #f8fafc)',
        opacity,
      }}
    >
      <button
        className="sm:hidden ml-2 px-2.5 py-1.5 border border-black rounded-lg text-black"
        onClick={() => console.log('click menu')}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <button
        onClick={() => {
          dispatch(clearToastNotify());
          navigate('/');
        }}
      >
        <img src={Logo} alt="Logo" className="w-60" />
      </button>

      <TextInput
        type="text"
        placeholder="Vui lòng nhập"
        className="w-[30%] min-w-24 h-10"
        prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        suffix={<FontAwesomeIcon icon={faXmark} />}
      />

      <div className="sm:flex flex-col hidden">
        <span className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="opacity-70 text-base" />
          <span className="ml-2 text-base">(+84) 123456789</span>
        </span>
        <span className="flex justify-center items-center">
          <FontAwesomeIcon icon={faEnvelope} className="opacity-70 text-base" />
          <span className="ml-2 text-base">example@gmail.com</span>
        </span>
      </div>

      <div className="sm:block relative hidden group">
        <div className="bg-blue-400 rounded-full w-[45px] h-[45px]"></div>
        <div className="group-hover:block group-hover:scale-100 right-0 z-30 absolute space-y-2 hidden bg-white shadow py-2 rounded-md transform transition-all duration-300 ease-in-out scale-95">
          <ul>
            {isAuthenticated ? (
              <>
                <Link className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap" to="/profile">
                  {t('user_profile')}
                </Link>
                <Link className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap" to="/booking-history">
                  {t('user_booking_history')}
                </Link>

                <div
                  className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap cursor-pointer"
                  onClick={(e) => handleLogout(e)}
                >
                  {t('user_logout')}
                </div>
              </>
            ) : (
              <li className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap" onClick={onOpenLogin}>
                {t('user_login')}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
