import React from 'react';
import {useTranslation} from 'react-i18next';
import flagUSA from '../../assets/images/img_flag_usa.png';
import flagVietnam from '../../assets/images/img_flag_viet_nam.png';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/slices/loadingSlice';

interface ILanguageSwitcherProps {
  setLanguage: (lng: string) => void;
}

const LanguageSwitcher: React.FC<ILanguageSwitcherProps> = ({setLanguage}) => {
  const {i18n} = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lng: string) => {
    dispatch(setLoading(true));
    localStorage.setItem('appConfig', JSON.stringify({defaultLanguage: lng}));
    setLanguage(lng);
    setTimeout(() => {
      i18n.changeLanguage(lng);
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <>
      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => changeLanguage('en')}>
        English &nbsp;
        <img src={flagUSA} className="h-4 w-6" />
      </div>

      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => changeLanguage('vi')}>
        Tiếng Việt &nbsp;
        <img src={flagVietnam} className="h-4 w-6" />
      </div>
    </>
  );
};

export default LanguageSwitcher;
