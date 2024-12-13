import React from "react";
// import Header from "../components/header";
import { ToastContainer } from "react-toastify";
// import Footer from "../components/footer";
// import MenuBar from "../components/menu-bar";
import TechnicianHeader from "../components/header-technican";
import TechnicianFooter from "../components/technican-footer";


interface TechnicanLayoutProps {
    children: React.ReactNode;
}

const TechnicanLayout: React.FC<TechnicanLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col w-full min-h-screen">
                <TechnicianHeader />
                <div className="flex-grow bg-gray-50 px-1 py-1 overflow-auto">
                    {children}
                </div>
                <div className="flex flex-grow justify-center pb-20">
                    <ToastContainer />
                </div>
                <TechnicianFooter />
            </div>
        </>
    );
}

export default TechnicanLayout;