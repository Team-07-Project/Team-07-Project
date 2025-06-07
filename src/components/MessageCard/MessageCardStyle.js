import { css } from "@emotion/react";
import { BREAKPOINTS } from "../../constants/constants";

const MessageCardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 28px 24px 24px;
  background-color: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  word-break: keep-all;
  cursor: pointer;

  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 284px;
  }

  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 280px;
    overflow: hidden;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gray-200);
  }

  .card-body {
    min-height: 110px;
  }
`;

export const SelectedCardStyle = css`
  background-color: #FBD5D5;
  border: 1px solid #E60023;
`;

export default MessageCardStyle;

export const MessageCardProfileStyle = css`
  display: flex;
  gap: 10px;

  .sender-name {
    display: block;
    font-size: var(--font-size-18);
  }

  @media (min-width: ${BREAKPOINTS.md}px) {
    gap: 14px;

    .sender-name {
      font-size: var(--font-size-20);
    }
  }
`;

export const MessageCardContentStyle = css`
  height: 56px;
  margin-bottom: 16px;
  padding-top: 16px;
  font-size: var(--font-size-15);
  color: var(--gray-600);
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 100px;
    font-size: var(--font-size-18);
    -webkit-line-clamp: 3;
  }
`;

export const MessageCardCreatedAtStyle = css`
  font-size: var(--font-size-12);
  color: var(--gray-400);
`;
