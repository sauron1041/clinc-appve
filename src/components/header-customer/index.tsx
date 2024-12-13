import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Button, Input, Badge } from 'antd';
import { UserOutlined, AppstoreOutlined, SearchOutlined, ShoppingCartOutlined, BellOutlined } from '@ant-design/icons';
import './index.css';
import NotificationModal from '../notfication-modal';
import { notificationGetAll } from '../../api/notification';
import { Loading } from '../loading';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const CustomerHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noti, setNoti] = useState<any>([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    if (collapsed !== undefined) {
      setCollapsed(!collapsed);
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <SearchOutlined />,
      label: <Input placeholder="Tìm kiếm" className="rounded-lg" />,
    },
  ];

  useEffect(() => {
    // Fetch cart count
    // Fetch notification count

    const fetchNotification = async () => {
      setIsLoading(true);
      notificationGetAll({}).then((res) => {
        if (res?.statusCode == 200) {
          setNotificationCount(res?.data.length);
          setNoti(res?.data);
        }
      });
      setIsLoading(false);
    }
    fetchNotification();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Layout className="top-0 right-0 left-0 z-50 fixed">
      <Header className="bg-[#31a4dd] p-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg text-white">Glow Spa</div>

          <div className="flex items-center gap-2">
            <Avatar icon={<UserOutlined />} className="bg-white text-[#0284c7]" size="large" />

            <Badge count={notificationCount} className="">
              <Button icon={<BellOutlined />} type="text" className="text-white"
                onClick={() => {
                  navigate('/notification');
                }}
              />
            </Badge>

            {/* <NotificationModal notifications={noti} /> */}
            <Badge count={cartCount} className="mr-2">
              <Button icon={<ShoppingCartOutlined />} type="text" className="text-white" />
            </Badge>

            <Button className="lg:hidden" icon={<AppstoreOutlined />} type="primary" />
            {/* <Button className="lg:hidden" icon={<AppstoreOutlined />} onClick={toggleMenu} type="primary" /> */}
          </div>
        </div>

        <div className={`lg:hidden mt-4 ${collapsed ? 'block' : 'hidden'}`}>
          <Menu mode="inline" className="text-white" items={menuItems} />
        </div>
      </Header>
    </Layout>
  );
};

export default CustomerHeader;
