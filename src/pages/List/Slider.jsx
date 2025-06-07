import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  // 뷰포트에 따른 설정 가져오기
  const breakpoint = useBreakpoint();
  const { cardWidth, visibleCount } = SETTINGS[breakpoint] || SETTINGS.desktop;

  // 슬라이드 범위 계산
  const TOTAL_COUNT = items.length;
  const maxIndex = Math.max(0, Math.ceil(TOTAL_COUNT - visibleCount));
  const gap = SLIDER_GAP;
  const isDesktop = breakpoint === "desktop";
  const showPagination = isDesktop && items.length > visibleCount;

  // 상태 및 레퍼런스
  const [slideIndex, setSlideIndex] = useState(0);
  const wrapperRef = useRef(null); // 스크롤 컨테이너 참조

  // 뷰포트 변경 시 인덱스, 스크롤 초기화
  useEffect(() => {
    setSlideIndex(0);
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = 0;
    }
  }, [breakpoint]);

  // 스크롤 이벤트 (slideIndex 동기화)
  const handleScroll = () => {
    const scrollLeft = wrapperRef.current?.scrollLeft || 0;
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setSlideIndex(idx);
  };

  // 이전/다음 버튼 클릭 시 스크롤 이동 (only 데스크탑)
  const handlePrev = () => {
    if (!isDesktop || slideIndex <= 0) return;
    wrapperRef.current.scrollBy({
      left: -(cardWidth + gap),
      behavior: "smooth",
    });
  };
  const handleNext = () => {
    if (!isDesktop || slideIndex >= maxIndex) return;
    wrapperRef.current.scrollBy({
      left: cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <div css={sliderOuter}>
      {/* 데스크탑 모드에서만 Pagination 표시*/}
      {showPagination && (
        <Pagination
          slideIndex={slideIndex}
          maxIndex={maxIndex}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* 스크롤 영역: 항상 카로 스크롤 + 스냅*/}
      <div css={sliderWrapper} ref={wrapperRef} onScroll={handleScroll}>
        <div css={sliderTrack}>
          {items.map((item) => (
            <Link key={item.id} to={`/post/${item.id}`} css={card}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

// CSS 스타일 정의
// 전체 컨테이너: 중앙 정렬 + 최대 너비
const sliderOuter = css`
  width: 100%;
  max-width: ${SLIDER_MAX_WIDTH}px;
  margin: 0 auto;
  position: relative;
`;

// 래퍼: 가로 스크롤 + 스냅 + 스크롤바 숨김
const sliderWrapper = css`
  width: 100%;
  border: 1px solid #666;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  /* 스크롤 스냅 설정 */
  scroll-snap-type: x proximity;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 트랙: flex 레이아웃 + 카드 간격
const sliderTrack = css`
  display: flex;
  gap: ${SLIDER_GAP}px;
`;

// 카드: 크기, 스냅 정렬, 기본 스타일
const card = css`
  border: 1px solid #333;
  flex-shrink: 0;

  /* 스냅 정렬 */
  scroll-snap-align: none;
  scroll-snap-stop: normal;

  /* 모바일 기본 크기 */
  width: ${CARD_WIDTH_MOBILE}px;
  height: 232px;

  /* 반응형 크기 조절 */
  @media (min-width: ${BREAKPOINTS.md}px) {
    width: ${CARD_WIDTH_DESKTOP}px;
    height: 260px;
  }

  /* 데스크탑에서 스냅 강제 적용 */
  @media (min-width: ${BREAKPOINTS.lg}px) {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;
