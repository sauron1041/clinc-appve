import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

interface ServiceRequest {
    id: number;
    code: string;
    currentStatus: number;
    checkInTime: string;
    branchId: number;
    employeeId: number;
}

interface Props {
    data: ServiceRequest[];
    onEdit: (id: number) => void;
    onView: (id: number) => void;
    onChoose: (choose: ServiceRequest) => void;
}

const ServiceRequestTable: React.FC<Props> = ({ data, onEdit, onView, onChoose }) => {
    const columns = [
        {
            title: "Mã yêu cầu",
            dataIndex: "code",
            key: "code",
            // responsive: ["lg"], // Chỉ hiển thị trên màn hình lớn
        },
        {
            title: "Trạng Thái",
            dataIndex: "currentStatus",
            key: "currentStatus",
            render: (status: number) =>
                status == 1 ? (
                    <span className="text-red-600 font-semibold">Đang chờ</span>

                ) : status == 2 ? (
                    <span className="text-green-600 font-semibold">Đã xác nhận</span>

                ) : status == 3 ? (
                    <span className="text-green-600 font-semibold">Đang phục vụ</span>

                ) : (
                    <></>
                    // trang thai hoan thnah va da huy
                ),
        },
        {
            title: "Thời Gian Check-In",
            dataIndex: "checkInTime",
            key: "checkInTime",
            render: (time: string) =>
                new Date(time).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            responsive: ["lg"],
        },
        {
            title: "Hành Động",
            key: "actions",
            render: (_: any, record: ServiceRequest) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => onChoose(record)}
                        className="bg-blue-500"
                    />
                    <Button
                        type="default"
                        icon={<EyeOutlined />}
                        onClick={() => onView(record.id)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="p-4 bg-white rounded shadow-lg">
            <Table
                dataSource={data}
                columns={columns as any}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                scroll={{ x: "100%" }} // Cuộn ngang trên màn hình nhỏ
                className="text-sm" // Font nhỏ hơn cho mobile
            />
        </div>
    );
};

export default ServiceRequestTable;
