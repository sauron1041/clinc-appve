import React from "react";
// import Footer from "../footer";
// import TechnicianFooter from "../technican-footer";
import Header from "../header";
// import TechnicianHeader from "../header-technican";
import CustomerHeader from "../header-customer";

const HeaderCustom: React.FC = () => {
    return (
        <div className="">
            <div className="md:block hidden">
                <Header />
            </div>
            <div className="block md:hidden">
                <CustomerHeader />
            </div>
        </div>
    );
};

export default HeaderCustom;
