import { css } from "@emotion/react";
import ReactDOM from "react-dom";
import Toast from "./Toast";

const ToastContainer = ({ toasts, hideToast }) => {
  const containerEl = document.getElementById("toast-div");
  if (!containerEl) return null;

  if (toasts.length === 0) return null; // 토스트 없을 때 빈 ul 태그 렌더링 방지

  return ReactDOM.createPortal(
    <ul css={ToastContainerStyle}>
      {toasts?.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          visible={toast.visible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ul>,
    containerEl
  );
};

export default ToastContainer;

const ToastContainerStyle = css`
  position: fixed;
  z-index: 9;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 524px;
  height: 64px;
  display: flex;
  flex-direction: column-reverse; // 토스트 역순으로 쌓기
  gap: 12px;
`;
