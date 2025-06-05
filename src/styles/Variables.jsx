import { css, Global } from "@emotion/react";
import { BREAKPOINTS } from "../constants/constants";

// Variables.jsx
export const Variables = () => (
  <Global
    styles={css`
      :root {
        /* fonts */
        --main-font: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
          Roboto, "Helvetica Neue", sans-serif;

        /* colors */
        --purple-100: #f8f0ff;
        --purple-200: #ecd9ff;
        --purple-300: #dcb9ff;
        --purple-400: #c894fd;
        --purple-500: #ab57ff;
        --purple-600: #9935ff;
        --purple-700: #861dee;
        --purple-800: #6e0ad1;
        --purple-900: #5603a7;

        --beige-100: #fff0d6;
        --beige-200: #ffe2ad;
        --beige-300: #ffc583;
        --beige-400: #ffae65;
        --beige-500: #ff8832;

        --blue-100: #e2f5ff;
        --blue-200: #b1e4ff;
        --blue-300: #7cd2ff;
        --blue-400: #34b9ff;
        --blue-500: #00a2fe;

        --green-100: #e4fbdc;
        --green-200: #d0f5c3;
        --green-300: #9be282;
        --green-400: #60cf37;
        --green-500: #2ba600;

        --white: #fff;
        --black: #000;
        --error: #dc3a3a;

        /* grayscale */
        --gray-100: #f6f6f6;
        --gray-200: #eee;
        --gray-300: #ccc;
        --gray-400: #999;
        --gray-500: #555;
        --gray-600: #4a4a4a;
        --gray-700: #3a3a3a;
        --gray-800: #2b2b2b;
        --gray-900: #181818;

        /* primary color */
        --primary: var(--purple-600);
        --primary-hover: var(--purple-700);
        --primary-pressed: var(--purple-800);
        --primary-focus: var(--purple-800);

        /* secondary color */
        --secondary: var(--gray-500);
        --secondary-hover: var(--gray-600);
        --secondary-pressed: var(--gray-700);
        --secondary-focus: var(--gray-700);

        /* surfaces */
        --surface-0: #f6f8ff;

        /* border */
        --border-color: var(--gray-300);

        /* border-radius */
        --radius-sm: 6px;
        --radius-md: 8px;
        --radius-lg: 12px;
        --radius-xlg: 100px;

        /* box-shadow */
        --box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

        /* font-size */
        --font-size-12: 12px;
        --font-size-14: 14px;
        --font-size-15: 15px;
        --font-size-16: 16px;
        --font-size-18: 18px;
        --font-size-20: 20px;
        --font-size-24: 24px;
        --font-size-28: 28px;

        /* font-weight */
        --font-weight-regular: 400;
        --font-weight-medium: 500;
        --font-weight-bold: 700;

        /* layout */
        --content-width: 100%;
        --content-padding: 24px 20px;

        /* header */
        --header-padding: 16px;

        /* modal */
        --modal-width: 600px;
      }

      @media (min-width: ${BREAKPOINTS.md}px) {
        :root {
          /* header */
          --header-padding: 16px 24px;
        }
      }

      @media (min-width: ${BREAKPOINTS.lg}px) {
        :root {
          /* layout */
          --content-width: 1200px;
          --content-padding: 0;

          /* header */
          --header-padding: 16px 0;
        }
      }
    `}
  />
);
