import React from "react";
// import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from "antd";
import { DollarCircleOutlined, AppstoreAddOutlined } from "@ant-design/icons";

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    totalSessions: number;
    category: string;
}

const services: Service[] = [
    { id: 1, name: "Dịch vụ A", description: "Mô tả dịch vụ A", price: 200, totalSessions: 5, category: "Danh muc 1" },
    { id: 2, name: "Dịch vụ B", description: "Mô tả dịch vụ B", price: 150, totalSessions: 3, category: "Danh muc 2" },
    { id: 3, name: "Dịch vụ C", description: "Mô tả dịch vụ C", price: 300, totalSessions: 4, category: "Danh muc 1" },
];

const ServiceList: React.FC = () => {
    // const navigate = useNavigate();

    // const handleServiveDetail = () => {
    //     navigate(`/service-detail`);
    //     // navigate(`/service-detail/${serviceId}`);
    // };
    return (
        <div className="mx-auto py-4 container">
            <h1 className="mb-6 font-bold text-2xl text-center">Danh sách dịch vụ</h1>

            <Row gutter={[16, 16]}>
                {services.map(service => (
                    <Col span={12} md={8} lg={6} key={service.id}>
                        <Card
                            hoverable
                            cover={<img alt={service.name} src="https://via.placeholder.com/150" />}
                            className="shadow-lg rounded-lg"
                        >
                            <h3 className="font-semibold text-blue-600 text-lg">{service.name}</h3>
                            <p className="text-gray-700 text-sm">{service.description}</p>

                            <div className="flex items-center mt-2 text-sm">
                                <DollarCircleOutlined className="mr-2 text-green-600" />
                                <span>{`Giá: ${service.price} VNĐ`}</span>
                            </div>

                            <div className="flex items-center mt-2 text-sm">
                                <AppstoreAddOutlined className="mr-2 text-yellow-600" />
                                <span>{`Danh mục: ${service.category}`}</span>
                            </div>

                            <div className="flex items-center mt-2 text-sm">
                                <span>{`Số liệu trình: ${service.totalSessions}`}</span>
                            </div>

                            {/* <Button type="primary" block className="mt-4">Xem chi tiết</Button> */}
                            <Button
                                // onClick={() => handleServiveDetail(service.id)}
                                type="primary"
                                htmlType="submit"
                                className="bg-[#31a4dd] hover:bg-[#bddae9] w-full text-white"
                            >
                                Xem chi tiết
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
export default ServiceList;