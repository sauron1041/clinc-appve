
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { message } from 'antd';
import { CameraOutlined, CalendarOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// // Các màn hình
// const Home = () => (
//     <div className="flex justify-center items-center h-full bg-white">
//         <h2 className="text-2xl">Xem Tựa Làm</h2>
//     </div>
// );

// const Camera = () => (
//     <div className="flex justify-center items-center h-full bg-white">
//         <h2 className="text-2xl">Chụp Ảnh Khách Hàng</h2>
//     </div>
// );

// const XemLichLamViec = () => (
//     <div className="flex justify-center items-center h-full bg-white">
//         <h2 className="text-2xl">Xem Lịch Làm Việc</h2>
//     </div>
// );

import { useNavigate } from 'react-router-dom';

const TechnicianFooter: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        // <div className=" bg-[#0284c7] text-white py-4 shadow-lg mt-auto">
        <div className="fixed bottom-0 w-full bg-gradient-to-r from-blue-400 to-blue-800 text-white py-4 shadow-lg mt-auto rounded rounded-t-lg">
        {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-lg mt-auto"> */}
            <div className="flex justify-around items-center">
                <div
                    className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-yellow-300"
                    onClick={() => handleNavigate('/')}
                >
                    <HomeOutlined style={{ fontSize: '22px' }} />
                    <span className="text-sm mt-2">Trang Chủ</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-yellow-300"
                    onClick={() => handleNavigate('/camera')}
                >
                    <CameraOutlined style={{ fontSize: '22px' }} />
                    <span className="text-sm mt-2">Chụp Ảnh</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-yellow-300"
                    // onClick={() => handleNavigate('/calendar')}
                    onClick={() => 
                        message.info('Chức năng đang được phát triển')
                    }
                >
                    <CalendarOutlined style={{ fontSize: '22px' }} />
                    <span className="text-sm mt-2">Lịch</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:text-yellow-300"
                    onClick={() => handleNavigate('/employee-profile')}
                >
                    <UserOutlined style={{ fontSize: '22px' }} />
                    <span className="text-sm mt-2">Cá nhân</span>
                </div>
            </div>
        </div>
    );
};

export default TechnicianFooter;
