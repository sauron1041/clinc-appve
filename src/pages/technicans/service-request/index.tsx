import React, { useEffect, useState } from "react";
import ServiceRequestTable from "../../../components/technicans/service-request-table";
import StatusForm from "./form/statusForm";
import { findAllServiceRequestBegingServed } from "../../../api/service-request";
import { Loading } from "../../../components/loading";
import { Button, Modal } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const ServiceRequestPage: React.FC = () => {
    const [data, setData] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [employeeId, setEmployeeId] = useState<number>(1);
    const [branchId, setBranchId] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalView, setIsModelView] = useState(false);
    const [selecView, setSelecView] = useState<any>(null)

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllServiceRequestBegingServed({});
            if (res?.statusCode == 200) {
                console.log("Data:", res.data);
                setIsLoading(false);
                setData(res.data);
            }
        };
        fetchData();
    }, [
        selectedRequest
    ]);

    const handleView = (id: number) => {
        console.log("View ID:", id);
        const request = data.find((item: any) => item.id == id);
        if (request) {
            setIsModelView(true);
            setSelecView(request);
        }
    };

    const handleCloseView = () => {
        setIsModelView(false);
        // selecView(null);
    };


    const handleEdit = (request: any) => {
        console.log("Edit Request:", request);
        setEmployeeId(request.employeeId);
        setBranchId(request.branchId);
        setSelectedRequest(request);
    };

    const handleCloseForm = () => {
        setSelectedRequest(null);
    };

    const onChoose = (choose: any) => {
        console.log("Choose Request:", choose);
        setSelectedRequest(choose);
    }

    useEffect(() => {
        console.log("Current location:", location);
    
      }, [location]);
    return (
        <div className="container mx-auto p-4">
            {isLoading ?
                <Loading />
                :
                <div><h1 className="text-xl font-bold mb-4">Yêu cầu đang xử lý</h1>
                    <ServiceRequestTable data={data} onEdit={handleEdit} onView={handleView} onChoose={onChoose} /> </div>}
            {selectedRequest && (
                <StatusForm
                    request={selectedRequest}
                    onClose={handleCloseForm}
                    branchId={selectedRequest.branchId}
                    employeeId={selectedRequest.employeeId}
                />
            )}
            {isModalView && (
                <Modal
                    visible={isModalView}
                    title="Chi Tiết Yêu Cầu"
                    onCancel={handleCloseView}
                    footer={<Button onClick={handleCloseView}>Đóng</Button>}
                >
                    <p><strong>Mã Yêu Cầu:</strong> {selecView?.code}</p>
                    <p><strong>Tên Khách Hàng:</strong> {selecView?.customer?.name}</p>
                    <p><strong>Dịch Vụ:</strong> {selecView?.service?.name}</p>
                    <p><strong>Thời Gian Check-In:</strong> {
                        new Date(selecView?.checkInTime).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    }</p>
                </Modal>
            )}
        </div>
    );
};

export default ServiceRequestPage;
