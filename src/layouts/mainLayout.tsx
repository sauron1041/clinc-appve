import React  from "react";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";
import MenuBar from "../components/menu-bar";


interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col w-full min-h-screen">
                <Header />
                <MenuBar />
                {children}
                <div className="flex flex-grow justify-center pb-20">
                    <Footer />
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default MainLayout;