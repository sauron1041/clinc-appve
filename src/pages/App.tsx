import './app.css';
// import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login-page';
import FaceService from './face-service';
import BodyService from './body-service';
import OtherService from './other-service';
import Booking from './booking';
import Profile from './profile';
import { useEffect, useState } from 'react';
import { getServicesAll } from '../api/services';
import { useDispatch } from 'react-redux';
import { setBodyService } from '../redux/slices/bodyServiceSlice';
import { setFaceService } from '../redux/slices/faceServiceSlice';
import { setOtherService } from '../redux/slices/otherServiceSlice';
import Splash from '../components/splash';
import Cookies from 'js-cookie';
import { getInfo } from '../api/auth';
import { setUserInfo } from '../redux/slices/userInfoSlice';
import { setAllService } from '../redux/slices/allServicesSlice';
import { setToastNotify } from '../redux/slices/toastNotifySlice';
import MainLayout from '../layouts/mainLayout';
import BookingHistory from './booking-history';
import SessionHistory from './session-history';
import TechnicanDasboard from './technican-dashboard';
import TechnicanLayout from '../layouts/technicanLayout';
import TechnicanAppointment from './technican-appointment';
import BookingPage from './booking-customer';
import CustomerLayout from '../layouts/customerLayout';
import CustomerProfilePage from './customer-profile';
import ServiceList from './services';
import ServiceDetailPage from './service-detail';
import QRCodePage from './qr-code-page';
import { IService } from '../models/service';
import Layout from './Layout';
import socket from '../socket';
import { useToast } from '../context/ToastProvider';
import ServiceRequestPage from './technicans/service-request';
import EmployeeProfilePage from './employee-profile';
import RoleBasedLayout from '../layouts/handleLayout';
import { RoleName } from '../constants/role';
import LogoutPage from './logout';
import { Button } from 'antd';
import NotificationPage from './notification-page';
// import { useToast } from '../context/ToastProvider';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = Cookies.get('accessToken');
  const toast = useToast();
  interface User {
    roleId: number;
    [key: string]: any;
  }

  const [user, setUser] = useState<User | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (accessToken) {
      getInfoUser();
    }
  }, [accessToken]);

  useEffect(() => {
    // localStorage.clear();
    socket.connect();
    socket.on('connect', () => {
      const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;
      setUser(user);
      console.log("user", user);

      // const userId: number = user ? user.id : 0;
      socket.emit('connected', user);
      console.log('Connected to server');
    });
    socket.emit('employeeConnected', 'Technican connected');

    // socket.on('newServiceRequest', () => {
    //   // console.log('New service request');
    //   // toast.success('Có yêu cầu mới');
    // })

    const fetchData = async () => {
      setIsLoading(true);
      const allServices = await getAllServices();
      if (allServices) {
        const faceServices = allServices.filter((service: IService) => service.categoryId == 2);
        const bodyServices = allServices.filter((service: IService) => service.categoryId == 1);
        const otherServices = allServices.filter((service: IService) => service.categoryId == 3);
        dispatch(setFaceService(faceServices));
        dispatch(setBodyService(bodyServices));
        dispatch(setOtherService(otherServices));
        dispatch(setAllService(allServices));
        setIsLoading(false);
      } else {
        dispatch(setToastNotify({ message: 'Có lỗi xảy ra', type: 'error', duration: 3000 }));
        setIsLoading(false);
      }
    };

    fetchData();
    dispatch(setToastNotify({ message: '', type: null, duration: 0 }));
  }, []);

  const getAllServices = async () => {
    try {
      const res = await getServicesAll();
      if (res?.statusCode === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoUser = async () => {
    const res = await getInfo();
    if (res?.statusCode === 200) {
      dispatch(setUserInfo(res.data));
      dispatch(setToastNotify({ message: 'Chào mừng quay trở lại!', type: 'success', duration: 2000 }));
    } else {
      dispatch(setUserInfo(null));
    }
  };

  // if (isLoading) {
  //   return <Splash />;
  // }

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<Layout />}>
          {/* <Route
            path="/"
          /> */}
          <Route
            path="/"
            element={
              <RoleBasedLayout>
                {user?.roleId == RoleName.Customer ? <BookingPage /> : (user?.roleId == RoleName.Technican ? <TechnicanDasboard /> : <BookingPage />)}
              </RoleBasedLayout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/face-service" element={<FaceService />} />
          <Route path="/body-service" element={<BodyService />} />
          <Route path="/other-service" element={<OtherService />} />
          <Route
            path="/booking-history"
            element={
              <CustomerLayout>
                <BookingHistory />
              </CustomerLayout>
            }
          />
          <Route
            path="/booking"
            element={
              <RoleBasedLayout>
                <BookingPage />
              </RoleBasedLayout>
            }
          />
          <Route
            path="/technican-dasboard"
            element={
              <RoleBasedLayout>
                <TechnicanDasboard />
              </RoleBasedLayout>
            }
          />
          <Route
            path="/camera"
            element={
              <TechnicanLayout>
                <SessionHistory />
              </TechnicanLayout>
            }
          />
          {/* <Route path='/technican-appointment' element={<TechnicanLayout><TechnicanAppointment /></TechnicanLayout>} /> */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/services"
            element={
              <CustomerLayout>
                <ServiceList />
              </CustomerLayout>
            }
          />
          <Route
            path="/customer-profile"
            element={
              <CustomerLayout>
                <CustomerProfilePage />
              </CustomerLayout>
            }
          />
          <Route
            path="/service-detail"
            element={
              <CustomerLayout>
                <ServiceDetailPage />
              </CustomerLayout>
            }
          />
          <Route
            path="/qr-code/:id"
            element={
              <CustomerLayout>
                <QRCodePage />
              </CustomerLayout>
            }
          />
        </Route>
        <Route
          path="/service-request-being-served"
          element={
            <TechnicanLayout>
              <ServiceRequestPage />
            </TechnicanLayout>
          }
        />
        <Route
          path="/employee-profile"
          element={
            <TechnicanLayout>
              <EmployeeProfilePage />
            </TechnicanLayout>
          }
        />
        <Route
          path="/logout"
          element={
            // <TechnicanLayout>
            <LogoutPage />
            // </TechnicanLayout>
          }
        />
        <Route
          path="/notification"
          element={
            <CustomerLayout>
              <NotificationPage />
            </CustomerLayout>
          }
        />
      </Routes>
    </Router >
  );
};

export default App;
