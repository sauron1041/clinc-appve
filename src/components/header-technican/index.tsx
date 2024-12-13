import React from 'react';
import {Layout, Menu, Avatar, Button} from 'antd';
import {UserOutlined, AppstoreOutlined, SearchOutlined} from '@ant-design/icons';
import {useState} from 'react';

const {Header} = Layout;

const TechnicianHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    if (collapsed !== undefined) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout>
      <Header className="bg-[#0284c7] p-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-lg font-semibold">Bảng điều khiển</div>

          <div className="flex items-center gap-4">
            <Avatar icon={<UserOutlined />} className="bg-white text-[#0284c7]" size="large" />

            <Button className="lg:hidden" icon={<AppstoreOutlined />} onClick={toggleMenu} type="primary" />
          </div>
        </div>

        <div className={`lg:hidden mt-4 ${collapsed ? 'block' : 'hidden'}`}>
          <Menu mode="inline" className="bg-[#0284c7] text-white">
            <Menu.Item key="1" icon={<SearchOutlined />}>
              Tìm kiếm
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Hồ sơ
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />}>
              Quản lý công việc
            </Menu.Item>
          </Menu>
        </div>
      </Header>
    </Layout>
  );
};

export default TechnicianHeader;
