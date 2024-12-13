import React from 'react';
import { Table, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import CameraCapture from '../../components/camera-capture';
import TechnicanAppointmentComponent from '../../components/technican-appointment';

const TechnicanAppointment = () => {
    return (
        <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-xl font-bold mb-4" >Check-In</h2>
            <TechnicanAppointmentComponent />
        </Card>
    );
};

export default TechnicanAppointment;