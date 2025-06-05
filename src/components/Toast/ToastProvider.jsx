import { useState } from "react";
import ToastContext from "./ToastContext";
import ToastContainer from "./ToastConatiner";
import ModalContainer from "../Modal/ModalContainer";

const TOAST_VISIBLE_MS = 5000;
const TOAST_DELETE_DOM_MS = 1000;
const TOAST_ANIM_READY_MS = 10;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [modals, setModals] = useState([]);

  const setToastFn = ({ id, visible }) => {
    return setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, visible } : toast))
    );
  };

  const deleteToastFn = (id) => {
    return setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = ({ message }) => {
    // message만 파라미터로 받고, id는 여기서 직접 생성 (삭제할 토스트 구분용 임의 id)
    const id = Math.random().toString(36).substr(2, 9); // 🎯 id 생성 방식 개선 예정(nanoid)

    /*
     * 토스트 show/hide 애니메이션 🌌
     */
    // Step 1: visible: false로 토스트 등장 애니메이션 준비
    setToasts((prev) => [...prev, { id, message, visible: false }]); // visible: 애니메이션 제어용

    // Step 2: visible: true로 변경 → 등장 애니메이션 시작
    setTimeout(() => {
      setToastFn({ id, visible: true });
    }, TOAST_ANIM_READY_MS);

    // Step 3: 일정 시간 후 퇴장 애니메이션 시작
    setTimeout(() => {
      setToastFn({ id, visible: false });
    }, TOAST_VISIBLE_MS);

    // Step 4: 퇴장 애니메이션 후 DOM 제거
    setTimeout(() => {
      deleteToastFn(id);
    }, TOAST_VISIBLE_MS + TOAST_DELETE_DOM_MS);
  };

  const hideToast = (id) => {
    // Step 1: 토스트 닫기 클릭 → visible: false → 퇴장 애니메이션 시작
    setToastFn({ id, visible: false });

    // Step 2: 퇴장 애니메이션 후 DOM 제거
    setTimeout(() => {
      deleteToastFn(id);
    }, TOAST_DELETE_DOM_MS);
  };

  const showModal = (modal) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModals((prev) => [...prev, { ...modal, id, visible: true }]);
  };

  const hideModal = (id) => {
    // 토스트와 달리 사용자 액션 (닫기 버튼, 외부 클릭 등)으로만 닫힘
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  };

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, hideToast, showModal, hideModal }}
    >
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
      <ModalContainer modals={modals} hideModal={hideModal} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
