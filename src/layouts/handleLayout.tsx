import React, { useEffect } from "react";
import CustomerLayout from "./customerLayout";
import TechnicanLayout from "./technicanLayout";


interface Props {
    roleId: number;
    children: React.ReactNode | React.ReactNode[] | undefined
}

const RoleBasedLayout: React.FC<Props | any> = ({children }) => {
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