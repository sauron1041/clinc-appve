import React from 'react';
import {Outlet} from 'react-router-dom';
import Chatbot from './chatbot';

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
};

export default Layout;
