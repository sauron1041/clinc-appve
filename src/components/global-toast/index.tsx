import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position="top-right"  // Vị trí toast
      autoClose={3000}      // Tự động đóng sau 3 giây
      hideProgressBar       // Ẩn thanh tiến trình
      newestOnTop           // Toast mới nhất ở trên cùng
      closeOnClick          // Đóng khi click
      rtl={false}           // Hỗ trợ RTL
      pauseOnFocusLoss      // Dừng khi mất tiêu điểm
      draggable             // Có thể kéo thả toast
      pauseOnHover          // Dừng khi hover
      theme="colored"       // Chủ đề màu sắc
    />
  );
};

export default GlobalToastContainer;
