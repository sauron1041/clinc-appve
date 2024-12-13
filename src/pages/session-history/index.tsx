import React from 'react';
import { Table, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CameraCapture from '../../components/camera-capture';

const SessionHistory = () => {
  return (
    <Card className="p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4" >Chụp ảnh liệu trình</h2>
      <CameraCapture/>
    </Card>
  );
};

export default SessionHistory;