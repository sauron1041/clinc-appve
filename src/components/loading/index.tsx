import React from "react";

export const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-10 h-10 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};


{/* <div className="flex justify-center items-center h-64">
<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
</div> */}