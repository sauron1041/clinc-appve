import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../index';
import flagUSA from '../../assets/images/img_flag_usa.png';
import flagVietnam from '../../assets/images/img_flag_viet_nam.png';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Logo from '../../assets/images/LOGOMAIN.png';

interface ICategory {
  id: number;
  name: string;
}
interface IItemService {
  id: number;
  name: string;
  description: string;
  price: number;
  status: number;
  branchId: number;
  totalSessions: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: ICategory;
}

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = React.useState(JSON.parse(localStorage.getItem('appConfig')!).defaultLanguage);
  const dataBodyServices = useSelector((state: any) => state.bodyService.bodyService);
  const dataFaceServices = useSelector((state: any) => state.faceService.faceService);
  const dataOtherServices = useSelector((state: any) => state.otherService.otherService);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="top-0 z-20 sticky sm:flex justify-center hidden p-3"
      style={{ background: 'linear-gradient(to right, #60a5fa, #1e40af)' }}
    >
      <ul className="flex justify-around items-center space-x-4 w-[80%]">
        <li className="relative group">
          {!isHeaderVisible ? (
            <div className="px-3 rounded-md font-bold text-4xl text-white cursor-pointer" onClick={() => navigate('/')}>
              <img src={Logo} className="w-36" />
            </div>
          ) : (
            <>
              <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white">
                Trang chủ &nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
              <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md w-40 transform transition-all duration-300 ease-in-out scale-95">
                <li>
                  <a href="#home1" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                    Home1
                  </a>
                </li>
                <li>
                  <a href="#home2" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                    Home2
                  </a>
                </li>
                <li>
                  <a href="#home3" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                    Home3
                  </a>
                </li>
              </ul>
            </>
          )}
        </li>

        <li className="relative group">
          <div className="flex hover:bg-gray-700 px-3 py-2 rounded-md text-white">
            <Link to="/face-service">
              Khuôn mặt &nbsp;
              <FontAwesomeIcon icon={faCaretDown} />
            </Link>
          </div>
          <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md transform transition-all duration-300 ease-in-out scale-95">
            {(dataFaceServices ?? []).map((item: IItemService) => (
              <Fragment key={item.id}>
                <Link to={`/face-service#${item.id}`}>
                  <div className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap">{item.name}</div>
                </Link>
              </Fragment>
            ))}
          </ul>
        </li>

        <li className="relative group">
          <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white">
            <Link to="/body-service">
              Vóc dáng &nbsp;
              <FontAwesomeIcon icon={faCaretDown} />
            </Link>
          </div>
          <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md transform transition-all duration-300 ease-in-out scale-95">
            {(dataBodyServices ?? []).map((item: IItemService) => (
              <Fragment key={item.id}>
                <Link to={`/body-service#${item.id}`}>
                  <div className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap">{item.name}</div>
                </Link>
              </Fragment>
            ))}
          </ul>
        </li>

        <li className="relative group">
          <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white">
            <Link to="/other-service">
              Dịch vụ khác &nbsp;
              <FontAwesomeIcon icon={faCaretDown} />
            </Link>
          </div>
          <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md transform transition-all duration-300 ease-in-out scale-95">
            {(dataOtherServices ?? []).map((item: IItemService) => (
              <Fragment key={item.id}>
                <Link to={`/other-service#${item.id}`}>
                  <div className="block hover:bg-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap">{item.name}</div>
                </Link>
              </Fragment>
            ))}
          </ul>
        </li>

        <li>
          <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white" onClick={() => navigate('/booking')}>
            Đặt lịch
          </div>
        </li>

        <li className="relative group">
          <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white">Sản phẩm</div>
          <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md w-40 transform transition-all duration-300 ease-in-out scale-95">
            <li>
              <a href="#home1" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                Home1
              </a>
            </li>
            <li>
              <a href="#home2" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                Home2
              </a>
            </li>
            <li>
              <a href="#home3" className="block hover:bg-gray-200 px-4 py-2 text-gray-800">
                Home3
              </a>
            </li>
          </ul>
        </li>

        <li className="relative group">
          <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-white">
            <img src={language == 'en' ? flagUSA : flagVietnam} className="rounded-sm w-8 h-6" />
          </div>
          <ul className="group-hover:block group-hover:scale-100 left-0 absolute space-y-2 hidden bg-white shadow-lg py-2 rounded-md w-40 transform transition-all duration-300 ease-in-out scale-95">
            <LanguageSwitcher setLanguage={setLanguage} />
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default MenuBar;
