import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    ...toastConfig,
    ...options,
  });
};

export const showError = (message, options = {}) => {
  return toast.error(message, {
    ...toastConfig,
    ...options,
  });
};

export const showWarning = (message, options = {}) => {
  return toast.warning(message, {
    ...toastConfig,
    ...options,
  });
};

export const showInfo = (message, options = {}) => {
  return toast.info(message, {
    ...toastConfig,
    ...options,
  });
};

export const showLoading = (message = 'Loading...', options = {}) => {
  return toast.info(message, {
    ...toastConfig,
    autoClose: 5000,
    ...options,
  });
};

export const showCustom = (message, type = 'default', options = {}) => {
  const customOptions = {
    ...toastConfig,
    ...options,
  };

  switch (type) {
    case 'success':
      return showSuccess(message, customOptions);
    case 'error':
      return showError(message, customOptions);
    case 'warning':
      return showWarning(message, customOptions);
    case 'info':
      return showInfo(message, customOptions);
    default:
      return toast(message, customOptions);
  }
};

export const showToast = (message, options = {}) => {
  return toast(message, { ...toastConfig, ...options });
};

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  custom: showCustom,
  loading: showLoading,
  toast: showToast,
};
