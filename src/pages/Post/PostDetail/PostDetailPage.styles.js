import { css } from "@emotion/react";
import { BREAKPOINTS, POST_PADDINGS } from "../../../constants/constants";

export const loader = css`
  margin-top: 110px;
  padding: 24px;
  text-align: center;
  color: var(--gray-500);
`;

export const sectionWrapper = (recipient) => css`
  background-color: ${recipient?.backgroundColor || "var(--bg-light)"};
  /* background-image: ${recipient?.backgroundImageURL
    ? `url(${recipient.backgroundImageURL})`
    : "none"}; */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const messagesWrapper = css`
  /* 모바일 기본값 (모바일 퍼스트) */
  padding: ${POST_PADDINGS.mobile};
  min-height: 100vh;

  /* 태블릿 */
  @media (min-width: ${BREAKPOINTS.md}px) {
    padding: ${POST_PADDINGS.tablet};
  }

  /* PC */
  @media (min-width: 1248px) {
    padding: ${POST_PADDINGS.desktop};
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 1247px) {
    width: calc(100% - 48px);
    max-width: none;
    margin: 0 auto;
  }
`;
