import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastWrapper = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss={false}
    />
  );
};

export default ToastWrapper;
