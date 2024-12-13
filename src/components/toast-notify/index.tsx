import {useEffect} from 'react';
import {useSelector} from 'react-redux';
// import {toast} from 'react-toastify';

const ToastNotification = () => {
  const toastNotify = useSelector((state: any) => state.toastNotify);

  useEffect(() => {
    if (toastNotify.type && toastNotify.message) {
      switch (toastNotify.type) {
        // case 'success':
        //   toast.success(toastNotify.message, {autoClose: toastNotify.duration});
        //   break;
        // case 'error':
        //   toast.error(toastNotify.message, {autoClose: toastNotify.duration});
        //   break;
        // case 'info':
        //   toast.info(toastNotify.message, {autoClose: toastNotify.duration});
        //   break;
        // case 'warning':
        //   toast.warn(toastNotify.message, {autoClose: toastNotify.duration});
        //   break;
        default:
          break;
      }
    }
  }, [toastNotify]);

  return <></>;
};

export default ToastNotification;
