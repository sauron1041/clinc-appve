import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomerLayout from "./customerLayout";
import TechnicanLayout from "./technicanLayout";
import MainLayout from "./mainLayout";

interface Props {
    roleId: number;
    children: React.ReactNode;
}

const RoleBasedLayout: React.FC<Props> = ({children }) => {
    // const userInfo = useSelector((state: any) => state.user.userInfo);

    // if (!userInfo) {
    //     return <Navigate to="/login" replace />;
    // }
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;
    const roleId = user?.roleId;
    console.log("Role ID:", roleId);

    useEffect(() => {

    }, [roleId]);
    
    switch (roleId) {
        case 2:
            return <TechnicanLayout>{children}</TechnicanLayout>;
        case 3:
            return <CustomerLayout>{children}</CustomerLayout>;
        default:
            return <CustomerLayout>{children}</CustomerLayout>;
    }
};

export default RoleBasedLayout;