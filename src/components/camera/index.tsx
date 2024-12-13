
// import React, { useState } from 'react';
// import Webcam from 'react-webcam';
// import { Button, message, Modal, Spin } from 'antd';
// import { SwapOutlined } from '@ant-design/icons';
// import AxiosService from '../../api/axios';

// interface CameraCaptureProps {
//   onCapture: (image: string) => void;
//   handleListImageCapture: (imageUrl: string) => void;
// }

// const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, handleListImageCapture }) => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [image, setImage] = useState<string | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageUploaded, setImageUploaded] = useState<string | null>(null);
//   const [isFrontCamera, setIsFrontCamera] = useState(true); // Thêm state quản lý camera trước/sau

//   const webcamRef = React.useRef<Webcam>(null);

//   const openCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: isFrontCamera ? "user" : { exact: "environment" } },
//       });
//       setStream(mediaStream);
//       setIsModalVisible(true);
//     } catch (error) {
//       message.error('Không thể truy cập camera.');
//     }
//   };

//   const closeCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     setIsModalVisible(false);
//     setImage(null);
//     setIsLoading(false);
//   };

//   const toggleCamera = () => {
//     setIsFrontCamera(!isFrontCamera); // Đảo trạng thái camera
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     openCamera(); // Mở lại camera với chế độ mới
//   };

//   const captureImage = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setImage(imageSrc);
//       onCapture(imageSrc);
//     } else {
//       message.error('Chụp hình thất bại.');
//     }
//   };

//   const dataURLtoBlob = (dataurl: string) => {
//     const arr = dataurl.split(',');
//     const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
//     const byteString = atob(arr[1]);
//     const uintArray = new Uint8Array(byteString.length);

//     for (let i = 0; i < byteString.length; i++) {
//       uintArray[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([uintArray], { type: mime });
//   };

//   const uploadImage = async () => {
//     if (image) {
//       setIsLoading(true);
//       try {
//         const blob = dataURLtoBlob(image);
//         const formData = new FormData();
//         const file = new File([blob], 'photo.jpg', { type: blob.type });
//         formData.append('file', file);

//         const response = await AxiosService.postFormData('/api/v1/sevice-request-image/upload-image', formData);
//         if (response.statusCode === 200) {
//           const imageUrl = (response as any).data.imageUrl;
//           handleListImageCapture(imageUrl);
//           message.success('Ảnh đã được tải lên thành công.');
//           closeCamera();
//         } else {
//           message.error('Có lỗi khi tải ảnh lên.');
//         }
//       } catch (error) {
//         message.error('Lỗi mạng hoặc server.');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <Button type="primary" onClick={openCamera} className="mb-4">
//         Mở Camera
//       </Button>

//       <Modal
//         title="Ảnh Chụp"
//         visible={isModalVisible}
//         onCancel={closeCamera}
//         footer={[
//           <Button key="cancel" onClick={closeCamera} disabled={isLoading}>
//             Hủy
//           </Button>,
//           <Button key="submit" type="primary" onClick={uploadImage} disabled={!image || isLoading}>
//             {isLoading ? <Spin size="small" /> : 'Tải Lên'}
//           </Button>,
//         ]}
//       >
//         {isLoading && (
//           <div className="flex justify-center items-center">
//             <Spin size="large" />
//           </div>
//         )}
//         {!isLoading && stream && !image && (
//           <>
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={{
//                 facingMode: isFrontCamera ? "user" : "environment",
//               }}
//               width="100%"
//             />

//             <div className="flex justify-center gap-4 mt-4">
//               <Button
//                 type="default"
//                 icon={<SwapOutlined />}
//                 onClick={toggleCamera}
//                 disabled={isLoading}
//               >
//               </Button>
//               <Button type="primary" onClick={captureImage}>
//                 Chụp Hình
//               </Button>

//             </div>
//           </>
//         )}
//         {image && (
//           <div>
//             <img src={image} alt="Captured" className="w-full mt-4" />
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CameraCapture;

import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button, message, Modal, Spin } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import AxiosService from '../../api/axios';

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  handleListImageCapture: (imageUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, handleListImageCapture }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true); // Thêm state quản lý camera trước/sau

  const webcamRef = React.useRef<Webcam>(null);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : { exact: "environment" } },
      });
      setStream(mediaStream);
      setIsModalVisible(true);
    } catch (error) {
      message.error('Không thể truy cập camera.');
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsModalVisible(false);
    setImage(null);
    setIsLoading(false);
  };

  const toggleCamera = () => {
    setIsFrontCamera(!isFrontCamera); // Đảo trạng thái camera
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    openCamera(); // Mở lại camera với chế độ mới
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    } else {
      message.error('Chụp hình thất bại.');
    }
  };

  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const byteString = atob(arr[1]);
    const uintArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([uintArray], { type: mime });
  };

  const uploadImage = async () => {
    if (image) {
      setIsLoading(true);
      try {
        const blob = dataURLtoBlob(image);
        const formData = new FormData();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
        formData.append('file', file);

        const response = await AxiosService.postFormData('/api/v1/sevice-request-image/upload-image', formData);
        if (response.statusCode === 200) {
          const imageUrl = (response as any).data.imageUrl;
          handleListImageCapture(imageUrl);
          onCapture(imageUrl); // Gọi onCapture sau khi tải ảnh thành công
          message.success('Ảnh đã được tải lên thành công.');
          // setIsFrontCamera(true); // Mở lại camera trước
          closeCamera();
        } else {
          message.error('Có lỗi khi tải ảnh lên.');
        }
      } catch (error) {
        message.error('Lỗi mạng hoặc server.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button type="primary" onClick={openCamera} className="mb-4">
        Mở Camera
      </Button>

      <Modal
        title="Ảnh Chụp"
        visible={isModalVisible}
        onCancel={closeCamera}
        footer={[
          <Button key="cancel" onClick={closeCamera} disabled={isLoading}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={uploadImage} disabled={!image || isLoading}>
            {isLoading ? <Spin size="small" /> : 'Tải Lên'}
          </Button>,
        ]}
      >
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        )}
        {!isLoading && stream && !image && (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: isFrontCamera ? "user" : "environment",
              }}
              width="100%"
            />

            <div className="flex justify-center gap-4 mt-4">
              <Button
                type="default"
                icon={<SwapOutlined />}
                onClick={toggleCamera}
                disabled={isLoading}
              >
              </Button>
              <Button type="primary" onClick={captureImage}>
                Chụp Hình
              </Button>
            </div>
          </>
        )}
        {image && (
          <div>
            <img src={image} alt="Captured" className="w-full mt-4" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CameraCapture;
