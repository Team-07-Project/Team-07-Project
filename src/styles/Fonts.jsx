import { css, Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={css`
      /* Pretendard */
      @font-face {
        font-family: "Pretendard";
        src: url("/src/assets/fonts/PretendardVariable.woff2") format("woff2");
        font-weight: 400 500 700;
        font-display: swap;
      }

      /* Noto Sans KR */
      @font-face {
        font-family: "Noto Sans";
        src: url("/src/assets/fonts/NotoSansKR-Regular.woff") format("woff");
        font-weight: 400;
        font-display: swap;
      }
      @font-face {
        font-family: "Noto Sans";
        src: url("/src/assets/fonts/NotoSansKR-Medium.woff") format("woff");
        font-weight: 500;
        font-display: swap;
      }
      @font-face {
        font-family: "Noto Sans";
        src: url("/src/assets/fonts/NotoSansKR-Bold.woff") format("woff");
        font-weight: 700;
        font-display: swap;
      }

      /* 나눔명조 */
      @font-face {
        font-family: "NanumMyeongjo";
        src: url("/src/assets/fonts/NanumMyeongjo.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
      }
      @font-face {
        font-family: "NanumMyeongjo";
        src: url("/src/assets/fonts/NanumMyeongjoBold.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
      }

      /* 나눔손글씨 손편지체 */
      @font-face {
        font-family: "NanumLetter";
        src: url("/src/assets/fonts/NanumLetter.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
      }
    `}
  />
);
