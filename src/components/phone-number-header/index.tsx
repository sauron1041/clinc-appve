import React from "react";
import { Link } from "react-router-dom";

const PhoneNumberHeader: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
    return (
        <div className="flex justify-between items-center bg-blue-100 shadow-lg p-6 rounded-lg">
            <div className="flex items-center space-x-4">
                <i className="text-2xl text-blue-600 fa-phone-alt fas"></i> 
                <span className="font-semibold text-blue-900 text-lg">{phoneNumber}</span>
            </div>

            <Link
                to={`/qr-code/${phoneNumber}`}
                className="flex items-center space-x-2 bg-white hover:bg-blue-200 shadow p-2 rounded transition"
            >
                <i className="text-2xl text-blue-600 fa-qrcode fas"></i>
                <span className="font-medium text-blue-600">Mã QR</span>
            </Link>
        </div>
    );
};

export default PhoneNumberHeader;