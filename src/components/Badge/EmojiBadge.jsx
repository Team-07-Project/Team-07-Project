import { css } from "@emotion/react";

const EmojiBadge = ({ emoji, count }) => {
  return (
    <div css={emojiBadgeStyle}>
      <span>{emoji}</span>
      <span>{count}</span>
    </div>
  );
};

export default EmojiBadge;

const emojiBadgeStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-16);
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.54);
  padding: 8px 12px;
  border-radius: var(--radius-xlg);
`;
