// import React, { createContext, useContext } from 'react';
// import { toast, ToastOptions } from 'react-toastify';

// interface ToastContextProps {
//     showToast: (message: string, options?: ToastOptions) => void;
// }

// const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const showToast = (message: string, options?: ToastOptions) => {
//         toast(message, options);
//     };

//     return (
//         <ToastContext.Provider value={{ showToast }}>
//             {children}
//         </ToastContext.Provider>
//     );
// };

// // Custom hook để sử dụng toast
// export const useToast = (): ToastContextProps => {
//     const context = useContext(ToastContext);
//     if (!context) {
//         throw new Error('useToast must be used within a ToastProvider');
//     }
//     return context;
// };



// import { createContext, useContext } from 'react';
// import { toast, ToastOptions } from 'react-toastify';

// interface ToastContextProps {
//   success: (message: string, options?: ToastOptions) => void;
//   error: (message: string, options?: ToastOptions) => void;
//   info: (message: string, options?: ToastOptions) => void;
//   warn: (message: string, options?: ToastOptions) => void;
// }

// const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const success = (message: string, options?: ToastOptions) => {
//     toast.success(message, options);
//   };

//   const error = (message: string, options?: ToastOptions) => {
//     toast.error(message, options);
//   };

//   const info = (message: string, options?: ToastOptions) => {
//     toast.info(message, options);
//   };

//   const warn = (message: string, options?: ToastOptions) => {
//     toast.warn(message, options);
//   };

//   return (
//     <ToastContext.Provider value={{ success, error, info, warn }}>
//       {children}
//     </ToastContext.Provider>
//   );
// };

// export const useToast = (): ToastContextProps => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// };



import { createContext, useContext } from 'react';
import { toast, ToastOptions } from 'react-toastify';

interface ToastContextProps {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warn: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const success = (message: string, options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      autoClose: 5000, // Thời gian tự động ẩn sau 5 giây (5000ms)
      ...options, // Thêm các tùy chọn được truyền vào nếu có
    };
    toast.success(message, defaultOptions);
  };

  const error = (message: string, options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      autoClose: 5000, // Thời gian tự động ẩn sau 5 giây
      ...options, // Thêm các tùy chọn được truyền vào nếu có
    };
    toast.error(message, defaultOptions);
  };

  const info = (message: string, options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      autoClose: 5000, // Thời gian tự động ẩn sau 5 giây
      ...options, // Thêm các tùy chọn được truyền vào nếu có
    };
    toast.info(message, defaultOptions);
  };

  const warn = (message: string, options?: ToastOptions) => {
    const defaultOptions: ToastOptions = {
      autoClose: 5000, // Thời gian tự động ẩn sau 5 giây
      ...options, // Thêm các tùy chọn được truyền vào nếu có
    };
    toast.warn(message, defaultOptions);
  };

  return (
    <ToastContext.Provider value={{ success, error, info, warn }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
