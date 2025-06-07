import { css } from "@emotion/react";

const Input = ({
  id,
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  ...props
}) => {
  return (
    <>
      <div css={InputAreaStyle({ error })}>
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          css={InputStyle}
          {...props}
        />
      </div>
      {error && <p css={ErrorMessageStyle}>{error}</p>}
    </>
  );
};

export default Input;

const InputAreaStyle = ({ error }) => css`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 12px;
  border: ${!error ? "1px solid var(--gray-300)" : "1px solid var(--error)"};
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
  color: var(--error);
`;
