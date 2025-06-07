import { css } from "@emotion/react";

const Input = ({ id, placeholder = "", value, onChange, onBlur, error }) => {
  return (
    <div css={InputAreaStyle}>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        css={InputStyle}
      />
      {error && <p css={ErrorMessageStyle}>{error}</p>}
    </div>
  );
};

export default Input;

const InputAreaStyle = css`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 12px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
`;

const InputStyle = css`
  width: 100%;
  font-size: var(--font-size-16);
  color: var(--gray-500);
`;

const ErrorMessageStyle = css`
  font-size: var(--font-size-14);
  margin-top: 8px;
  color: var(--gray-900);
`;
