import React from 'react';
import { Button, Card, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './index.css';

interface ServiceDetailProps {
    service: {
        id: number;
        name: string;
        description: string;
        price: number;
        status: boolean;
        categoryId: number;
        branchId: number;
        totalSessions: number;
        category: {
            id: number;
            name: string;
        };
        branch: {
            id: number;
            name: string;
        };
    };
    onAddToCart: (serviceId: number) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onAddToCart }) => {
    const { name, description, price, status, category, branch, totalSessions } = service;

    return (
        <Card className="service-detail-card" title={name}>
            <div className="service-detail">
                <h3>Thông tin dịch vụ</h3>
                <p><strong>Mô tả:</strong> {description}</p>
                <p><strong>Giá:</strong> {price.toLocaleString()} VNĐ</p>
                <p><strong>Trạng thái:</strong> <Tag color={status ? 'green' : 'red'}>{status ? 'Còn hoạt động' : 'Ngừng hoạt động'}</Tag></p>
                <p><strong>Danh mục:</strong> {category.name}</p>
                <p><strong>Chi nhánh:</strong> {branch.name}</p>
                <p><strong>Số buổi:</strong> {totalSessions} buổi</p>
            </div>

            <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={() => onAddToCart(service.id)}
                className="add-to-cart-btn"
            >
                Thêm vào giỏ hàng
            </Button>
        </Card>
    );
};

export default ServiceDetail;