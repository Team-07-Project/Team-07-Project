import { css } from "@emotion/react";

const EmojiBadge = ({ emoji, count }) => {
  return (
    <div css={emojiBadgeStyle}>
      <span css={EMOJI_SIZE}>{emoji}</span>
      <span>{count}</span>
    </div>
  );
};

export default EmojiBadge;

const emojiBadgeStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: inherit;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.54);
  padding: 6px 12px;
  border-radius: var(--radius-xlg);
`;

const EMOJI_SIZE = css`
  font-size: 20px;
  line-height: 20px;
`;
