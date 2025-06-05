import { useContext } from "react";
import ModalContext from "./ModalContext";

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal은 ModalProvider 안에서만 호출되어야 합니다.");
  return context;
};

export default useModal;
