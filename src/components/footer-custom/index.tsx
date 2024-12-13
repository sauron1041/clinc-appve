import React from "react";
import Footer from "../footer";
// import TechnicianFooter from "../technican-footer";
import CustomerFooter from "../customer-footer";

const FooterCustom: React.FC = () => {
  return (
    <>
      <div className="md:block hidden">
        <Footer />
      </div>
      <div className="block md:hidden">
        <CustomerFooter />
      </div>
    </>
  );
};

export default FooterCustom;
