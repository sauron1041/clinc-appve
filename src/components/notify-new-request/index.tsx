// // import React, { useState, useEffect } from "react";
// // import { Modal, message } from "antd";
// // import socket from "../../socket"; // Giả sử bạn đã cấu hình socket
// // import { CheckCircleOutlined } from "@ant-design/icons";

// // const CountdownModal: React.FC = () => {
// //     const [timeLeft, setTimeLeft] = useState(5); // Thời gian đếm ngược ban đầu là 5 giây
// //     const [isVisible, setIsVisible] = useState(false); // Trạng thái của modal
// //     const [serviceData, setServiceData] = useState<any>(null); // Lưu trữ dữ liệu yêu cầu

// //     // Cập nhật thời gian đếm ngược mỗi giây
// //     useEffect(() => {
// //         let timer: NodeJS.Timeout | null = null;

// //         if (timeLeft > 0) {
// //             timer = setInterval(() => {
// //                 setTimeLeft((prevTime) => prevTime - 1);
// //             }, 1000);
// //         } else if (timer) {
// //             clearInterval(timer);
// //         }

// //         // Dọn dẹp bộ đếm khi component bị hủy
// //         return () => {
// //             if (timer) {
// //                 clearInterval(timer);
// //             }
// //         };
// //     }, [timeLeft]);

// //     // Lắng nghe sự kiện từ socket
// //     useEffect(() => {
// //         socket.on("newServiceRequest", (data: any) => {
// //             data = {
// //                 id: 1,
// //                 name: "Nguyễn Văn A",
// //                 code: 'YC123456',
// //                 serviceRequest: "Cắt tóc",
// //             }
// //             if (data) {
// //                 setServiceData(data); // Lưu trữ dữ liệu yêu cầu mới từ socket
// //                 setTimeLeft(3000); // Đặt lại thời gian đếm ngược khi có yêu cầu mới
// //                 setIsVisible(true); // Hiển thị modal khi có yêu cầu mới
// //                 // message.success("Có yêu cầu mới!");
// //             }
// //         });

// //         return () => {
// //             socket.off("newServiceRequest"); // Hủy đăng ký sự kiện khi component bị hủy
// //         };
// //     }, []);

// //     const handleClose = () => {
// //         setTimeLeft(3000); // Đặt lại thời gian khi đóng modal
// //         setIsVisible(false); // Ẩn modal khi đóng
// //     };

// //     // Đóng modal khi thời gian đếm ngược về 0
// //     useEffect(() => {
// //         if (timeLeft == 0) {
// //             setIsVisible(false);
// //         }
// //     }, [timeLeft]);

// //     return (
// //         <Modal
// //             visible={isVisible}
// //             title="Thông báo"
// //             onCancel={handleClose}
// //             footer={null}
// //             centered
// //             width={350} // Cân chỉnh độ rộng của modal
// //             bodyStyle={{ padding: "20px", textAlign: "center" }} // Căn chỉnh nội dung trong modal
// //         >
// //             <div className="text-center flex flex-col justify-center items-center">
// //                 <div className="relative mb-4">
// //                     <div className="w-32 h-32 flex items-center justify-center bg-green-500 rounded-full">
// //                         <CheckCircleOutlined className="text-white text-4xl" />
// //                     </div>
// //                 </div>
// //                 <h2 className="text-xl font-semibold text-gray-800">
// //                     Đã nhận yêu cầu mới
// //                 </h2>
// //                 <p className="text-gray-600">Mã yêu cầu: {serviceData?.code}</p>
// //                 <p className="text-gray-600">Khách hàng: {serviceData?.name}</p>
// //                 <p className="text-gray-600">Dịch vụ: {serviceData?.serviceRequest}</p>
// //             </div>

// //         </Modal>
// //     );
// // };

// // export default CountdownModal;



// import React, { useState, useEffect } from "react";
// import { Modal, message } from "antd";
// import socket from "../../socket"; // Giả sử bạn đã cấu hình socket
// import { CheckCircleOutlined } from "@ant-design/icons";

// const CountdownModal: React.FC = () => {
//     const [timeLeft, setTimeLeft] = useState(5); // Thời gian đếm ngược ban đầu là 5 giây
//     const [isVisible, setIsVisible] = useState(false); // Trạng thái của modal
//     const [serviceData, setServiceData] = useState<any>(null); // Lưu trữ dữ liệu yêu cầu

//     // Cập nhật thời gian đếm ngược mỗi giây
//     useEffect(() => {
//         let timer: NodeJS.Timeout | null = null;

//         if (timeLeft > 0) {
//             timer = setInterval(() => {
//                 setTimeLeft((prevTime) => prevTime - 1);
//             }, 1000);
//         } else if (timeLeft === 0) {
//             setIsVisible(false); // Đóng modal khi thời gian đếm ngược về 0
//         }

//         // Dọn dẹp bộ đếm khi component bị hủy
//         return () => {
//             if (timer) {
//                 clearInterval(timer);
//             }
//         };
//     }, [timeLeft]);

//     // Lắng nghe sự kiện từ socket
//     useEffect(() => {
//         socket.on("newServiceRequest", (data: any) => {
//             data = {
//                 id: 1,
//                 name: "Nguyễn Văn A",
//                 code: 'YC123456',
//                 serviceRequest: "Cắt tóc",
//             }
//             if (data) {
//                 setServiceData(data); // Lưu trữ dữ liệu yêu cầu mới từ socket
//                 setTimeLeft(5); // Đặt lại thời gian đếm ngược khi có yêu cầu mới
//                 setIsVisible(true); // Hiển thị modal khi có yêu cầu mới
//                 message.success("Có yêu cầu mới!"); // Hiển thị thông báo yêu cầu mới
//             }
//         });

//         // Hủy đăng ký sự kiện khi component bị hủy
//         return () => {
//             socket.off("newServiceRequest");
//         };
//     }, []);

//     const handleClose = () => {
//         setIsVisible(false); // Ẩn modal khi đóng
//     };

//     return (
//         <Modal
//             visible={isVisible}
//             title="Thông báo"
//             onCancel={handleClose}
//             footer={null}
//             centered
//             width={350} // Cân chỉnh độ rộng của modal
//             bodyStyle={{ padding: "20px", textAlign: "center" }} // Căn chỉnh nội dung trong modal
//         >
//             <div className="text-center flex flex-col justify-center items-center">
//                 <div className="relative mb-4">
//                     <div className="w-32 h-32 flex items-center justify-center bg-green-500 rounded-full">
//                         <CheckCircleOutlined className="text-white text-4xl" />
//                     </div>
//                 </div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                     Đã nhận yêu cầu mới
//                 </h2>
//                 <p className="text-gray-600">Mã yêu cầu: {serviceData?.code}</p>
//                 <p className="text-gray-600">Khách hàng: {serviceData?.name}</p>
//                 <p className="text-gray-600">Dịch vụ: {serviceData?.serviceRequest}</p>
//             </div>
//         </Modal>
//     );
// };

// export default CountdownModal;



import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "antd";
import socket from "../../socket"; // Giả sử bạn đã cấu hình socket
import { BellOutlined } from "@ant-design/icons";

const CountdownModal: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(5); // Thời gian đếm ngược ban đầu là 5 giây
    const [isVisible, setIsVisible] = useState(false); // Trạng thái của modal
    const [serviceData, setServiceData] = useState<any>(null); // Lưu trữ dữ liệu yêu cầu

    // Cập nhật thời gian đếm ngược mỗi giây
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // setIsVisible(false); // Đóng modal khi thời gian đếm ngược về 0
        }

        // Dọn dẹp bộ đếm khi component bị hủy
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timeLeft]);

    // Lắng nghe sự kiện từ socket
    useEffect(() => {
        socket.on("newServiceRequest", (data: any) => {
            console.log("Data from socket:", data);
            if (data) {
                setServiceData(data); // Lưu trữ dữ liệu yêu cầu mới từ socket
                setTimeLeft(5); // Đặt lại thời gian đếm ngược khi có yêu cầu mới
                setIsVisible(true); // Hiển thị modal khi có yêu cầu mới
                // message.success("Có yêu cầu mới!"); // Hiển thị thông báo yêu cầu mới
            }
        });

        // Hủy đăng ký sự kiện khi component bị hủy
        return () => {
            socket.off("newServiceRequest");
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false); // Ẩn modal khi đóng
    };

    return (
        // <Modal
        //     visible={isVisible}
        //     title="Thông báo"
        //     onCancel={handleClose}
        //     footer={null}
        //     centered
        //     width={350} // Cân chỉnh độ rộng của modal
        //     style={{ padding: "20px", textAlign: "center" }} // Thay bodyStyle bằng style
        // >
        //     <div className="text-center flex flex-col justify-center items-center">
        //         <div className="relative mb-4">
        //             <div className="w-32 h-32 flex items-center justify-center bg-green-500 rounded-full">
        //                 <CheckCircleOutlined className="text-white text-4xl" />
        //             </div>
        //         </div>
        //         <h2 className="text-xl font-semibold text-gray-800">
        //             Đã nhận yêu cầu mới
        //         </h2>
        //         {
        //             serviceData && (
        //                 <Card>
        //                     <p className="text-gray-600">Mã yêu cầu: {serviceData?.code}</p>
        //                     <p className="text-gray-600">Khách hàng: {serviceData?.customer?.name}</p>
        //                     <p className="text-gray-600">Dịch vụ: {serviceData?.service?.name}</p>
        //                 </Card>
        //             )
        //         }
        //     </div>
        // </Modal>

        <Modal
            visible={isVisible}
            title="Thông báo"
            onCancel={handleClose}
            footer={null}
            centered
            width={400} // Tăng độ rộng để bố cục thoáng hơn
            style={{ padding: 20, textAlign: "center" }} // Căn chỉnh nội dung body
        >
            <div className="text-center flex flex-col justify-center items-center">
                {/* Biểu tượng */}
                <div className="relative mb-6">
                    <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-full shadow-lg">
                        <BellOutlined className="text-white text-4xl" />
                        {/* <CheckCircleOutlined className="text-white text-4xl" /> */}
                    </div>
                </div>

                {/* Tiêu đề */}
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                    Đã nhận yêu cầu mới
                </h2>

                {/* Thông tin yêu cầu */}
                {serviceData && (
                    <Card
                        className="w-full"
                        style={{
                            borderRadius: 8,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            borderColor: "#f0f0f0",
                        }}
                    >
                        <p className="text-gray-600">
                            <strong>Mã yêu cầu:</strong> {serviceData?.code}
                        </p>
                        <p className="text-gray-600">
                            <strong>Khách hàng:</strong> {serviceData?.customer?.name}
                        </p>
                        <p className="text-gray-600">
                            <strong>Dịch vụ:</strong> {serviceData?.service?.name}
                        </p>
                    </Card>
                )}
            </div>
            <Button
                className="mt-6 min-w-14 bg-[#20b958] text-white"
                onClick={handleClose} // Gọi hàm đóng modal
                style={{ borderRadius: 6, padding: "0 24px", height: 40 }}
            >
                OK
            </Button>
        </Modal>
    );
};

export default CountdownModal;
