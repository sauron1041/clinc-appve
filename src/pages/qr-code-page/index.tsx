import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const QRCodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full sm:w-96 text-center flex flex-col justify-center align-middle">
        <h2 className="mb-4 font-semibold text-xl">Quét mã QR để Check-In</h2>
        <div className='flex justify-center'>
        <div>
          <QRCode value={`tel:${id ?? ''}`} size={256} fgColor="#000000" bgColor="#FFFFFF" />
        </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">Hãy đưa mã cho nhân viên </p>
      </div>
    </div>
  );
};

export default QRCodePage;
