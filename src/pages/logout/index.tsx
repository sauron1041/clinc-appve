import {  message } from 'antd';
import Cookies from 'js-cookie';
const LogoutPage = () => {
    localStorage.removeItem('userInfo');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    window.location.pathname = '/';

    message.success('Đăng xuất thành công');
    return (
        <></>
    );
};

export default LogoutPage;