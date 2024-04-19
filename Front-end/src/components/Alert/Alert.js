import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = (message, type) => {
  
  switch (type) {
    case "success":
      toast.success(message, { position: "bottom-right",closeOnClick:true,autoClose:true});
      break;
    case "error":
      toast.error(message, { position: "bottom-right",closeOnClick:true,autoClose:true});
      break;
    case "info":
      toast.info(message, { position: "bottom-right",closeOnClick:true,autoClose:true });
      break;
    case "warning":
      toast.warning(message, { position: "bottom-right",closeOnClick:true,autoClose:true});
      break;
    default:
      toast(message, { position: "bottom-right" });
  }
};

export default Alert;
