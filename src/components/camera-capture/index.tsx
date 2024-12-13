import React, { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

// Component CameraCapture
const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  const canvasRef = useRef<HTMLCanvasElement | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }  // Dùng camera trước
        // camera sau
        // video: { facingMode: { exact: "environment" } }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      message.error("Không thể truy cập camera.");
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        setImage(imageData); 
        setIsModalVisible(true)
      }
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setImage(null);
  };

  const uploadImage = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", dataURLtoFile(image, "photo.png"));

        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          message.success("Ảnh đã được tải lên thành công.");
        } else {
          message.error("Có lỗi khi tải ảnh lên.");
        }
      } catch (error) {
        message.error("Lỗi mạng hoặc server.");
      }
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : '';
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        type="primary"
        icon={<CameraOutlined />}
        onClick={startCamera}
        className="mb-4"
      >
        Mở Camera
      </Button>

      <div className="relative">
        <video ref={videoRef} className="w-full h-auto border-2 border-gray-300" />
        <canvas ref={canvasRef} className="hidden" width="640" height="480" />
      </div>

      <Button
        type="primary"
        onClick={captureImage}
        className="mt-4"
      >
        Chụp Hình
      </Button>

      <Modal
        title="Ảnh Chụp"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={uploadImage}>
            Tải Lên
          </Button>,
        ]}
      >
        {image && <img src={image} alt="Captured" className="w-full" />}
      </Modal>
    </div>
  );
};

export default CameraCapture;