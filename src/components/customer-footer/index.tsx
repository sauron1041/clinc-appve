
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Layout, Menu } from 'antd';
import { CalendarOutlined, HomeOutlined, UserOutlined,  AppstoreOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// const Home = () => (
//     <div className="flex justify-center items-center bg-white h-full">
//         <h2 className="text-2xl">Xem Tựa Làm</h2>
//     </div>
// );

// const Camera = () => (
//     <div className="flex justify-center items-center bg-white h-full">
//         <h2 className="text-2xl">Chụp Ảnh Khách Hàng</h2>
//     </div>
// );

// const XemLichLamViec = () => (
//     <div className="flex justify-center items-center bg-white h-full">
//         <h2 className="text-2xl">Xem Lịch Làm Việc</h2>
//     </div>
// );

import { useNavigate } from 'react-router-dom';

const CustomerFooter: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        // <div className="bg-[#0284c7] shadow-lg mt-auto py-4 text-white">
        <div className="bottom-0 fixed bg-[#31a4dd] shadow-lg mt-auto py-4 rounded rounded-t-lg w-full text-white">
        {/* <div className="bottom-0 fixed bg-gradient-to-r from-blue-400 to-blue-800 shadow-lg mt-auto py-4 rounded rounded-t-lg w-full text-white"> */}
        {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg mt-auto py-4 text-white"> */}
            <div className="flex justify-around items-center">
                <div
                    className="flex flex-col items-center hover:text-yellow-300 transform transition-all duration-300 cursor-pointer hover:scale-110"
                    onClick={() => handleNavigate('/')}
                >
                    <HomeOutlined style={{ fontSize: '22px' }} />
                    <span className="mt-2 text-sm">Trang Chủ</span>
                </div>
                <div
                    className="flex flex-col items-center hover:text-yellow-300 transform transition-all duration-300 cursor-pointer hover:scale-110"
                    onClick={() => handleNavigate('/services')}
                >
                    {/* <CameraOutlined style={{ fontSize: '22px' }} /> */}
                    <AppstoreOutlined style={{ fontSize: '22px' }} />
                    <span className="mt-2 text-sm">Dịch vụ</span>
                </div>
                <div
                    className="flex flex-col items-center hover:text-yellow-300 transform transition-all duration-300 cursor-pointer hover:scale-110"
                    onClick={() => handleNavigate('/booking')}
                >
                    <CalendarOutlined style={{ fontSize: '22px' }} />
                    <span className="mt-2 text-sm">Đặt lịch</span>
                </div>
                <div
                    className="flex flex-col items-center hover:text-yellow-300 transform transition-all duration-300 cursor-pointer hover:scale-110"
                    onClick={() => handleNavigate('/customer-profile')}
                >
                    <UserOutlined style={{ fontSize: '22px' }} />
                    <span className="mt-2 text-sm">Cá nhân</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerFooter;
