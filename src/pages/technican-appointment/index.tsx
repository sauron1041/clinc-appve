
import { Card } from 'antd';
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