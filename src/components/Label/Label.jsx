import { css } from "@emotion/react";

const Label = ({ inputId = "", value }) => {
  return (
    <label htmlFor={inputId} css={LabelStyle}>
      {value}
    </label>
  );
};

export default Label;

const LabelStyle = css`
  display: block;
  font-size: var(--font-size-24);
  font-weight: var(--font-weight-bold);
  color: var(--gray-900);
  margin-bottom: 12px;
`;
