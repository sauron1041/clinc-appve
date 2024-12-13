import React from "react";
import { Link } from "react-router-dom";
import PhoneNumberHeader from "../../components/phone-number-header";

const CustomerProfilePage: React.FC = () => {
    const phoneNumber = "+84352333485";
    return (
        <div className="bg-gray-100 p-4 min-h-screen">
            <div className="space-y-4">
                {/* <Link
                    to={`/qr-code/${phoneNumber}`} 
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Số điện thoại: {phoneNumber}</span>
                    <span className="font-bold text-blue-600">
                        <i className="fa-qrcode fas"></i>
                    </span>
                </Link> */}

                <PhoneNumberHeader phoneNumber={phoneNumber} />

                <Link
                    to="#user-profile"
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Thông tin cá nhân</span>
                    <span className="font-bold text-blue-600">→</span>
                </Link>

                <Link
                    to="#membership-level"
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Mức độ thành viên</span>
                    <span className="font-bold text-blue-600">→</span>
                </Link>

                <Link
                    to="/booking-history"
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Lịch sử đặt lịch</span>
                    <span className="font-bold text-blue-600">→</span>
                </Link>

                <Link
                    to="#purchased-services"
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Dịch vụ đã mua</span>
                    <span className="font-bold text-blue-600">→</span>
                </Link>

                <Link
                    to="#invoices"
                    className="flex justify-between items-center bg-white hover:bg-blue-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium">Hóa đơn</span>
                    <span className="font-bold text-blue-600">→</span>
                </Link>

                <Link
                    to="/logout"
                    className="flex justify-between items-center bg-white hover:bg-red-50 shadow p-4 rounded transition"
                >
                    <span className="font-medium text-red-600">Đăng xuất</span>
                    <span className="font-bold text-red-600">→</span>
                </Link>

            </div>
        </div>
    );
};

export default CustomerProfilePage;
