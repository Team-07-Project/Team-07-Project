import { css } from "@emotion/react";
import { useState } from "react";
import useBreakpoint from "./hooks/useResponsive";
import Pagination from "./Pagination";
import {
  BREAKPOINTS,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_TABLET,
  CARD_WIDTH_MOBILE,
  SLIDER_GAP,
  SLIDER_MAX_WIDTH,
} from "../../constants/constants";

// 브레이크포인트별 카드 설정
const SETTINGS = {
  desktop: {
    cardWidth: CARD_WIDTH_DESKTOP, // 데스크탑 카드 너비 (275px)
    visibleCount: 4, // 한 번에 보이는 카드 개수
  },
  tablet: {
    cardWidth: CARD_WIDTH_TABLET, // 태블릿 카드 너비
    visibleCount: 2.5, // 한 번에 보이는 카드 개수 (2.5개)
  },
  mobile: {
    cardWidth: CARD_WIDTH_MOBILE, // 모바일 카드 너비 (208px)
    visibleCount: 1.5, // 한 번에 보이는 카드 개수 (1.5개)
  },
};

const Slider = ({ items }) => {
  // 현재 화면 크기에 따른 브레이크포인트 가져오기
  const breakpoint = useBreakpoint();
  const { cardWidth, visibleCount } = SETTINGS[breakpoint] || SETTINGS.desktop;

  // 전체 아이템 개수, 최대 인덱스 계산
  const TOTAL_COUNT = items.length;
  const maxIndex = Math.max(0, Math.ceil(TOTAL_COUNT - visibleCount));
  const gap = SLIDER_GAP;
  const isDesktop = breakpoint === "desktop";

  // 슬라이드 인덱스 상태
  const [slideIndex, setSlideIndex] = useState(0);

  // 이전 버튼 클릭 시 호출: 데스크탑 모드에서만 동작
  const handlePrev = () => {
    if (!isDesktop) return;
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  // 다음 버튼 클릭 시 호출: 데스크탑 모드에서만 동작
  const handleNext = () => {
    if (!isDesktop) return;
    if (slideIndex < maxIndex) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  // 데스크탑 모드에서만 transform 스타일 적용
  const transformStyle = isDesktop
    ? {
        transform: `translateX(-${(cardWidth + gap) * slideIndex}px)`,
      }
    : {};

  return (
    <div css={sliderOuter}>
      {/* 데스크탑 모드에서만 Pagination 버튼 렌더링 */}
      {isDesktop && (
        <Pagination
          slideIndex={slideIndex}
          maxIndex={maxIndex}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* 슬라이드 영역:
          - 데스크탑: overflow: hidden
          - 태블릿/모바일: 가로 스크롤 */}
      <div css={[wrapper, isDesktop ? sliderWrapper : scrollWrapper]}>
        <div css={sliderTrack} style={transformStyle}>
          {items.map((item, id) => (
            <div key={id} css={card}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

// CSS 스타일 정의
// 전체 슬라이더 컨테이너 (버튼 기준 position: relative)
const sliderOuter = css`
  width: 100%;
  max-width: ${SLIDER_MAX_WIDTH}px; // 데스크탑 기준 최대 너비
  margin: 0 auto;
  position: relative;
`;

// 공통 wrapper: border만 있고, overflow는 하위 스타일에서 분기
const wrapper = css`
  width: 100%;
  border: 1px solid #666;
`;

// 데스크탑: 슬라이드 트랙이 넘어가지 않도록 overflow 숨김
const sliderWrapper = css`
  overflow: hidden;
`;

// 태블릿/모바일: 가로 스크롤 사용, 세로 스크롤 제거
const scrollWrapper = css`
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// 카드들을 가로로 배치하는 트랙
const sliderTrack = css`
  display: flex;
  gap: ${SLIDER_GAP}px;
  transition: transform 0.3s ease;
`;

// 카드 스타일 (기본: 모바일, 미디어쿼리: 데스크탑)
const card = css`
  border: 1px solid #333;
  flex-shrink: 0;

  width: ${CARD_WIDTH_MOBILE}px;
  height: 232px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    width: ${CARD_WIDTH_DESKTOP}px;
    height: 260px;
  }
`;
