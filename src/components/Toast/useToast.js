import { useContext } from "react";
import ToastContext from "./ToastContext";

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("❗️useToast는 ToastProvider 안에서만 호출해주세요...");
  return context;
};

export default useToast;
