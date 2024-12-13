import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Button, message } from "antd";
import CameraCapture from "../../../../components/camera";
import { updateServiceRequest } from "../../../../api/service-request";
import { Loading } from "../../../../components/loading";

interface StatusFormProps {
    request: any;
    onClose: () => void;
    branchId: number;
    employeeId: number;
}

const StatusForm: React.FC<StatusFormProps> = ({ request, onClose, branchId, employeeId }) => {
    const [form] = Form.useForm();
    const [images, setImages] = useState<string[]>([]);
    const [listImageUrl, setListImageUrl] = useState<string[]>([]);
    const [currentStatus, setCurrentStatus] = useState<number>(request.currentStatus);
    const [loading, setLoading] = useState<boolean>(false);
    const handleListImageCapture = (imageUrl: any) => {
        console.log("Image URL (upload success):", imageUrl);
        // Thêm vào danh sách ảnh đã upload thành công
        setListImageUrl((prev) => [...prev, imageUrl]);
    };

    const handleImageCapture = (imageUrl: any) => {
        console.log("Image URL:", imageUrl);
        // Thêm ảnh vào danh sách chỉ khi ảnh đã upload thành công
        setImages((prev) => [...prev, imageUrl]);
    };

    const handleSubmit = (values: any) => {
        console.log("Form values:", values);
        console.log("images:", images);

        const payload = {
            currentStatus: request.currentStatus + 1,
            statusHistory: [
                {
                    note: values.note,
                    status: request.currentStatus + 1,
                    userId: request.employeeId,
                    serviceRequestImages: listImageUrl.map((imageUrl) => ({
                        description: "Ảnh chụp tại chỗ",
                        status: request.currentStatus + 1,
                        customerId: branchId,
                        employeeId: employeeId,
                        imageUrl: imageUrl,
                    })),
                },
            ],
        };

        console.log("Payload:", payload);
        setLoading(true);
        updateServiceRequest(request.id, payload).then((res) => {
            console.log("Result:", res);
            if (res?.statusCode == 200) {
                message.success("Cập nhật trạng thái thành công");
                onClose();
            } else {
                message.error("Cập nhật trạng thái thất bại");
            }
            setLoading(false);
        })
    };

    useEffect(() => {
        setCurrentStatus(request.currentStatus);
    })

    if (loading) {
        return <Loading />
    }

    return (
        <Modal
            visible
            title="Chỉnh Sửa Yêu Cầu"
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    currentStatus: request.currentStatus,
                    note: "",
                }}
            >

                {/* thojng tin khach hang */}
                <div className="gap-5 mb-5">
                    <p><span className="font-semibold">Mã yêu cầu:</span> {request.code}</p>
                    <p><span className="font-semibold">Tên Khách Hàng:</span> {request?.customer?.name ? request?.customer?.name : ''}</p>
                    <p><span className="font-semibold">Dịch vụ yêu cầu:</span> {request?.service?.name ? request?.service?.name : ''}</p>
                </div>
                <Form.Item
                    label="Ghi Chú"
                    name="note"
                    rules={[{ required: false, message: "Hãy nhập ghi chú" }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Ảnh">
                    <CameraCapture onCapture={handleImageCapture} handleListImageCapture={handleListImageCapture} />
                    {/* <div className="mt-4 flex flex-row">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Upload ${index}`}
                                className="w-16 h-16 object-cover mr-2"
                            />
                        ))}
                    </div> */}
                    <div className="mt-4">
                        {images.length > 0 &&
                            Array.from({ length: Math.ceil(images.length / 5) }, (_, rowIndex) => (
                                <div key={rowIndex} className="flex flex-row mb-4">
                                    {images.slice(rowIndex * 5, rowIndex * 5 + 5).map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Upload ${index}`}
                                            className="w-16 h-16 object-cover mr-2"
                                        />
                                    ))}
                                </div>
                            ))
                        }
                    </div>

                </Form.Item>
                <div className="flex justify-end">
                    <Form.Item>
                        <Button onClick={onClose} className="mr-2">Hủy</Button>
                        <Button type="primary" htmlType="submit" >
                            {
                                currentStatus == 1 ? "Xác Nhận" :
                                    currentStatus == 2 ? "Bắt Đầu Phục Vụ" :
                                        currentStatus == 3 ? "Hoàn Thành" : "Hủy"
                            }
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default StatusForm;
