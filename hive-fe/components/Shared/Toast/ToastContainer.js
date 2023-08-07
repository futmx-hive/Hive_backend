import Toast from './Toast';

const ToastContainer = ({toasts, classes, top = true,placement=""}) => {
  const getToasts = () => {
    if (top) {
      return toasts.map ((toast, index) => {
        if (toast.isTop) return Object.assign ({}, {...toast, index: index});
      });
    }
    return toasts.map ((toast, index) => {
      if (!toast.isTop) return Object.assign ({}, {...toast, index: index});
    });
  };

  return (
    <div className={`${classes} toast_pkg ${placement}`} id={top ? 'top' : 'bottom'}>
      {getToasts ().map (
        (toast, index) =>
          toast && <Toast key={toast.id} {...{...toast, index}} />
      )}
    </div>
  );
};

export default ToastContainer;
