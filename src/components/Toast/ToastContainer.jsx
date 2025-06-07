import { css } from "@emotion/react";
import ReactDOM from "react-dom";
import Toast from "./Toast";

const ToastContainer = ({ toasts, hideToast }) => {
  const containerEl = document.getElementById("toast-div");
  if (!containerEl) return null;

  if (toasts.length === 0) return null; // 토스트 없을 때 빈 ol 태그 렌더링 방지

  return ReactDOM.createPortal(
    <ol css={ToastContainerStyle}>
      {toasts?.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          state={toast.state}
          message={toast.message}
          visible={toast.visible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ol>,
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
  width: calc(100% - 40px);
  height: 64px;
  display: flex;
  flex-direction: column-reverse; // 토스트 역순으로 쌓기
  gap: 12px;

  @media (min-width: 540px) {
    width: 100%;
    max-width: 524px;
  }
`;
