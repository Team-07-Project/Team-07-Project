import { css } from "@emotion/react";
import { ScrollArrowButton } from "../../components/Button/IconButtons";

const Pagination = ({ slideIndex, maxIndex, onPrev, onNext }) => (
  <>
    <ScrollArrowButton
      direction="left"
      onClick={onPrev}
      visible={slideIndex > 0}
      css={prevBtn}
      aria-label="이전 카드 보기"
    />
    <ScrollArrowButton
      direction="right"
      onClick={onNext}
      visible={slideIndex < maxIndex}
      css={nextBtn}
      aria-label="다음 카드 보기"
    />
  </>
);

export default Pagination;

// Prev 버튼 위치 (왼쪽 중앙 바깥)
const prevBtn = css`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
`;

// Next 버튼 위치 (오른쪽 중앙 바깥)
const nextBtn = css`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
`;
