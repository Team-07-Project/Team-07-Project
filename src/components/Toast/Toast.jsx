import { css } from "@emotion/react";
import IconSuccess from "../../assets/images/ic-success.svg";
import IconClose from "../../assets/images/ic-close-gray.svg";

const Toast = ({ id, state = "success", message, visible, onClose }) => {
  return (
    <li css={ToastStyle} className={visible && "visible"}>
      <div className="toast-content">
        {state === "success" && (
          <img src={IconSuccess} alt="처리 완료" className="status-icon" />
        )}
        {message}
      </div>
      <div className="toast-actions">
        <button className="btn-close" onClick={() => onClose(id)}>
          <img src={IconClose} alt="닫기" />
        </button>
      </div>
    </li>
  );
};

export default Toast;

const ToastStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-size-16);
  opacity: 0;
  transform: translateY(20px);
  transition: 0.3s ease-in-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .status-icon {
    width: 24px;
    aspect-ratio: 1/1;
  }

  .btn-close {
    padding: 4px;
  }
`;
