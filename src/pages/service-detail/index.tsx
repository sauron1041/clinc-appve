import React, { useState } from 'react';
import ServiceDetail from '../../components/service-detail';
import { toast } from 'react-toastify';

const ServiceDetailPage: React.FC = () => {
    const [cart, setCart] = useState<number[]>([]);

    const service = {
        id: 21,
        name: 'Làm sạch da mặt chuyên sâu 5',
        description: 'Giúp làn da của bạn trở nên thông thoáng và tươi mới với dịch vụ làm sạch da mặt chuyên sâu tại thẩm mỹ viện của chúng tôi. Bằng cách sử dụng các liệu pháp làm sạch tiên tiến kết hợp với sản phẩm chăm sóc da an toàn, liệu trình loại bỏ bụi bẩn, bã nhờn và tế bào chết, mang lại làn da sạch mịn và khỏe khoắn. Chuyên gia của chúng tôi sẽ tư vấn và thực hiện liệu trình phù hợp cho từng loại da, giúp bạn luôn tự tin với làn da rạng ngời.',
        price: 119998,
        status: true,
        categoryId: 2,
        branchId: 1,
        totalSessions: 3,
        userId: null,
        createdAt: '2024-11-02T14:15:48.000Z',
        updatedAt: '2024-11-04T15:40:43.000Z',
        category: {
            id: 2,
            name: 'Gương mặt',
        },
        branch: {
            id: 1,
            name: 'Chi nhánh 1',
        },
    };

    const handleAddToCart = (serviceId: number) => {
        setCart((prevCart) => [...prevCart, serviceId]);
        alert('Dịch vụ đã được thêm vào giỏ hàng');
        // toast.success('Dịch vụ đã được thêm vào giỏ hàng');
    };

    return (
        <div className="service-page">
            <ServiceDetail service={service} onAddToCart={handleAddToCart} />
            {/* <div className="cart-info">
                <h3>Giỏ hàng:</h3>
                <p>Số lượng dịch vụ trong giỏ: {cart.length}</p>
            </div> */}
        </div>
    );
};

export default ServiceDetailPage;