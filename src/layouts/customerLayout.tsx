import React, { useState } from "react";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";
import MenuBar from "../components/menu-bar";
import TechnicianHeader from "../components/header-technican";
import TechnicianFooter from "../components/technican-footer";
import FooterCustom from "../components/footer-custom";
import HeaderCustom from "../components/header-custom";


interface CustomerLayoutProps {
    children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col w-full min-h-screen">
                <HeaderCustom />
                <div className="md:block hidden">
                    <MenuBar />
                </div>
                <div className="flex-grow bg-gray-50 mt-[64px] px-1 py-1 overflow-auto">
                    {children}
                </div>
                <div className="flex flex-grow justify-center pb-20">
                    <ToastContainer />
                </div>
                <FooterCustom />
            </div>
        </>
    );
}

export default CustomerLayout;